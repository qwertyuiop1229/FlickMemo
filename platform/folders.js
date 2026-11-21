const ID = /^folder_[A-Za-z0-9_-]{1,73}$/;
export function validFolder(value, id = value?.id) { return !!value && typeof value === 'object' && typeof id === 'string' && ID.test(id) && !['__proto__', 'constructor', 'prototype'].includes(id) && value.id === id && typeof value.name === 'string' && value.name.trim().length > 0 && value.name.length <= 60 && Number.isFinite(value.updatedAt) && (value.deletedAt == null || Number.isFinite(value.deletedAt)); }
export function setupFolders({ doc = document, win = window, notes, select, openNote, newNote, move, write, notify, changed = () => {} }) {
    let owner = 'guest', generation = 0, items = Object.create(null), dirty = Object.create(null), active = 'all', editing = null;
    const inFlight = new Set();
    let renderedState = null;
    const root = doc.createElement('section'); root.className = 'folder-section'; root.setAttribute('aria-label', 'メモのフォルダ');
    root.innerHTML = '<details class="folder-browser"><summary aria-label="フォルダを切り替え"><span class="material-symbols-outlined" aria-hidden="true">folder_open</span><span class="folder-current">すべてのメモ</span><span class="folder-total"></span><span class="material-symbols-outlined folder-chevron" aria-hidden="true">expand_more</span></summary><div class="folder-panel"><div class="folder-heading"><span>フォルダで絞り込み</span><button type="button" class="m3-icon-button" data-add aria-label="フォルダを作成" title="フォルダを作成"><span class="material-symbols-outlined" aria-hidden="true">create_new_folder</span></button></div><div class="folder-list"></div></div></details>';
    doc.querySelector('.sidebar-top')?.prepend(root);
    const dialog = doc.createElement('dialog'); dialog.className = 'folder-dialog';
    dialog.setAttribute('aria-labelledby','folder-dialog-title');
    dialog.innerHTML = '<form><span class="material-symbols-outlined folder-dialog-icon" aria-hidden="true">create_new_folder</span><h2 id="folder-dialog-title">フォルダを作成</h2><p class="folder-dialog-description">メモをまとめて、見つけやすく。</p><label>フォルダ名<input name="name" maxlength="60" required autocomplete="off" placeholder="例：仕事、アイデア"></label><p role="status"></p><div class="folder-dialog-actions"><button type="button" data-cancel class="btn-secondary-sm">キャンセル</button><button type="submit" class="btn-primary-sm">作成</button></div></form>';
    doc.body.append(dialog);
    const manager = doc.createElement('dialog');
    manager.className = 'folder-dialog folder-manager';
    manager.setAttribute('aria-labelledby','folder-manager-title');
    manager.innerHTML = '<header class="folder-gallery-header"><h2 id="folder-manager-title" tabindex="-1" autofocus>フォルダ</h2><button type="button" class="m3-icon-button" data-close aria-label="閉じる"><span class="material-symbols-outlined" aria-hidden="true">close</span></button></header><div class="folder-gallery-toolbar"><label class="m3-search-bar"><span class="material-symbols-outlined" aria-hidden="true">search</span><input type="search" aria-label="フォルダを検索" placeholder="フォルダを検索" autocomplete="off"></label><button type="button" class="btn-primary-sm" data-create>フォルダを作成</button></div><div class="folder-manager-list"></div>';
    doc.body.append(manager);
    const manage = doc.createElement('button');
    manage.type = 'button'; manage.className = 'folder-manage-button'; manage.textContent = 'フォルダを管理';
    root.querySelector('.folder-panel').append(manage);
    manage.onclick = () => { suppressGalleryFocus=false; root.querySelector('details').open = false; renderManager(); manager.showModal(); };
    manager.querySelector('[data-close]').onclick = () => manager.close();
    manager.querySelector('[data-create]').onclick = () => editFromManager();
    manager.querySelector('input').oninput = renderManager;
    let suppressGalleryFocus = false;
    manager.addEventListener('close', () => {
        if (!suppressGalleryFocus && !returnToManager && !dialog.open) root.querySelector('summary').focus({preventScroll:true});
    });
    let returnToManager = false;
    let removing = null;
    let renderedManagement = '';
    function editFromManager(id) { returnToManager = true; manager.close(); edit(id); }
    dialog.addEventListener('close',()=>{ if(returnToManager){returnToManager=false;renderManager();manager.showModal();} });
    function renderManager() {
        const list = manager.querySelector('.folder-manager-list');
        const query = manager.querySelector('input').value.trim().toLocaleLowerCase();
        const filtered = [...currentItems(),{id:'unfiled',name:'未分類'},{id:'all',name:'すべてのメモ'}]
            .filter(folder => folder.name.toLocaleLowerCase().includes(query));
        const groups = new Map(filtered.map(folder => [folder.id,{count:0,recent:[]}]));
        const add = (group,note) => {
            if (!group) return;
            group.count++;
            const rank = group.recent.findIndex(other => (other.updatedAt || 0) < (note.updatedAt || 0));
            if (rank >= 0) group.recent.splice(rank,0,note);
            else if (group.recent.length < 3) group.recent.push(note);
            if (group.recent.length > 3) group.recent.pop();
        };
        for (const note of Object.values(notes())) {
            if (note.deletedAt) continue;
            add(groups.get('all'),note);
            add(groups.get(effective(note) || 'unfiled'),note);
        }
        const state = JSON.stringify([owner,query,active,removing,filtered.map(folder => {
            const {count,recent} = groups.get(folder.id);
            return [folder.id,folder.name,count,recent.map(note=>[note.id,note.title?.slice(0,100),note.body?.slice(0,180)])];
        })]);
        if (state === renderedManagement) return;
        renderedManagement = state;
        list.replaceChildren();
        for (const folder of filtered) {
            const row = doc.createElement('article'); row.className = 'folder-manager-row';
            const {count,recent} = groups.get(folder.id);
            const open = doc.createElement('button'); open.type = 'button'; open.className = 'folder-card-open';
            open.setAttribute('aria-label',`${folder.name}を開く`);
            if (active === folder.id) open.setAttribute('aria-current','true');
            const icon = doc.createElement('span'); icon.className = 'material-symbols-outlined'; icon.setAttribute('aria-hidden','true');
            icon.textContent = folder.id === 'all' ? 'description' : 'folder_open';
            const name = doc.createElement('strong'); name.textContent = folder.name;
            const quantity = doc.createElement('small'); quantity.textContent = `${count}件`;
            open.append(icon,name,quantity);
            const openFolder = () => { manager.close(); setActive(folder.id); select(active); };
            open.onclick = openFolder;
            row.append(open);
            const previews = doc.createElement('div'); previews.className = 'folder-card-previews';
            for (const note of recent) {
                const preview = doc.createElement('button'); preview.type = 'button';
                const title = doc.createElement('strong');
                const body = doc.createElement('span');
                const excerpt = (note.body || '').slice(0,180).trim();
                title.textContent = note.title?.trim().slice(0,100) || excerpt.split(/\r?\n/)[0] || '空のメモ';
                body.textContent = excerpt.replace(/\s+/g,' ');
                preview.append(title,body);
                preview.onclick = () => { if(!notes()[note.id] || notes()[note.id].deletedAt)return; suppressGalleryFocus=true; openFolder(); openNote?.(note.id); };
                previews.append(preview);
            }
            if (!recent.length) previews.textContent = 'メモはまだありません';
            row.append(previews);
            const actions = doc.createElement('div'); actions.className = 'folder-card-actions'; row.append(actions);
            const action = (label, handler, danger = false) => {
                const button = doc.createElement('button'); button.type='button'; button.textContent=label;
                button.className=danger?'btn-danger-sm':'btn-secondary-sm'; button.onclick=handler;
                actions.append(button);
            };
            if (removing === folder.id) {
                const warning = doc.createElement('p'); warning.textContent = 'フォルダを削除しますか？ メモは未分類に移ります。'; actions.append(warning);
                action('戻る',()=>{removing=null;renderManager();});
                action('削除',()=>{try{update(folder.id,folder.name,true);removing=null;renderManager();}catch(error){notify(error.message);}},true);
            } else {
                if (newNote && folder.id !== 'all') action('新しいメモ',()=>{suppressGalleryFocus=true;openFolder();newNote();});
                if (!['all','unfiled'].includes(folder.id)) {
                    action('名前変更',()=>editFromManager(folder.id));
                    action('削除',()=>{removing=folder.id;renderManager();},true);
                }
            }
            list.append(row);
        }
        if (!filtered.length) list.textContent = query ? '一致するフォルダがありません' : 'フォルダはまだありません';
    }
    const form = dialog.querySelector('form'), message = dialog.querySelector('[role=status]');
    const picker = doc.createElement('label'); picker.className = 'note-folder-picker'; picker.title = 'メモの保存フォルダ'; picker.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">folder</span><select aria-label="このメモの保存フォルダ"></select><span class="material-symbols-outlined folder-picker-chevron" aria-hidden="true">expand_more</span>';
    doc.getElementById('editor-toolbar')?.append(picker);
    picker.querySelector('select').onchange = event => move(event.target.value);
    function persist() { try { win.localStorage.setItem(`flickmemo-folders:${owner}`, JSON.stringify({ items, dirty })); } catch { throw Error('フォルダ設定を端末に保存できません'); } }
    function setActive(id) {
        active = ['all', 'unfiled'].includes(id) || (items[id] && !items[id].deletedAt) ? id : 'all';
        try { win.localStorage.setItem(`flickmemo-active-folder:${owner}`,active); } catch {}
        render();
    }
    function send(id) {
        if (owner === 'guest' || !dirty[id]) return;
        const uid = owner, ticket = generation, value = dirty[id], key = `${uid}:${ticket}:${id}`;
        if (inFlight.has(key)) return;
        inFlight.add(key);
        Promise.resolve().then(() => { if (ticket !== generation) return false; return write(id, value); }).then(result => {
            if (result !== false && ticket === generation && JSON.stringify(dirty[id]) === JSON.stringify(value)) { delete dirty[id]; persist(); }
        }).catch(error => { if (ticket === generation) notify(`フォルダは端末に保存済みです。同期できませんでした: ${error.message}`); }).finally(() => { inFlight.delete(key); if (ticket === generation && dirty[id] && JSON.stringify(dirty[id]) !== JSON.stringify(value)) send(id); });
    }
    function update(id, name, deleted = false) {
        const value = { id, name: name.trim(), updatedAt: Date.now(), ...(deleted ? { deletedAt: Date.now() } : {}) };
        if (!validFolder(value)) throw Error('フォルダ名は1〜60文字で入力してください');
        if (!items[id] && Object.keys(items).length >= 200) throw Error('フォルダは最大200件までです');
        const before = { items: Object.assign(Object.create(null), items), dirty: Object.assign(Object.create(null), dirty) };
        items[id] = value; dirty[id] = value;
        try { persist(); } catch (error) { items = before.items; dirty = before.dirty; throw error; }
        if (deleted && active === id) setActive('unfiled');
        send(id); render(); select(active);
    }
    function edit(id = null) {
        root.querySelector('details').open = false;
        editing = id; form.querySelector('h2').textContent = id ? 'フォルダ名を変更' : 'フォルダを作成';
        form.querySelector('[type=submit]').textContent = id ? '保存' : '作成';
        form.elements.name.value = id ? items[id].name : ''; message.textContent = '';
        dialog.showModal(); form.elements.name.focus();
    }
    root.querySelector('[data-add]').onclick = () => edit(); dialog.querySelector('[data-cancel]').onclick = () => dialog.close();
    doc.addEventListener('pointerdown', event => { if (!root.contains(event.target)) root.querySelector('details').open = false; });
    root.addEventListener('keydown', event => { if (event.key === 'Escape') { root.querySelector('details').open = false; root.querySelector('summary').focus(); event.preventDefault(); } });
    form.onsubmit = event => { event.preventDefault(); try { update(editing || `folder_${win.crypto.randomUUID()}`, form.elements.name.value); dialog.close(); } catch (error) { message.textContent = error.message; } };
    const currentItems = () => Object.values(items).filter(f => !f.deletedAt).sort((a, b) => a.name.localeCompare(b.name, 'ja'));
    const effective = note => note.folderId && items[note.folderId] && !items[note.folderId].deletedAt ? note.folderId : '';
    function render() {
        if(manager.open)renderManager();
        const folders = currentItems(), counts = new Map(), values = Object.values(notes()).filter(n => !n.deletedAt);
        for (const note of values) { const id = effective(note); counts.set(id, (counts.get(id) || 0) + 1); }
        const state = JSON.stringify([owner, active, values.length, counts.get('') || 0, folders.map(f => [f.id, f.name, counts.get(f.id) || 0])]);
        // Body edits and cloud acknowledgements do not change folder controls.
        // Preserve their DOM and keyboard focus instead of rebuilding every row.
        if (state === renderedState) return;
        renderedState = state;
        root.querySelector('.folder-current').textContent = active === 'all' ? 'すべてのメモ' : active === 'unfiled' ? '未分類' : items[active]?.name || 'すべてのメモ';
        root.querySelector('.folder-total').textContent = String(active === 'all' ? values.length : counts.get(active === 'unfiled' ? '' : active) || 0);
        const list = root.querySelector('.folder-list'); list.replaceChildren();
        for (const item of [{ id: 'all', name: 'すべてのメモ' }, { id: 'unfiled', name: '未分類' }, ...folders]) {
            const row = doc.createElement('div'); row.className = 'folder-row';
            const button = doc.createElement('button'); button.type = 'button'; button.className = 'folder-filter'; button.setAttribute('aria-pressed', String(active === item.id)); button.dataset.folderId = item.id; button.title = item.name;
            const icon = doc.createElement('span'); icon.className = 'material-symbols-outlined'; icon.setAttribute('aria-hidden','true'); icon.textContent = item.id === 'all' ? 'description' : item.id === 'unfiled' ? 'folder_open' : 'folder';
            const name = doc.createElement('span'); name.className = 'folder-name'; name.textContent = item.name;
            const count = doc.createElement('span'); count.className = 'folder-count'; count.textContent = String(item.id === 'all' ? values.length : counts.get(item.id === 'unfiled' ? '' : item.id) || 0);
            button.append(icon, name, count); button.onclick = () => { root.querySelector('details').open = false; setActive(item.id); select(active); }; row.append(button);
            if (!['all', 'unfiled'].includes(item.id)) {
                const tools = doc.createElement('details'); tools.className = 'folder-actions';
                const more = doc.createElement('summary'); more.setAttribute('aria-label',`${item.name}: フォルダの操作`); more.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">more_horiz</span>'; tools.append(more);
                const actions = doc.createElement('div'); actions.className = 'folder-row-actions'; tools.append(actions); row.append(tools);
                tools.addEventListener('toggle',()=>{if(tools.open)for(const other of list.querySelectorAll('.folder-actions'))if(other!==tools)other.open=false;});
                for (const [action, glyph, label] of [['rename', 'edit', '名前を変更'], ['delete', 'delete', 'フォルダを削除']]) {
                    const control = doc.createElement('button'); control.type = 'button'; control.className = 'folder-action'; control.setAttribute('aria-label', `${item.name}: ${label}`);
                    const symbol = doc.createElement('span'); symbol.className = 'material-symbols-outlined'; symbol.setAttribute('aria-hidden','true'); symbol.textContent = glyph; control.append(symbol,doc.createTextNode(label));
                    control.onclick = () => { tools.open=false; if (action === 'rename') edit(item.id); else if (win.confirm(`「${item.name}」を削除しますか？ メモは消えず「未分類」に移ります。`)) { try { update(item.id, item.name, true); } catch (error) { notify(error.message); } } }; actions.append(control);
                }
            }
            list.append(row);
        }
        const chosen = picker.querySelector('select').value; const combo = picker.querySelector('select'); combo.replaceChildren();
        for (const item of [{ id: '', name: '未分類' }, ...folders]) { const option = doc.createElement('option'); option.value = item.id; option.textContent = item.name; combo.append(option); }
        combo.value = chosen; if (combo.selectedIndex < 0) combo.value = "";
    }
    function setOwner(uid) {
        returnToManager=false;removing=null;if(manager.open)manager.close();manager.querySelector('input').value='';root.querySelector('details').open=false;
        ++generation; owner = uid || 'guest'; active = 'all'; items = Object.create(null); dirty = Object.create(null); if (dialog.open) dialog.close();
        try { const saved = JSON.parse(win.localStorage.getItem(`flickmemo-folders:${owner}`) || '{}');
            for (const [id, value] of Object.entries(saved.items || {}).slice(0, 200)) if (validFolder(value, id)) items[id] = value;
            for (const [id, value] of Object.entries(saved.dirty || {}).slice(0, 200)) if (validFolder(value, id)) dirty[id] = value;
            const savedActive = win.localStorage.getItem(`flickmemo-active-folder:${owner}`);
            if (savedActive === 'unfiled' || (items[savedActive] && !items[savedActive].deletedAt)) active = savedActive;
        } catch {} render();
    }
    return {
        render, setOwner, effective, get active() { return active; },
        choices:()=>[{id:'',name:'未分類'},...currentItems().map(item=>({id:item.id,name:item.name}))],
        location(note){const id=effective(note);return{id,name:id?items[id].name:'未分類'};},
        setActive,
        matches(note) { return active === 'all' || effective(note) === (active === 'unfiled' ? '' : active); },
        selected(note) { picker.querySelector('select').value = effective(note); picker.querySelector('select').disabled = !!note.deletedAt; },
        receive(remote) {
            const accepted = Object.create(null); for (const [id, value] of Object.entries(remote || {}).slice(0, 200)) if (validFolder(value, id)) accepted[id] = value;
            for (const [id, value] of Object.entries(dirty)) {
                if (accepted[id] && accepted[id].updatedAt > value.updatedAt) delete dirty[id]; else accepted[id] = value;
            }
            items = accepted; if (!['all', 'unfiled'].includes(active) && (!items[active] || items[active].deletedAt)) setActive('unfiled');
            try { persist(); } catch (error) { notify(error.message); } render(); for (const id of Object.keys(dirty)) send(id); changed();
        }
    };
}
