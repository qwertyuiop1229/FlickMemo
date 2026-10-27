# Only synthetic input/clipboard in a disposable GitHub Windows runner.
param([ValidateSet('hotkey','choose','cancel','clipboard')][string]$Action,[int]$ApplicationProcessId)
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
 delegate bool Callback(IntPtr hwnd,IntPtr param);
 [DllImport("user32.dll")] static extern bool EnumWindows(Callback callback,IntPtr param);
 [DllImport("user32.dll")] static extern uint GetWindowThreadProcessId(IntPtr hwnd,out uint pid);
 [DllImport("user32.dll",CharSet=CharSet.Unicode)] static extern int GetWindowText(IntPtr hwnd,StringBuilder text,int length);
 [DllImport("user32.dll")] public static extern bool ClientToScreen(IntPtr hwnd,ref Point point);
 [DllImport("user32.dll")] public static extern bool SetCursorPos(int x,int y);
 [DllImport("user32.dll")] public static extern void mouse_event(uint flags,uint dx,uint dy,uint data,UIntPtr extra);
 [DllImport("user32.dll")] public static extern void keybd_event(byte key,byte scan,uint flags,UIntPtr extra);
 [DllImport("user32.dll")] public static extern bool PostMessage(IntPtr hwnd,uint msg,IntPtr wparam,IntPtr lparam);
 public static IntPtr Find(uint pid,string title) { IntPtr found=IntPtr.Zero;
  EnumWindows((hwnd,param)=>{uint owner;GetWindowThreadProcessId(hwnd,out owner);if(owner==pid){var text=new StringBuilder(256);GetWindowText(hwnd,text,text.Capacity);if(text.ToString()==title){found=hwnd;return false;}}return true;},IntPtr.Zero);return found;
 }
}
'@
switch($Action){
 'hotkey'{
  foreach($flickKey in @(0x11,0x12,0x43)){[FlickPickerInput]::keybd_event([byte]$flickKey,0,0,[UIntPtr]::Zero)}
  foreach($flickKey in @(0x43,0x12,0x11)){[FlickPickerInput]::keybd_event([byte]$flickKey,0,2,[UIntPtr]::Zero)}
 }
 'choose'{
  $flickMain=[FlickPickerInput]::Find([uint32]$ApplicationProcessId,'FlickMemo')
  if($flickMain -eq [IntPtr]::Zero){throw 'Main window missing'}
  $flickPoint=New-Object FlickPickerInput+Point;$flickPoint.X=80;$flickPoint.Y=80
  if(![FlickPickerInput]::ClientToScreen($flickMain,[ref]$flickPoint)){throw 'Coordinate conversion failed'}
  if(![FlickPickerInput]::SetCursorPos($flickPoint.X,$flickPoint.Y)){throw 'Cursor move failed'}
  Start-Sleep -Milliseconds 150
  [FlickPickerInput]::mouse_event(2,0,0,0,[UIntPtr]::Zero);[FlickPickerInput]::mouse_event(4,0,0,0,[UIntPtr]::Zero)
 }
 'cancel'{
  $flickPicker=[FlickPickerInput]::Find([uint32]$ApplicationProcessId,'FlickMemo Color Picker')
  if($flickPicker -eq [IntPtr]::Zero){throw 'Picker missing'}
  if(![FlickPickerInput]::PostMessage($flickPicker,0x100,[IntPtr]0x1B,[IntPtr]::Zero)){throw 'Cancel failed'}
 }
 'clipboard'{@{clipboard=(Get-Clipboard -Raw)} | ConvertTo-Json -Compress}
}
