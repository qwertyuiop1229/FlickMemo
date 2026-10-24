import { validAuthResponse, trustedAuthSender } from './authProtocol.js';

// 拡張機能アイコンの左クリックで直接サイドパネルを開く設定 (Edge & Chrome 両対応)
if (typeof chrome !== 'undefined' && chrome?.sidePanel?.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));
} else if (typeof chrome !== 'undefined' && chrome?.sidePanel?.open && chrome?.action?.onClicked) {
    chrome.action.onClicked.addListener((tab) => {
        if (tab?.windowId) {
            chrome.sidePanel.open({ windowId: tab.windowId }).catch(() => {});
        }
    });
}

chrome.runtime.onInstalled.addListener(async () => {
    if (typeof chrome !== 'undefined' && chrome?.sidePanel?.setPanelBehavior) {
        chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));
    }

    // Updates must not recreate menu IDs that already exist.
    await chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        id: "add-selection-to-flickmemo",
        title: "選択したテキストをFlickMemoに追加",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "add-image-to-flickmemo",
        title: "選択した画像をFlickMemoに追加",
        contexts: ["image"]
    });
    chrome.contextMenus.create({
        id: "add-page-to-flickmemo",
        title: "このページのURLとタイトルをFlickMemoに保存",
        contexts: ["page"]
    });
});

// コンテキストメニューがクリックされた時の処理
let quickNoteQueue = Promise.resolve();
chrome.contextMenus.onClicked.addListener((info, tab) => {
    let textToAdd = "";
    if (info.menuItemId === "add-selection-to-flickmemo" && info.selectionText) {
        textToAdd = info.selectionText.trim();
        if (tab && tab.url) {
            textToAdd += `\n\n出典: ${tab.title || 'Web'} (${tab.url})`;
        }
    } else if (info.menuItemId === "add-image-to-flickmemo" && info.srcUrl) {
        textToAdd = `🖼️ 画像キャプチャ:\n![${tab?.title || '画像'}](${info.srcUrl})`;
        if (tab && tab.url) {
            textToAdd += `\n\n出典: ${tab.title || 'Web'} (${tab.url})`;
        }
    } else if (info.menuItemId === "add-page-to-flickmemo" && tab) {
        textToAdd = `📌 ${tab.title || 'Webページ'}\n${tab.url}`;
    }

    if (!textToAdd) return;

    quickNoteQueue = quickNoteQueue.then(async () => {
        const res = await chrome.storage.local.get('pendingQuickNote');
        const currentText = res.pendingQuickNote ? res.pendingQuickNote + '\n\n---\n\n' : '';
        const text = currentText + textToAdd;
        if (text.length > 500000) {
            await chrome.action.setBadgeText({ text: '!' });
            return;
        }
        await chrome.storage.local.set({ pendingQuickNote: text });
        await chrome.action.setBadgeText({ text: '' });
    }).catch(error => console.error('Quick note save failed:', error.message));
});

// 外部Webページ (auth.html) からの認証メッセージ受信・サイドパネルへの安全な中継
if (typeof chrome !== 'undefined' && chrome?.runtime?.onMessageExternal) {
    chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
        if (!trustedAuthSender(sender)) return;
        (async () => {
            const { pendingAuth } = await chrome.storage.session.get('pendingAuth');
            if (!validAuthResponse(message, pendingAuth)) {
                sendResponse({ received: false });
                return;
            }
            const response = await chrome.runtime.sendMessage(message);
            sendResponse({ received: response?.received === true });
        })().catch(() => sendResponse({ received: false }));
        return true;
    });
}

// アドレスバー（オムニボックス）検索機能: "fm <キーワード>"
if (chrome.omnibox) {
    chrome.omnibox.setDefaultSuggestion({
        description: 'FlickMemo内で「%s」を検索'
    });

    chrome.omnibox.onInputEntered.addListener((text) => {
        chrome.storage.local.set({ extensionSearchQuery: text }, () => {
            if (chrome.sidePanel && chrome.sidePanel.open) {
                chrome.windows.getCurrent((win) => {
                    if (win?.id) {
                        chrome.sidePanel.open({ windowId: win.id }).catch(() => {});
                    }
                });
            }
        });
    });
}
