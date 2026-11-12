export function setupNoteMenu({doc=document,win=window,getNote,choices,location,move,pin,owner,notify}) {
    const menu=doc.createElement('div');menu.className='note-actions-menu';menu.setAttribute('popover','auto');menu.setAttribute('role','dialog');menu.setAttribute('aria-label','メモの操作');doc.body.append(menu);
    const native=typeof menu.showPopover==='function';if(!native){menu.removeAttribute('popover');menu.hidden=true;}
    let id=null,session=null,anchor=null,point=null,epoch=0;
    const visible=()=>native?menu.matches(':popover-open'):!menu.hidden;
    function close(){++epoch;if(native&&visible())menu.hidePopover();else if(!native)menu.hidden=true;anchor?.setAttribute('aria-expanded','false');id=null;}
    function valid(){return id && session===owner() && getNote(id) && !getNote(id).deletedAt;}
    function position(){const rect=menu.getBoundingClientRect();menu.style.left=Math.max(8,Math.min(point.x,win.innerWidth-rect.width-8))+'px';menu.style.top=Math.max(8,Math.min(point.y,win.innerHeight-rect.height-8))+'px';}
    function button(label,icon,action){const b=doc.createElement('button');b.type='button';const glyph=doc.createElement('span');glyph.className='material-symbols-outlined';glyph.setAttribute('aria-hidden','true');glyph.textContent=icon;const text=doc.createElement('span');text.className='note-menu-label';text.textContent=label;b.append(glyph,text);b.onclick=action;menu.append(b);return b;}
    async function act(callback){if(!valid()){close();return;}const target=id,ticket=epoch;for(const b of menu.querySelectorAll('button'))b.disabled=true;try{await callback(target);if(ticket===epoch)close();}catch(error){if(ticket===epoch){close();notify(String(error.message||error));}}}
    function folders(){
        if(!valid()){close();return;}menu.replaceChildren();button('フォルダを変更','arrow_back',()=>render());
        const list=doc.createElement('div');list.className='note-menu-folder-list';menu.append(list);
        for(const folder of choices()){
            const b=button(folder.name,folder.id===location(getNote(id)).id?'check':'folder',()=>act(target=>{
                if(!choices().some(item=>item.id===folder.id))throw Error('このフォルダは削除されています。もう一度選択してください。');
                return move(target,folder.id);
            }));
            b.classList.toggle('selected',folder.id===location(getNote(id)).id);b.setAttribute('aria-pressed',String(folder.id===location(getNote(id)).id));list.append(b);
        }
        position();const selected=list.querySelector('.selected');selected?.scrollIntoView?.({block:'nearest'});selected?.focus({preventScroll:true});
    }
    function render(){
        if(!valid()){close();return;}menu.replaceChildren();
        const title=doc.createElement('p');title.className='note-menu-heading';title.textContent=getNote(id).title||'メモ';menu.append(title);
        const saved=doc.createElement('p');saved.className='note-menu-location';saved.textContent=`保存先：${location(getNote(id)).name}`;menu.append(saved);
        button('フォルダを変更','drive_file_move',folders);
        button(getNote(id).pinned?'ピン留めを解除':'ピン留め','push_pin',()=>act(pin));position();
    }
    function open(noteId,element,event){close();id=noteId;session=owner();anchor=element;const r=element.getBoundingClientRect();point=event?{x:event.clientX,y:event.clientY}:{x:r.left,y:r.bottom+6};if(!valid()){close();return;}menu.style.left='8px';menu.style.top='8px';if(native)menu.showPopover();else menu.hidden=false;anchor.setAttribute('aria-expanded','true');render();menu.querySelector('button')?.focus({preventScroll:true});}
    menu.addEventListener('toggle',()=>{if(!visible())anchor?.setAttribute('aria-expanded','false');});
    doc.addEventListener('pointerdown',event=>{if(!native&&visible()&&!menu.contains(event.target)&&!anchor?.contains(event.target))close();});
    menu.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();const previous=anchor;close();if(previous?.isConnected)previous.focus();return;}if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;const buttons=[...menu.querySelectorAll('button:not(:disabled)')],at=buttons.indexOf(doc.activeElement);const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(at+(event.key==='ArrowUp'?-1:1)+buttons.length)%buttons.length;buttons[next]?.focus();event.preventDefault();});
    win.addEventListener('resize',close);
    return {open,close,element:menu};
}
