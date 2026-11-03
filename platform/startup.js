export async function setupStartup({ api, doc = document, notify = () => {} }) {
    const box = doc.getElementById('startup-system-settings'), toggle = doc.getElementById('startup-toggle'), text = doc.getElementById('startup-status');
    if (!box) return;
    box.classList.remove('hidden'); toggle.disabled = true;
    const dialog = doc.createElement('dialog'); dialog.id = 'startup-choice-dialog'; dialog.className = 'folder-dialog';
    dialog.innerHTML = '<h2>Windows起動時にも使いますか？</h2><p>WindowsにサインインしたときにFlickMemoを起動できます。設定からいつでも変更できます。</p><p role="status"></p><div class="folder-dialog-actions"><button type="button" data-no class="btn-secondary-sm">起動しない</button><button type="button" data-yes class="btn-primary-sm">起動する</button></div>';
    doc.body.append(dialog);
    let current;
    async function save(enable) {
        toggle.disabled = true; for (const button of dialog.querySelectorAll('button')) button.disabled = true;
        try { current = await api.startupSet(enable); toggle.checked = current.enabled; text.textContent = current.enabled ? 'Windowsへの自動起動登録が有効です' : '自動起動しません'; dialog.close(); }
        catch (error) { try { current = await api.startupStatus(); } catch {} toggle.checked = !!current?.enabled; text.textContent = String(error.message || error); dialog.querySelector('[role=status]').textContent = text.textContent; notify(text.textContent); }
        finally { toggle.disabled = false; for (const button of dialog.querySelectorAll('button')) button.disabled = false; }
    }
    toggle.onchange = () => save(toggle.checked);
    dialog.querySelector('[data-no]').onclick = () => save(false); dialog.querySelector('[data-yes]').onclick = () => save(true);
    try { current = await api.startupStatus(); toggle.checked = current.enabled; toggle.disabled = false; if (!current.asked) dialog.showModal(); }
    catch (error) { text.textContent = '自動起動設定を読み込めません: ' + String(error.message || error); }
}
