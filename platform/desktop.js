import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

export const desktop = {
    status: () => invoke('desktop_status'),
    settings: value => invoke('desktop_settings', value),
    session: session => invoke('desktop_session', { session }),
    history: (offset = 0, search = '') => invoke('desktop_history', { offset, search }),
    mutate: (id, action) => invoke('desktop_mutate', { id, action }),
    copy: text => invoke('desktop_copy', { text }),
    importWindows: () => invoke('desktop_import'),
    login: () => invoke('desktop_login'),
    changed: callback => listen('desktop-history-changed', callback)
};

export async function setupDesktop({ prepareClose, notify }) {
    let closing = false;
    await listen('desktop-close-requested', async () => {
        if (closing) return;
        closing = true;
        try {
            await prepareClose();
            await invoke('desktop_close');
        } catch (error) {
            await invoke('desktop_cancel_close').catch(() => {});
            notify(String(error?.message || error));
        } finally { closing = false; }
    });
    // A destroyed WebView will recreate this module and its listeners on next open.
    document.documentElement.dataset.platform = 'windows';
    document.querySelector('link[rel="manifest"]')?.remove();
    const diagnostic = await invoke('desktop_ready', { verified: false });
    if (diagnostic) {
        // Runs only in a fresh native diagnostic profile. No real notes/account/clipboard.
        try {
            const waitFor = async predicate => {
                const deadline = Date.now() + 10_000;
                while (!predicate()) {
                    if (Date.now() > deadline) throw new Error('Diagnostic UI did not become ready');
                    await new Promise(resolve => setTimeout(resolve, 20));
                }
            };
            await waitFor(() => document.getElementById('splash-screen').classList.contains('hidden'));
            document.getElementById('btn-guest-login').click();
            const editor = document.getElementById('note-body');
            await waitFor(() => !editor.disabled);
            const expected = 'FlickMemo diagnostic 日本語😀\nlocal persistence';
            if (localStorage.getItem('diagnostic-note-written')) {
                if (editor.value !== expected) throw new Error('Diagnostic memo did not survive WebView destruction');
            } else {
                editor.value = expected;
                editor.dispatchEvent(new Event('input', { bubbles: true }));
                localStorage.setItem('diagnostic-note-written', 'true');
            }
            await invoke('desktop_ready', { verified: true });
        } catch (error) {
            await invoke('desktop_smoke_failed', { error: String(error?.message || error) });
            throw error;
        }
    }
}
