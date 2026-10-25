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
    await invoke('desktop_ready');
}
