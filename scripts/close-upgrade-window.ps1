# Sends real WM_CLOSE to this test's window, including when the runner hides it.
param([int]$ApplicationProcessId,[string]$Executable)
$ErrorActionPreference='Stop'
if($env:GITHUB_ACTIONS -ne 'true'){throw 'Disposable GitHub Windows runner required'}
$flickProcess=Get-Process -Id $ApplicationProcessId
if($flickProcess.Path -ne $Executable -or [IO.Path]::GetFileName($Executable) -ne 'flickmemo-desktop.exe'){throw 'Unexpected application process'}
Add-Type @'
using System;
using System.Text;
using System.Runtime.InteropServices;
public static class FlickUpgradeClose {
 delegate bool EnumCallback(IntPtr hwnd,IntPtr param);
 [DllImport("user32.dll")] static extern bool EnumWindows(EnumCallback callback,IntPtr param);
 [DllImport("user32.dll")] static extern uint GetWindowThreadProcessId(IntPtr hwnd,out uint processId);
 [DllImport("user32.dll",CharSet=CharSet.Unicode)] static extern int GetWindowText(IntPtr hwnd,StringBuilder text,int max);
 [DllImport("user32.dll")] static extern bool PostMessage(IntPtr hwnd,uint msg,IntPtr wparam,IntPtr lparam);
 public static bool Close(uint processId) {
  bool sent=false;
  EnumWindows((hwnd,param)=>{
   uint owner;GetWindowThreadProcessId(hwnd,out owner);
   if(owner==processId){var text=new StringBuilder(256);GetWindowText(hwnd,text,text.Capacity);
    if(text.ToString()=="FlickMemo"){sent=PostMessage(hwnd,0x0010,IntPtr.Zero,IntPtr.Zero);return false;}}
   return true;
  },IntPtr.Zero);
  return sent;
 }
}
'@
if(![FlickUpgradeClose]::Close([uint32]$ApplicationProcessId)){throw 'Test application window missing'}
