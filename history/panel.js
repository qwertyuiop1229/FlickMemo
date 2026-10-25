import './panel.css';
import { IMAGE_PLACEHOLDER, visibleHistory, validSelection } from './model.js';
function el(tag, text, className) {
    const node = document.createElement(tag);
    if (text != null) node.textContent = text;
    if (className) node.className = className;
    return node;
}
export function createHistoryPanel({ desktop, adapter, saveNote, selectedText, notify }) {
    const dialog = el('dialog', null, 'history-dialog');
    dialog.setAttribute('aria-labelledby', 'history-title');
    const header = el('header', null, 'history-header');
    const title = el('h2', 'クリップボード履歴'); title.id = 'history-title';
    const heading = el('div'); heading.append(el('p', 'FLICKMEMO', 'history-eyebrow'), title);
    const close = el('button', '閉じる'); close.type = 'button'; close.onclick = () => closePanel();
    header.append(heading, close);
    const status = el('div', '', 'history-status'); status.setAttribute('role', 'status');
    const message = el('p', '', 'history-error'); message.setAttribute('role', 'status');
    const controls = el('section', null, 'history-controls');
    const sources = el('div', null, 'history-sources'); sources.setAttribute('role', 'group'); sources.setAttribute('aria-label', '履歴の保存先');
    const localButton = el('button', 'このPCの履歴'); localButton.hidden = !desktop;
    const cloudButton = el('button', '他の端末・クラウド'); sources.append(localButton, cloudButton);
    const searchLabel = el('label', '履歴を検索', 'history-search-label');
    const search = el('input'); search.type = 'search'; search.maxLength = 256; search.placeholder = 'キーワードで探す'; search.setAttribute('aria-label', '履歴を検索');
    searchLabel.append(search);
    const cards = el('section', null, 'history-list'); cards.setAttribute('aria-label', '保存した履歴');
    const paging = el('div', null, 'history-paging');
    const prev = el('button', '前の50件'), pageLabel = el('span'), more = el('button', '次の50件'); paging.append(prev, pageLabel, more);
    const selectionArea = el('section', null, 'history-selection');
    dialog.append(header, status, message, controls, sources, searchLabel, cards, paging, selectionArea); document.body.append(dialog);

    let settings = null, preferences = null, local = !!desktop, offset = 0, entries = [], selections = [];
    let generation = 0, lifecycle = 0, settingsBusy = false, deferredRender = false;
    let stopHistory = null, stopSelection = null, stopNative = null, timer = null, debounce = null;
    const error = problem => { message.textContent = String(problem?.message || problem); };
    const run = fn => async event => {
        const button = event?.currentTarget, ticket = lifecycle;
        if (button) button.disabled = true;
        message.textContent = '';
        try { await fn(); } catch (problem) { if (ticket === lifecycle) error(problem); }
        finally { if (button?.isConnected) button.disabled = false; }
    };
    const copy = async text => { if (desktop) await desktop.copy(text); else await navigator.clipboard.writeText(text); notify('コピーしました'); };

    function renderSelection() {
        const expanded = selectionArea.querySelector('details')?.open;
        selectionArea.replaceChildren();
        const detail = el('details'); detail.open = !!expanded; detail.append(el('summary', '選択した文字を30秒だけ共有'));
        detail.append(el('p', '同じアカウントの端末に送ります。受信側のクリップボードは自動では変わりません。', 'history-help'));
        const send = el('button', '選択中の文字を共有'), stop = el('button', '共有を停止');
        send.onclick = run(async () => { await adapter.shareSelection(selectedText()); notify('30秒間共有しました'); });
        stop.onclick = run(() => adapter.stopSelection()); detail.append(send, stop);
        for (const item of selections.filter(value => validSelection(value))) {
            const card = el('article', null, 'history-card'); card.append(el('pre', item.text));
            const button = el('button', 'コピー'); button.onclick = run(() => copy(item.text)); card.append(button); detail.append(card);
        }
        selectionArea.append(detail);
    }
    function render() {
        if (cards.contains(document.activeElement)) { deferredRender = true; return; }
        deferredRender = false;
        const scroll = cards.scrollTop;
        cards.replaceChildren();
        const shown = local ? entries : visibleHistory(entries).filter(item => item.text.toLowerCase().includes(search.value.toLowerCase()));
        let day = '';
        for (const item of shown) {
            const group = item.pinned ? '固定した履歴' : new Date(item.updatedAt).toLocaleDateString();
            if (group !== day) { cards.append(el('h3', group, 'history-day')); day = group; }
            const card = el('article', null, 'history-card');
            if (item.kind === 'image_placeholder') card.classList.add('history-image-placeholder');
            const meta = `${new Date(item.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · ${item.count}回 · ${local ? 'このPC' : '端末 ' + item.originDeviceId.slice(0, 6)}${local ? (settings?.syncEnabled ? (item.syncState === 'synced' ? ' · 同期済み' : ' · 同期待ち') : ' · ローカルのみ') : ''}`;
            card.append(el('small', meta));
            card.append(el('pre', item.kind === 'image_placeholder' ? IMAGE_PLACEHOLDER : item.text));
            const buttons = el('div', null, 'history-actions');
            if (item.kind === 'text') {
                const cp = el('button', 'コピー'); cp.className = 'history-copy'; cp.onclick = run(() => copy(item.text));
                const note = el('button', 'メモに保存'); note.onclick = run(async () => { await saveNote(item.text); notify('メモに保存しました'); }); buttons.append(cp, note);
            }
            if (local) {
                const pin = el('button', item.pinned ? '固定を解除' : '固定'); pin.onclick = run(async () => { await desktop.mutate(item.id, item.pinned ? 'unpin' : 'pin'); await load(); });
                const remove = el('button', '削除'); remove.className = 'history-delete'; remove.onclick = run(async () => { await desktop.mutate(item.id, 'delete'); await load(); }); buttons.append(pin, remove);
            }
            card.append(buttons); cards.append(card);
        }
        if (!shown.length) {
            const empty = el('div', null, 'history-empty'); empty.append(el('p', search.value ? '一致する履歴はありません' : 'まだ履歴はありません'));
            empty.append(el('small', search.value ? '別のキーワードで検索してください。' : local ? '「記録を開始」を押してから、文字をコピーしてください。' : '同じアカウントのWindows版でクラウド送信をONにすると表示されます。')); cards.append(empty);
        }
        cards.scrollTop = scroll;
        paging.hidden = !local; prev.disabled = offset === 0; more.disabled = entries.length < 50;
        pageLabel.textContent = shown.length ? `${offset + 1}–${offset + shown.length}件` : '0件';
    }
    cards.addEventListener('focusout', () => setTimeout(() => { if (deferredRender && dialog.open && !cards.contains(document.activeElement)) render(); }, 0));

    async function load() {
        if (!dialog.open || !local) return;
        const ticket = ++generation;
        cards.setAttribute('aria-busy', 'true');
        const [nextSettings, nextEntries] = await Promise.all([desktop.status(), desktop.history(offset, search.value)]);
        if (!dialog.open || ticket !== generation || !local) return;
        cards.setAttribute('aria-busy', 'false'); settings = nextSettings; entries = nextEntries;
        status.replaceChildren(el('span', settings.locked ? 'ロック中・記録停止' : settings.recording ? '● 記録中' : '記録停止中', settings.recording && !settings.locked ? 'history-recording' : ''), el('small', `${settings.stats.count}件保存 · ${(settings.stats.bytes / 1024 / 1024).toFixed(2)}MiB`));
        if (settings.lastError) error(settings.lastError);
        updateControls(); render();
    }
    async function saveSettings({ explicit = false, recording } = {}) {
        if (!settings || settingsBusy) return;
        const ticket = lifecycle, ui = preferences;
        settingsBusy = true; updateControls();
        try {
            const excluded = explicit ? ui.excluded.value.split(/\r?\n/).map(v => v.trim().toLowerCase()).filter(Boolean) : settings.excluded;
            await desktop.settings({ recording: recording ?? ui.record.checked, syncEnabled: ui.sync.checked, excluded });
            if (ticket !== lifecycle) return;
            if (explicit) ui.dirty = false;
            await load();
        } finally { if (ticket === lifecycle) { settingsBusy = false; updateControls(); } }
    }
    function updateControls() {
        controls.hidden = !local;
        if (!local || !settings) return;
        if (!preferences) {
            const start = el('button', '記録を開始'); start.className = 'history-record-button';
            start.onclick = run(() => saveSettings({ recording: !settings.recording }));
            const detail = el('details', null, 'history-preferences'); detail.append(el('summary', '記録と同期の設定'));
            const record = el('input'); record.type = 'checkbox'; record.setAttribute('aria-label', '今後コピーした文字を記録');
            const sync = el('input'); sync.type = 'checkbox'; sync.setAttribute('aria-label', 'クラウド送信');
            const recordLabel = el('label'); recordLabel.append(record, ' 今後コピーした文字をこのPCに記録する');
            const syncLabel = el('label'); syncLabel.append(sync, ' このアカウントの履歴をクラウドに送信する');
            const excludedLabel = el('label', '記録しないアプリ（実行ファイル名・1行に1つ）');
            const excluded = el('textarea'); excluded.rows = 3; excluded.placeholder = 'example.exe'; excluded.setAttribute('aria-label', '記録しないアプリ'); excludedLabel.append(excluded);
            const apply = el('button', '除外アプリを保存'); apply.onclick = run(() => saveSettings({ explicit: true }));
            const importButton = el('button', 'Win＋Vの既存履歴を取り込む'); importButton.onclick = run(async () => { const count = await desktop.importWindows(); notify(`${count}件取り込みました`); await load(); });
            detail.append(recordLabel, syncLabel, el('p', 'クラウド送信をONにすると、このアカウントの既存の未送信履歴もFirebaseへ送ります。E2EEは未対応です。ゲストの履歴は自動で移しません。', 'history-help'), excludedLabel, apply, importButton,
                el('p', '文字は1件64KiBまで。7日・1000件・合計16MiBで整理します。固定は100件まで。再起動やアカウント変更では記録がOFFになります。', 'history-help'));
            controls.append(start, detail); preferences = { start, record, sync, excluded, apply, importButton, dirty: false };
            excluded.oninput = () => { preferences.dirty = true; };
            record.onchange = run(() => saveSettings()); sync.onchange = run(() => saveSettings());
        }
        const ui = preferences;
        ui.start.textContent = settings.recording ? '記録を停止' : '記録を開始'; ui.start.disabled = settingsBusy || !settings.listenerReady;
        ui.record.disabled = settingsBusy || !settings.listenerReady; ui.sync.disabled = settingsBusy || settings.owner === 'guest';
        ui.apply.disabled = settingsBusy;
        if (!settingsBusy) { ui.record.checked = settings.recording; ui.sync.checked = settings.syncEnabled; }
        if (!ui.dirty) ui.excluded.value = settings.excluded.join('\n');
    }
    function unsubscribe() {
        ++generation; ++lifecycle; stopHistory?.(); stopHistory = null; stopSelection?.(); stopSelection = null; stopNative?.(); stopNative = null;
        clearInterval(timer); timer = null; clearTimeout(debounce); debounce = null;
    }
    function release() { unsubscribe(); entries = []; selections = []; settings = null; preferences = null; settingsBusy = false; cards.replaceChildren(); controls.replaceChildren(); selectionArea.replaceChildren(); }
    function closePanel() { release(); if (dialog.open) dialog.close(); }
    async function source(useLocal) {
        unsubscribe(); local = useLocal; offset = 0; entries = []; selections = [];
        const ticket = lifecycle; controls.hidden = !local; message.textContent = '';
        localButton.setAttribute('aria-pressed', String(local)); cloudButton.setAttribute('aria-pressed', String(!local));
        status.textContent = local ? '読み込み中…' : 'クラウドの新しい50件 · コピーはボタンを押したときだけ'; render(); renderSelection();
        if (local) {
            await load(); if (!dialog.open || lifecycle !== ticket) return;
            const stop = await desktop.changed(() => { clearTimeout(debounce); debounce = setTimeout(() => load().catch(error), 150); });
            if (!dialog.open || lifecycle !== ticket) { stop(); return; } stopNative = stop;
        } else { stopHistory = adapter.watchHistory(values => { entries = values; render(); }, error); }
        try { stopSelection = adapter.watchSelection(values => { selections = values; renderSelection(); }, error); } catch { /* Guest: local history is still available. */ }
        timer = setInterval(() => { if (selections.some(value => !validSelection(value))) { selections = selections.filter(value => validSelection(value)); renderSelection(); } }, 1000);
    }
    localButton.onclick = run(() => source(true)); cloudButton.onclick = run(() => source(false));
    prev.onclick = run(async () => { offset = Math.max(0, offset - 50); await load(); });
    more.onclick = run(async () => { offset += 50; await load(); });
    search.oninput = () => { clearTimeout(debounce); debounce = setTimeout(() => { offset = 0; if (local) load().catch(error); else render(); }, 200); };
    dialog.addEventListener('keydown', event => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') { event.preventDefault(); search.focus(); search.select(); }
        event.stopPropagation();
    });
    dialog.addEventListener('cancel', event => { event.preventDefault(); closePanel(); });
    dialog.addEventListener('close', () => { if (!dialog.open) release(); });
    return { async open() { if (dialog.open) return; dialog.showModal(); try { await source(local); } catch (problem) { error(problem); } }, accountChanged: closePanel, destroy() { closePanel(); dialog.remove(); } };
}
