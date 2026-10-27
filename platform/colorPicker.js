// Screen samples and recent colors stay on this device. No Firebase dependency.
export const defaultPickerPreferences = Object.freeze({ enabled: true, shortcut: 'Ctrl+Alt+C', format: 'hex', uppercase: true, remember: true });
export function validShortcut(value) { return typeof value === 'string' && /^(Ctrl\+Alt|Ctrl\+Shift|Alt\+Shift)\+[A-Z0-9]$/.test(value); }
export function pickerPreferences(value = {}) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) value = {};
    return { enabled: value.enabled !== false, shortcut: validShortcut(value.shortcut) ? value.shortcut : 'Ctrl+Alt+C',
        format: ['hex', 'rgb', 'hsl'].includes(value.format) ? value.format : 'hex', uppercase: value.uppercase !== false, remember: value.remember !== false };
}
export function formatColor(hex, format = 'hex', uppercase = true) {
    if (!/^#[\da-f]{6}$/i.test(hex)) throw new Error('色の値が不正です');
    const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
    if (format === 'rgb') return `rgb(${r}, ${g}, ${b})`;
    if (format === 'hsl') {
        const [a, c, d] = [r / 255, g / 255, b / 255], max = Math.max(a, c, d), min = Math.min(a, c, d), delta = max - min, light = (max + min) / 2;
        let hue = 0;
        if (delta) hue = max === a ? ((c - d) / delta) % 6 : max === c ? (d - a) / delta + 2 : (a - c) / delta + 4;
        return `hsl(${Math.round((hue * 60 + 360) % 360) % 360}, ${Math.round((delta ? delta / (1 - Math.abs(2 * light - 1)) : 0) * 100)}%, ${Math.round(light * 100)}%)`;
    }
    return uppercase ? hex.toUpperCase() : hex.toLowerCase();
}
export function setupColorPicker({ win = window, doc = document, native = null, isDesktop = false, notify = () => {} } = {}) {
    const storageKey = 'flickmemo-color-picker-v1';
    let saved = {}; try { if (!isDesktop) saved = JSON.parse(win.localStorage.getItem(storageKey) || '{}') || {}; } catch {}
    let prefs = pickerPreferences(saved.preferences), recent = Array.isArray(saved.recent) ? saved.recent.filter(x => typeof x === 'string' && /^#[\da-f]{6}$/i.test(x)).slice(0, 12) : [];
    if (!prefs.remember) recent = [];
    let ready = !isDesktop, pendingResult;
    let api, busy = false, hex = recent[0] || '#CB5733', status = null;
    const supported = isDesktop || typeof win.EyeDropper === 'function';
    const panel = doc.createElement('dialog'); panel.className = 'color-dialog'; panel.id = 'color-picker-dialog';
    panel.setAttribute('aria-labelledby', 'color-picker-title');
    panel.innerHTML = `<div class="color-dialog-header"><div><span class="color-eyebrow">FLICKMEMO TOOLS</span><h2 id="color-picker-title">カラーピッカー</h2></div><button class="m3-icon-button" data-close type="button" aria-label="閉じる"><span class="material-symbols-outlined">close</span></button></div>
        <div class="color-swatch" data-preview></div><div class="color-value-row"><input data-value aria-label="色の値" readonly spellcheck="false"><button class="m3-icon-button" data-copy type="button" aria-label="色をコピー"><span class="material-symbols-outlined">content_copy</span></button></div>
        <div class="color-segments" role="group" aria-label="コピー形式"><button data-format="hex" type="button">HEX</button><button data-format="rgb" type="button">RGB</button><button data-format="hsl" type="button">HSL</button></div>
        <button class="color-pick-primary" data-pick type="button"><span class="material-symbols-outlined">colorize</span>画面から色を選ぶ</button><p class="color-hint" data-hint></p><p class="color-message" role="status" aria-live="polite"></p>
        <div class="color-recent-heading"><h3>最近の色</h3><button class="color-text-button" data-clear type="button">消去</button></div><div class="color-recent" aria-label="この端末の最近の色"></div><p class="color-footnote">色だけをこの端末に保存します。画像の保存・クラウド送信はしません。</p>`;
    doc.body.append(panel);
    const $ = selector => panel.querySelector(selector);
    const message = text => { $('.color-message').textContent = text; };
    const settings = doc.getElementById('color-picker-settings');
    if (settings) settings.innerHTML = `<div class="color-settings-card"><span class="material-symbols-outlined color-settings-icon">colorize</span><h3>ひと押しで、画面の色を。</h3><p>${isDesktop ? '他のアプリを使っている間も、ショートカットで起動できます。' : 'この画面でボタンかショートカットを押して、画面上の色を選べます。'}</p><button class="color-pick-primary" data-open type="button">カラーピッカーを開く</button></div>
        <form class="color-preferences"><label class="color-setting-row"><span>ショートカットを有効にする<small>${isDesktop ? 'トレイ常駐中も有効' : 'FlickMemoの画面にフォーカスがある間だけ有効'}</small></span><input name="enabled" type="checkbox"></label>
        <label class="color-setting-row"><span>ショートカットキー</span><span class="color-shortcut-fields"><select name="modifiers" aria-label="修飾キー"><option>Ctrl+Alt</option><option>Ctrl+Shift</option><option>Alt+Shift</option></select><span>+</span><input name="key" aria-label="ショートカットの英数字キー" maxlength="1" pattern="[A-Za-z0-9]" required></span></label>
        <label class="color-setting-row"><span>コピー形式</span><select name="format"><option value="hex">HEX · #CB5733</option><option value="rgb">RGB · rgb(203, 87, 51)</option><option value="hsl">HSL · hsl(14, 60%, 50%)</option></select></label>
        <label class="color-setting-row"><span>HEXを大文字にする</span><input name="uppercase" type="checkbox"></label>
        <label class="color-setting-row"><span>最近の色を保存する<small>この端末に最大12色。アカウント間でも共通です。</small></span><input name="remember" type="checkbox"></label>
        <p class="color-settings-status" role="status" aria-live="polite"></p><button class="btn-primary-sm" type="submit">設定を保存</button></form>`;
    const form = settings?.querySelector('form'), formStatus = settings?.querySelector('.color-settings-status');
    const persist = (preferences = prefs, colors = recent) => { try { win.localStorage.setItem(storageKey, JSON.stringify({ preferences, recent: preferences.remember ? colors : [] })); return true; } catch { message('端末の保存領域を利用できません。色はコピーできます。'); return false; } };
    function populateSettings() {
        if (!form) return;
        for (const name of ['enabled', 'uppercase', 'remember']) form.elements[name].checked = prefs[name];
        form.elements.format.value = prefs.format;
        const parts = prefs.shortcut.split('+'); form.elements.key.value = parts.pop(); form.elements.modifiers.value = parts.join('+');
        formStatus.textContent = status?.error || (isDesktop ? 'Windows全体で使うキーです。他のアプリと重複する場合は変更してください。' : supported ? 'ブラウザの設定によって、このキーが優先されない場合があります。ボタンでも起動できます。' : 'このブラウザは画面の色取得に対応していません。PCのChrome・EdgeまたはWindows版をご利用ください。');
    }
    function render() {
        $('[data-preview]').style.backgroundColor = hex;
        $('[data-value]').value = formatColor(hex, prefs.format, prefs.uppercase);
        for (const button of panel.querySelectorAll('[data-format]')) button.setAttribute('aria-pressed', String(button.dataset.format === prefs.format));
        $('[data-pick]').disabled = busy || !supported || !ready;
        for (const button of panel.querySelectorAll('[data-format], [data-copy]')) button.disabled = !ready;
        if (form) for (const control of form.elements) control.disabled = !ready;
        $('[data-hint]').textContent = !supported ? 'このブラウザは未対応です。PCのChrome・EdgeまたはWindows版をご利用ください。' : `クリックで選択・Escで中止${prefs.enabled ? ` · ${prefs.shortcut}` : ''}${isDesktop ? ' · 矢印キーで1px移動' : ''}`;
        const list = $('.color-recent'); list.replaceChildren();
        for (const color of recent) {
            const button = doc.createElement('button'); button.type = 'button'; button.className = 'color-recent-swatch'; button.style.backgroundColor = color;
            button.title = formatColor(color, prefs.format, prefs.uppercase); button.setAttribute('aria-label', button.title + ' をコピー');
            button.onclick = () => { hex = color; render(); void copy(); }; list.append(button);
        }
        if (!recent.length) { const empty = doc.createElement('span'); empty.className = 'color-empty'; empty.textContent = prefs.remember ? '選んだ色がここに並びます' : '最近の色の保存はオフです'; list.append(empty); }
        $('[data-clear]').disabled = !ready || !recent.length;
    }
    function remember(color) { if (prefs.remember) recent = [color, ...recent.filter(c => c.toLowerCase() !== color.toLowerCase())].slice(0, 12); }
    async function copy() {
        if (!ready) return;
        try { const value = formatColor(hex, prefs.format, prefs.uppercase); if (isDesktop) await api.copy(value); else await win.navigator.clipboard.writeText(value); message(`${value} をコピーしました`); }
        catch { message('自動コピーできませんでした。コピーボタンを押すか、値を選択してコピーしてください。'); $('[data-value]').select(); }
    }
    function received(result) {
        if (result?.error && !result.hex) { message(String(result.error)); if (!panel.open) notify(String(result.error)); return; }
        if (!result || typeof result.hex !== 'string' || !/^#[\da-f]{6}$/i.test(result.hex)) return;
        hex = result.hex.toUpperCase(); remember(hex); if (!isDesktop) persist(); render();
        message(result.copied ? `${formatColor(hex, prefs.format, prefs.uppercase)} をコピーしました` : result.error || '色を取得しました。コピーボタンからコピーできます。');
    }
    function open() { if (!panel.open) panel.showModal(); render(); }
    async function pick() {
        if (!ready || busy || !supported) return;
        busy = true; message(''); render();
        try {
            if (isDesktop) { if (!api) throw new Error('Windows機能の準備中です'); await api.colorPick(); }
            else {
                // Must call open synchronously in the click/keyboard activation, before any await.
                const result = await new win.EyeDropper().open(); received({ hex: result.sRGBHex }); await copy();
            }
        } catch (error) { if (error?.name !== 'AbortError') message(String(error?.message || error)); }
        finally { busy = false; render(); }
    }
    $('[data-pick]').onclick = pick; $('[data-copy]').onclick = copy; $('[data-close]').onclick = () => panel.close();
    $('[data-value]').onclick = event => event.target.select();
    panel.addEventListener('click', event => { if (event.target === panel) { const r = panel.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) panel.close(); } });
    async function save(next) {
        if (!ready) return;
        if (isDesktop) { status = await api.colorSettings(next); prefs = pickerPreferences(status.preferences); recent = status.recent; }
        else { if (!persist(next, next.remember ? recent : [])) throw new Error('端末の保存領域を利用できないため、設定を保存できませんでした'); prefs = next; if (!prefs.remember) recent = []; }
        render(); populateSettings();
    }
    for (const button of panel.querySelectorAll('[data-format]')) button.onclick = async () => { try { await save({ ...prefs, format: button.dataset.format }); } catch (error) { message(String(error?.message || error)); } };
    $('[data-clear]').onclick = async () => { if (!ready) return; try { if (isDesktop) { status = await api.colorClear(); recent = status.recent; } else { if (!persist(prefs, [])) throw new Error('端末の保存領域を利用できないため、最近の色を消去できませんでした'); recent = []; } render(); } catch (error) { message(String(error)); } };
    if (form) {
        settings.querySelector('[data-open]').onclick = open;
        form.onsubmit = async event => {
            event.preventDefault(); const button = form.querySelector('[type=submit]'); if (button.disabled) return;
            const next = pickerPreferences({ enabled: form.elements.enabled.checked, shortcut: `${form.elements.modifiers.value}+${form.elements.key.value.toUpperCase()}`, format: form.elements.format.value, uppercase: form.elements.uppercase.checked, remember: form.elements.remember.checked });
            button.disabled = true;
            try { await save(next); formStatus.textContent = status?.error || '設定を保存しました'; }
            catch (error) { formStatus.textContent = String(error?.message || error); }
            finally { button.disabled = false; }
        };
    }
    const headerButton = doc.createElement('button'); headerButton.id = 'btn-color-picker'; headerButton.type = 'button'; headerButton.className = 'm3-icon-button'; headerButton.title = 'カラーピッカー'; headerButton.setAttribute('aria-label', headerButton.title);
    headerButton.innerHTML = '<span class="material-symbols-outlined">colorize</span>'; headerButton.onclick = open; doc.querySelector('.header-right')?.prepend(headerButton);
    win.addEventListener('keydown', event => {
        if (isDesktop || !prefs.enabled || event.repeat || event.isComposing || event.getModifierState?.('AltGraph')) return;
        const modifiers = [event.ctrlKey && 'Ctrl', event.altKey && 'Alt', event.shiftKey && 'Shift'].filter(Boolean).join('+');
        if (!event.metaKey && `${modifiers}+${event.key.toUpperCase()}` === prefs.shortcut) { event.preventDefault(); event.stopImmediatePropagation(); open(); void pick(); }
    }, true);
    if (isDesktop) {
        if (form) form.querySelector('[type=submit]').disabled = true;
        Promise.resolve(native).then(async value => {
            api = value;
            // Subscribe before reading the snapshot so a pick during startup is not lost.
            await api.colorChanged(result => { if (ready) received(result); else pendingResult = result; });
            status = await api.colorStatus(); prefs = pickerPreferences(status.preferences); recent = prefs.remember ? status.recent : [];
            hex = recent[0] || hex; ready = true;
            if (pendingResult) received(pendingResult);
            render(); populateSettings();
        }).catch(error => { message(String(error)); if (formStatus) formStatus.textContent = String(error); notify('カラーピッカーの準備に失敗しました'); });
    }
    render(); populateSettings();
    return { open, pick, panel };
}
