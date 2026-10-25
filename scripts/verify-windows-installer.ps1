# Destructive installer tests run only on a disposable GitHub runner.
$ErrorActionPreference='Stop'
if($env:GITHUB_ACTIONS -ne 'true'){throw 'インストーラー導入試験は使い捨てGitHubランナー専用です'}
$flickVersion=(Get-Content -LiteralPath version.json -Raw | ConvertFrom-Json).version
if($flickVersion -notmatch '^\d+\.\d+\.\d+$'){throw 'Invalid version'}
$flickInstaller=(Resolve-Path -LiteralPath "src-tauri/target/release/bundle/nsis/FlickMemo_${flickVersion}_x64-setup.exe").Path
$flickTempRoot=[IO.Path]::GetFullPath($env:TEMP).TrimEnd('\')
$flickInstallRoot=[IO.Path]::GetFullPath((Join-Path $flickTempRoot "FlickMemo-installer-test-$([guid]::NewGuid().ToString('N'))"))
if(!$flickInstallRoot.StartsWith($flickTempRoot+'\',[StringComparison]::OrdinalIgnoreCase)){throw 'Invalid isolated install path'}
$flickInstalledExe=Join-Path $flickInstallRoot 'flickmemo-desktop.exe'
function Invoke-FlickInstaller([string]$File,[string]$Arguments){
    $flickInstallerProcess=Start-Process -FilePath $File -ArgumentList $Arguments -WindowStyle Hidden -PassThru
    if(!$flickInstallerProcess.WaitForExit(240000)){Stop-Process -Id $flickInstallerProcess.Id;throw 'Installer timed out'}
    if($flickInstallerProcess.ExitCode -ne 0){throw "Installer exited: $($flickInstallerProcess.ExitCode)"}
}
$flickExpected=(Get-FileHash -LiteralPath src-tauri/target/release/flickmemo-desktop.exe -Algorithm SHA256).Hash
Write-Output 'Testing isolated per-user installation'
Invoke-FlickInstaller $flickInstaller "/S /D=$flickInstallRoot"
if((Get-FileHash -LiteralPath $flickInstalledExe -Algorithm SHA256).Hash -ne $flickExpected){throw 'Installed binary differs from the build'}
Write-Output 'Testing reinstall without removing user data'
Invoke-FlickInstaller $flickInstaller "/S /D=$flickInstallRoot"
if((Get-FileHash -LiteralPath $flickInstalledExe -Algorithm SHA256).Hash -ne $flickExpected){throw 'Reinstalled binary differs from the build'}
& (Join-Path $PSScriptRoot 'measure-windows.ps1') -Executable $flickInstalledExe
Write-Output 'Testing isolated uninstallation'
$flickUninstaller=Join-Path $flickInstallRoot 'uninstall.exe'
Invoke-FlickInstaller $flickUninstaller "/S _?=$flickInstallRoot"
if(Test-Path -LiteralPath $flickInstalledExe){throw 'Uninstall left the application executable'}
@{version=$flickVersion;install=$true;reinstall=$true;lifecycle=$true;uninstall=$true;sha256=$flickExpected} | ConvertTo-Json | Set-Content -LiteralPath desktop-reports/installer.json -Encoding utf8
Write-Output 'Installer / reinstall / installed WebView lifecycle / uninstall PASS'
