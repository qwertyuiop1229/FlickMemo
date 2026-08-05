// 拡張機能アイコンの左クリックで直接サイドパネルを開く設定
if (typeof chrome !== 'undefined' && chrome?.sidePanel?.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));
}

chrome.runtime.onInstalled.addListener(() => {
    if (typeof chrome !== 'undefined' && chrome?.sidePanel?.setPanelBehavior) {
        chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));
    }

    // コンテキストメニューの作成
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

    chrome.storage.local.get(['pendingQuickNote'], (res) => {
        let currentText = res.pendingQuickNote ? res.pendingQuickNote + "\n\n---\n\n" : "";
        chrome.storage.local.set({ pendingQuickNote: currentText + textToAdd }, () => {
            chrome.action.setBadgeText({ text: "" });
        });
    });
});

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
