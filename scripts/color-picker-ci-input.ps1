# Only synthetic input/clipboard in a disposable GitHub Windows runner.
param([ValidateSet('focus','hotkey','choose','preview','cancel','close','clipboard','performance','idle','resources')][string]$Action,[int]$ApplicationProcessId)
$ErrorActionPreference='Stop'
if($env:GITHUB_ACTIONS -ne 'true'){throw 'Disposable GitHub Windows runner required'}
$flickProcess=Get-Process -Id $ApplicationProcessId
if([IO.Path]::GetFileName($flickProcess.Path) -ne 'flickmemo-desktop.exe'){throw 'Unexpected process'}
Add-Type @'
using System;
using System.Text;
using System.Runtime.InteropServices;
public static class FlickPickerInput {
 public struct Point { public int X,Y; }
 public struct Rect { public int Left,Top,Right,Bottom; }
 delegate bool Callback(IntPtr hwnd,IntPtr param);
 [DllImport("user32.dll")] static extern bool EnumWindows(Callback callback,IntPtr param);
 [DllImport("user32.dll")] static extern uint GetWindowThreadProcessId(IntPtr hwnd,out uint pid);
 [DllImport("user32.dll",CharSet=CharSet.Unicode)] static extern int GetWindowText(IntPtr hwnd,StringBuilder text,int length);
 [DllImport("user32.dll")] public static extern bool ClientToScreen(IntPtr hwnd,ref Point point);
 [DllImport("user32.dll")] public static extern bool SetCursorPos(int x,int y);
 [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hwnd,out Rect rect);
 [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hwnd,int command);
 [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hwnd);
 [DllImport("user32.dll")] public static extern void mouse_event(uint flags,uint dx,uint dy,uint data,UIntPtr extra);
 [DllImport("user32.dll")] public static extern void keybd_event(byte key,byte scan,uint flags,UIntPtr extra);
 [DllImport("user32.dll")] public static extern bool PostMessage(IntPtr hwnd,uint msg,IntPtr wparam,IntPtr lparam);
 [DllImport("user32.dll")] static extern int GetSystemMetrics(int index);
 [DllImport("user32.dll")] public static extern uint GetGuiResources(IntPtr process,uint flags);
 public static void MoveFrames(int x,int y) {
  int left=GetSystemMetrics(76),top=GetSystemMetrics(77),width=GetSystemMetrics(78),height=GetSystemMetrics(79);
  if(width<2||height<2)throw new Exception("Invalid desktop bounds");
  for(int i=0;i<240;i++) {
   uint dx=(uint)Math.Min(Math.Max(65535L*(x+i%80-left)/(width-1),0L),65535L);
   uint dy=(uint)Math.Min(Math.Max(65535L*(y+i%60-top)/(height-1),0L),65535L);
   mouse_event(0xC001,dx,dy,0,UIntPtr.Zero);
   System.Threading.Thread.Sleep(8);
  }
 }
 public static IntPtr Find(uint pid,string title) { IntPtr found=IntPtr.Zero;
  EnumWindows((hwnd,param)=>{uint owner;GetWindowThreadProcessId(hwnd,out owner);if(owner==pid){var text=new StringBuilder(256);GetWindowText(hwnd,text,text.Capacity);if(text.ToString()==title){found=hwnd;return false;}}return true;},IntPtr.Zero);return found;
 }
}
'@
switch($Action){
 'focus'{
  $flickMain=[FlickPickerInput]::Find([uint32]$ApplicationProcessId,'FlickMemo')
  if($flickMain -eq [IntPtr]::Zero){throw 'Main window missing'}
  [void][FlickPickerInput]::ShowWindow($flickMain,9);[void][FlickPickerInput]::SetForegroundWindow($flickMain)
 }
 'hotkey'{
  foreach($flickKey in @(0x11,0x12,0x43)){[FlickPickerInput]::keybd_event([byte]$flickKey,0,0,[UIntPtr]::Zero)}
  foreach($flickKey in @(0x43,0x12,0x11)){[FlickPickerInput]::keybd_event([byte]$flickKey,0,2,[UIntPtr]::Zero)}
 }
 {$_ -in 'choose','preview'}{
  $flickMain=[FlickPickerInput]::Find([uint32]$ApplicationProcessId,'FlickMemo')
  if($flickMain -eq [IntPtr]::Zero){throw 'Main window missing'}
  $flickPoint=New-Object FlickPickerInput+Point;$flickPoint.X=80;$flickPoint.Y=80
  if(![FlickPickerInput]::ClientToScreen($flickMain,[ref]$flickPoint)){throw 'Coordinate conversion failed'}
  if(![FlickPickerInput]::SetCursorPos($flickPoint.X,$flickPoint.Y)){throw 'Cursor move failed'}
  Start-Sleep -Milliseconds 150
  if($Action -eq 'choose'){
   [FlickPickerInput]::mouse_event(2,0,0,0,[UIntPtr]::Zero);[FlickPickerInput]::mouse_event(4,0,0,0,[UIntPtr]::Zero)
  }else{
   $flickPicker=[FlickPickerInput]::Find([uint32]$ApplicationProcessId,'FlickMemo Color Picker')
   $flickRect=New-Object FlickPickerInput+Rect
   if(![FlickPickerInput]::GetWindowRect($flickPicker,[ref]$flickRect)){throw 'Picker bounds missing'}
   $flickWidth=$flickRect.Right-$flickRect.Left;$flickHeight=$flickRect.Bottom-$flickRect.Top
   if($flickWidth -lt 1 -or $flickWidth -gt 1200 -or $flickHeight -lt 1 -or $flickHeight -gt 600){throw 'Invalid picker preview size'}
   Add-Type -AssemblyName System.Drawing
   $flickBitmap=New-Object Drawing.Bitmap($flickWidth,$flickHeight);$flickGraphics=[Drawing.Graphics]::FromImage($flickBitmap)
   try{$flickGraphics.CopyFromScreen($flickRect.Left,$flickRect.Top,0,0,$flickBitmap.Size);$flickBitmap.Save((Join-Path (Get-Location) 'desktop-reports/color-picker-native.png'))}finally{$flickGraphics.Dispose();$flickBitmap.Dispose()}
  }
 }
 {$_ -in 'cancel','close'}{
  $flickPicker=[FlickPickerInput]::Find([uint32]$ApplicationProcessId,'FlickMemo Color Picker')
  if($flickPicker -eq [IntPtr]::Zero){throw 'Picker missing'}
  if($Action -eq 'close'){$flickMessage=0x10;$flickKey=0}else{$flickMessage=0x100;$flickKey=0x1B}
  if(![FlickPickerInput]::PostMessage($flickPicker,$flickMessage,[IntPtr]$flickKey,[IntPtr]::Zero)){throw 'Cancel failed'}
 }
 {$_ -in 'performance','idle'}{
  $flickMain=[FlickPickerInput]::Find([uint32]$ApplicationProcessId,'FlickMemo')
  if($flickMain -eq [IntPtr]::Zero){throw 'Main window missing'}
  $flickPoint=New-Object FlickPickerInput+Point;$flickPoint.X=80;$flickPoint.Y=80
  if(![FlickPickerInput]::ClientToScreen($flickMain,[ref]$flickPoint)){throw 'Coordinate conversion failed'}
  $flickProcess.Refresh();$flickCpuBefore=$flickProcess.TotalProcessorTime.TotalMilliseconds;$flickMemoryBefore=$flickProcess.PrivateMemorySize64
  $flickClock=[Diagnostics.Stopwatch]::StartNew()
  if($Action -eq 'performance'){[FlickPickerInput]::MoveFrames($flickPoint.X,$flickPoint.Y)}else{Start-Sleep -Seconds 3}
  $flickProcess.Refresh();$flickClock.Stop()
  $flickPercent=100*($flickProcess.TotalProcessorTime.TotalMilliseconds-$flickCpuBefore)/$flickClock.Elapsed.TotalMilliseconds
  $flickMetrics=@{singleCoreCpuPercent=[Math]::Round($flickPercent,2);nativePrivateMiB=[Math]::Round($flickProcess.PrivateMemorySize64/1MB,2);privateGrowthMiB=[Math]::Round(($flickProcess.PrivateMemorySize64-$flickMemoryBefore)/1MB,2);durationMs=$flickClock.ElapsedMilliseconds}
  $flickMetrics|ConvertTo-Json|Set-Content -LiteralPath desktop-reports/color-picker-performance.json -Encoding utf8
  $flickMetrics|ConvertTo-Json -Compress
  if($flickPercent -ge 50){throw 'Color picker consumed at least half of one CPU core'}
 }
 'resources'{@{gdi=[FlickPickerInput]::GetGuiResources($flickProcess.Handle,0);user=[FlickPickerInput]::GetGuiResources($flickProcess.Handle,1)}|ConvertTo-Json -Compress}
 'clipboard'{@{clipboard=(Get-Clipboard -Raw)} | ConvertTo-Json -Compress}
}
