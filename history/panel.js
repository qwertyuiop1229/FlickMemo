import './panel.css';
import { IMAGE_PLACEHOLDER, visibleHistory, validSelection } from './model.js';

function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text != null) node.textContent = text;
    if (className) node.className = className;
    return node;
}
export function createHistoryPanel({ desktop, adapter, saveNote, selectedText, notify }) {
    const dialog = element('dialog', null, 'history-dialog');
    const header = element('header');
    const heading = element('h2', 'クリップボード履歴');
    const close = element('button', '閉じる'); close.onclick = () => dialog.close();
    header.append(heading, close); dialog.append(header);
    const message = element('p', '', 'history-error'); message.setAttribute('role', 'status');
    const status = element('p', '', 'history-status');
    const controls = element('section');
    let settings = null, local = !!desktop, offset = 0, entries = [], selections = [], generation = 0;
    let stopHistory = null, stopSelection = null, stopNative = null, timer = null, debounce = null;
    const actions = element('div', null, 'history-actions');
    const localButton = element('button', 'このPCの履歴'); localButton.hidden = !desktop;
    const cloudButton = element('button', '他の端末・クラウド');
    actions.append(localButton, cloudButton);
    const search = element('input'); search.type = 'search'; search.placeholder = '表示中の履歴を検索（このPCは全履歴を検索）'; search.maxLength = 256;
    const cards = element('section');
    const more = element('button', '次の50件');
    const selectionArea = element('section');
    dialog.append(message, status, controls, actions, search, cards, more, selectionArea);
    document.body.append(dialog);
    const error = problem => { message.textContent = String(problem?.message || problem); };
    const run = fn => async event => {
        const button = event?.currentTarget;
        if (button) button.disabled = true;
        message.textContent = '';
        try { await fn(); } catch (problem) { error(problem); }
        finally { if (button?.isConnected) button.disabled = false; }
    };
    const copy = async text => {
        if (desktop) await desktop.copy(text); else await navigator.clipboard.writeText(text);
        notify('コピーしました');
    };
    function renderSelection() {
        selectionArea.replaceChildren();
        const detail = element('details'); const summary = element('summary', '選択した文字を30秒だけ共有'); detail.append(summary);
        detail.append(element('p', '同じアカウントの端末に送ります。自動送信・自動コピー・履歴への自動保存はしません。'));
        const send = element('button', '選択中の文字を共有');
        send.onclick = run(async () => { await adapter.shareSelection(selectedText()); notify('30秒間共有しました'); });
        const stop = element('button', '共有を停止'); stop.onclick = run(() => adapter.stopSelection());
        detail.append(send, stop);
        for (const item of selections.filter(value => validSelection(value))) {
            const card = element('article', null, 'history-card'); card.append(element('pre', item.text));
            const button = element('button', 'コピー'); button.onclick = run(() => copy(item.text)); card.append(button); detail.append(card);
        }
        selectionArea.append(detail);
    }
    function render() {
        cards.replaceChildren();
        const shown = local ? entries : visibleHistory(entries).filter(item => item.text.toLowerCase().includes(search.value.toLowerCase()));
        for (const item of shown) {
            const card = element('article', null, 'history-card');
            card.append(element('small', `${item.pinned ? '固定 · ' : ''}${new Date(item.updatedAt).toLocaleString()} · ${item.count}回 · ${local ? 'このPC' : '端末 ' + item.originDeviceId.slice(0, 6)}${local ? (settings?.syncEnabled ? (item.syncState === 'synced' ? ' · 同期済み' : ' · 同期待ち') : ' · ローカルのみ') : ''}`));
            card.append(element('pre', item.kind === 'image_placeholder' ? IMAGE_PLACEHOLDER : item.text));
            const buttons = element('div', null, 'history-actions');
            if (item.kind === 'text') {
                const cp = element('button', 'コピー'); cp.onclick = run(() => copy(item.text));
                const note = element('button', 'メモに保存'); note.onclick = run(async () => { await saveNote(item.text); notify('メモに保存しました'); });
                buttons.append(cp, note);
            }
            if (local) {
                const pin = element('button', item.pinned ? '固定を解除' : '固定');
                pin.onclick = run(async () => { await desktop.mutate(item.id, item.pinned ? 'unpin' : 'pin'); await load(); });
                const remove = element('button', '削除');
                remove.onclick = run(async () => { await desktop.mutate(item.id, 'delete'); await load(); });
                buttons.append(pin, remove);
            }
            card.append(buttons); cards.append(card);
        }
        if (!shown.length) cards.append(element('p', '表示できる履歴はありません。'));
        more.hidden = !local || entries.length < 50;
    }
    async function load() {
        if (!dialog.open || !local) return;
        const ticket = ++generation;
        const [nextSettings, nextEntries] = await Promise.all([desktop.status(), desktop.history(offset, search.value)]);
        if (!dialog.open || ticket !== generation || !local) return;
        settings = nextSettings; entries = nextEntries;
        status.textContent = `${settings.recording ? '● 記録中' : '記録停止中'} · ${settings.locked ? '画面ロック中' : ''} ${settings.stats.count}件 / ${(settings.stats.bytes / 1024 / 1024).toFixed(2)}MiB\n7日・1000件・16MiBまで。固定は100件まで。アカウント変更・アプリ再起動で記録はOFFになります。`;
        if (settings.lastError) error(settings.lastError);
        renderControls(); render();
    }
    function renderControls() {
        controls.replaceChildren();
        controls.hidden = !local;
        if (!local || !settings) return;
        const recordLabel = element('label');
        const record = element('input'); record.type = 'checkbox'; record.checked = settings.recording;
        const syncLabel = element('label');
        const sync = element('input'); sync.type = 'checkbox'; sync.checked = settings.syncEnabled;
        recordLabel.append(record, ' 今後コピーした文字をこのPCに記録する');
        syncLabel.append(sync, ' このアカウントの履歴をクラウドに送信する');
        controls.append(recordLabel, syncLabel, element('p', '同期ONでは、このPCの既存の未送信履歴もFirebaseへ送ります。端末間の暗号化（E2EE）は未対応です。ゲスト履歴はログイン後の履歴と分離されます。'));
        const details = element('details'); details.append(element('summary', '除外アプリ'));
        const excluded = element('textarea'); excluded.rows = 3; excluded.value = settings.excluded.join('\n'); excluded.placeholder = 'example.exe（1行に1つ）';
        const apply = element('button', '設定を保存');
        const save = async () => {
            await desktop.settings({ recording: record.checked, syncEnabled: sync.checked, excluded: excluded.value.split(/\r?\n/).map(v => v.trim().toLowerCase()).filter(Boolean) });
            await load();
        };
        apply.onclick = run(save); details.append(excluded, apply); controls.append(details);
        record.onchange = run(save); sync.onchange = run(save);
        const importButton = element('button', 'Win＋Vの既存履歴を取り込む');
        importButton.onclick = run(async () => {
            const count = await desktop.importWindows(); notify(`${count}件取り込みました`); await load();
        }); controls.append(importButton);
    }
    function unsubscribe() {
        ++generation;
        stopHistory?.(); stopHistory = null;
        stopSelection?.(); stopSelection = null;
        stopNative?.(); stopNative = null;
        clearInterval(timer); timer = null; clearTimeout(debounce); debounce = null;
    }
    async function source(useLocal) {
        unsubscribe(); local = useLocal; offset = 0; entries = []; selections = [];
        const ticket = generation;
        controls.hidden = !local; message.textContent = ''; status.textContent = local ? '' : '同期された新しい50件を表示。コピーは押したときだけ実行します。';
        render(); renderSelection();
        if (local) {
            await load();
            if (!dialog.open || generation !== ticket) return;
            const stop = await desktop.changed(() => { clearTimeout(debounce); debounce = setTimeout(() => load().catch(error), 150); });
            if (!dialog.open || generation !== ticket) { stop(); return; }
            stopNative = stop;
        }
        else { stopHistory = adapter.watchHistory(values => { entries = values; render(); }, error); }
        try { stopSelection = adapter.watchSelection(values => { selections = values; renderSelection(); }, error); } catch { /* Guest mode can use local history. */ }
        timer = setInterval(() => { if (selections.some(value => !validSelection(value))) { selections = selections.filter(value => validSelection(value)); renderSelection(); } }, 1000);
    }
    localButton.onclick = run(() => source(true)); cloudButton.onclick = run(() => source(false));
    more.onclick = run(async () => { offset += 50; await load(); });
    search.oninput = () => { clearTimeout(debounce); debounce = setTimeout(() => { offset = 0; if (local) load().catch(error); else render(); }, 200); };
    dialog.addEventListener('close', () => { unsubscribe(); entries = []; selections = []; cards.replaceChildren(); controls.replaceChildren(); selectionArea.replaceChildren(); });
    return {
        async open() { if (dialog.open) return; dialog.showModal(); try { await source(local); } catch (problem) { error(problem); } },
        accountChanged() { if (dialog.open) dialog.close(); unsubscribe(); },
        destroy() { dialog.close(); unsubscribe(); dialog.remove(); }
    };
}
