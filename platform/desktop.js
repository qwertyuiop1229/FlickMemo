import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { createDesktopUpdates } from './desktopUpdates.js';
import './desktopUpdates.css';

let expectedOwner = 'guest';
export const desktop = {
    status: () => invoke('desktop_status', { expectedOwner }),
    settings: value => invoke('desktop_settings', { ...value, expectedOwner }),
    session: session => { expectedOwner = session?.uid || 'guest'; return invoke('desktop_session', { session }); },
    history: (offset = 0, search = '') => invoke('desktop_history', { offset, search, expectedOwner }),
    mutate: (id, action) => invoke('desktop_mutate', { id, action, expectedOwner }),
    copy: text => invoke('desktop_copy', { text }),
    importWindows: () => invoke('desktop_import', { expectedOwner }),
    login: () => invoke('desktop_login'),
    updateCheck: () => invoke('desktop_update_check'),
    updateDownload: () => invoke('desktop_update_download'),
    updateInstall: () => invoke('desktop_update_install'),
    openDownload: (section = 'windows') => invoke('desktop_open_download', { section }),
    changed: callback => listen('desktop-history-changed', callback),
    colorPick: () => invoke('desktop_color_pick'),
    colorStatus: () => invoke('desktop_color_status'),
    colorSettings: preferences => invoke('desktop_color_settings', { preferences }),
    colorClear: () => invoke('desktop_color_clear'),
    colorChanged: async callback => {
        const listeners = await Promise.all([
            listen('desktop-color-picked', event => callback(event.payload)),
            listen('desktop-color-error', event => callback({ error: event.payload }))
        ]);
        return () => listeners.forEach(remove => remove());
    }
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
    for (const link of document.querySelectorAll('a[data-download-section]')) {
        link.addEventListener('click', event => {
            event.preventDefault();
            desktop.openDownload(link.dataset.downloadSection).catch(error => notify(String(error)));
        });
    }
    const diagnostic = await invoke('desktop_ready', { verified: false });
    if(!diagnostic){
        const updates=createDesktopUpdates({api:desktop,prepareClose,notify});
        await listen('desktop-window-opened',()=>updates.check());
        void updates.check();
    }
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
