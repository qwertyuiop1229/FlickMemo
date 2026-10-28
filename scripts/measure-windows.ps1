param([Parameter(Mandatory=$true)][string]$Executable)
$ErrorActionPreference='Stop'
$flickExe=(Resolve-Path -LiteralPath $Executable).Path
if ([IO.Path]::GetFileName($flickExe) -ne 'flickmemo-desktop.exe') { throw 'FlickMemoの実行ファイルを指定してください' }
$flickStarted=Get-Date
$flickProcess=Start-Process -FilePath $flickExe -ArgumentList '--diagnostic-smoke' -WindowStyle Hidden -PassThru
$flickSamples=[System.Collections.Generic.List[object]]::new()
$flickResult=$null
try {
    $flickDeadline=(Get-Date).AddMinutes(12)
    while ((Get-Date) -lt $flickDeadline) {
        $flickFolder=Get-ChildItem -LiteralPath $env:TEMP -Directory -Filter "FlickMemo-diagnostic-$($flickProcess.Id)-*" | Where-Object CreationTime -GE $flickStarted.AddSeconds(-1) | Select-Object -First 1
        if ($flickFolder -and (Test-Path -LiteralPath (Join-Path $flickFolder.FullName 'result.json'))) {
            try { $flickResult=Get-Content -LiteralPath (Join-Path $flickFolder.FullName 'result.json') -Raw | ConvertFrom-Json } catch { }
        }
        if ($flickProcess.HasExited) { break }
        $flickSnapshot=Get-CimInstance Win32_Process -Property ProcessId,ParentProcessId
        $flickIds=[System.Collections.Generic.HashSet[int]]::new()
        [void]$flickIds.Add($flickProcess.Id)
        do {
            $flickAdded=$false
            foreach($flickItem in $flickSnapshot) {
                if($flickIds.Contains([int]$flickItem.ParentProcessId) -and $flickIds.Add([int]$flickItem.ProcessId)) { $flickAdded=$true }
            }
        } while ($flickAdded)
        $flickPrivate=0L; $flickNative=0L; $flickCount=0
        foreach($flickId in $flickIds) {
            $flickChild=Get-Process -Id $flickId -ErrorAction SilentlyContinue
            if($flickChild) { $flickPrivate+=$flickChild.PrivateMemorySize64; $flickCount++; if($flickId -eq $flickProcess.Id){$flickNative=$flickChild.PrivateMemorySize64} }
        }
        $flickSamples.Add([pscustomobject]@{seconds=[Math]::Round(((Get-Date)-$flickStarted).TotalSeconds,1);cycle=$flickResult.cycle;stage=$flickResult.stage;processes=$flickCount;nativeMiB=[Math]::Round($flickNative/1MB,2);totalMiB=[Math]::Round($flickPrivate/1MB,2)})
        if($flickResult.stage -in @('passed','failed')) {break}
        Start-Sleep -Milliseconds 500
    }
    if(!$flickResult -or $flickResult.stage -ne 'passed'){throw "Windows開閉診断に失敗しました: $($flickResult | ConvertTo-Json -Compress)"}
    $flickOutput=Join-Path $PSScriptRoot '..\desktop-reports'
    New-Item -ItemType Directory -Path $flickOutput -Force | Out-Null
    $flickSamples | Export-Csv -LiteralPath (Join-Path $flickOutput 'memory.csv') -NoTypeInformation -Encoding utf8
    $flickResult | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $flickOutput 'lifecycle.json') -Encoding utf8
    if(Test-Path -LiteralPath (Join-Path $flickFolder.FullName 'clipboard.json')) {Copy-Item -LiteralPath (Join-Path $flickFolder.FullName 'clipboard.json') -Destination (Join-Path $flickOutput 'clipboard.json')}
    $flickSamples | Select-Object -Last 10 | Format-Table -AutoSize
    Write-Output '20回の同じWebViewの表示・保存待機・休止・再表示を検証しました。診断専用DB/profileを使用し、実アカウントやクリップボード本文は使用していません。'
} finally {
    $flickProcess.Refresh()
    if(!$flickProcess.HasExited) {Stop-Process -Id $flickProcess.Id -ErrorAction SilentlyContinue}
}
