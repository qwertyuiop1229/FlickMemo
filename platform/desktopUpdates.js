export function createDesktopUpdates({ api, prepareClose, notify }) {
    const setting = document.getElementById('btn-update-check');
    const description=setting?.previousElementSibling;
    if(description?.classList.contains('settings-desc')) description.textContent='画面を開くたびに更新を確認します。新しい版はメモを保存してから適用・再起動できます。';
    const banner=document.createElement('aside');banner.className='desktop-update-banner';banner.hidden=true;banner.setAttribute('role','status');
    const message=document.createElement('p');const actions=document.createElement('div');
    const apply=document.createElement('button');apply.type='button';apply.textContent='更新して再起動';
    const later=document.createElement('button');later.type='button';later.textContent='あとで';later.onclick=()=>{banner.hidden=true;};
    actions.append(apply,later);banner.append(message,actions);document.body.append(banner);
    let working=false,available=null;
    function controls(busy,text){working=busy;apply.disabled=busy;later.disabled=busy;if(setting){setting.disabled=busy;setting.textContent=text|| (available?`v${available.version}に更新`:'更新を確認');}}
    async function check(manual=false){
        if(working)return;controls(true,'更新を確認中…');
        try{const result=await api.updateCheck();available=result;
            if(result){message.textContent=`新しいWindows版 v${result.version} を利用できます。`;banner.hidden=false;}
            else{banner.hidden=true;if(manual)notify('Windows版は最新です');}
        }catch(error){if(manual)notify(String(error?.message||error));}
        finally{controls(false);}
    }
    async function install(){
        if(working||!available)return;controls(true,'更新をダウンロード中…');banner.hidden=false;message.textContent='更新ファイルをダウンロード・検証しています…';
        const wasInert=document.body.inert;
        try{
            await api.updateDownload();
            // Save AFTER download: edits made while downloading are included.
            await prepareClose();
            document.body.inert=true;message.textContent='保存しました。更新して再起動します…';
            await api.updateInstall();
        }catch(error){message.textContent='更新を適用できませんでした。もう一度お試しいただけます。';notify(String(error?.message||error));}
        finally{document.body.inert=wasInert;controls(false);}
    }
    apply.onclick=install;
    if(setting)setting.onclick=()=>available?install():check(true);
    controls(false);
    return {check,install};
}
