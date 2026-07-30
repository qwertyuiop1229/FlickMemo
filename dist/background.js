// 右クリックコンテキストメニューの作成（選択テキスト / ページ情報）
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "add-selection-to-flickmemo",
        title: "選択したテキストをFlickMemoに追加",
        contexts: ["selection"]
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
    } else if (info.menuItemId === "add-page-to-flickmemo" && tab) {
        textToAdd = `📌 ${tab.title || 'Webページ'}\n${tab.url}`;
    }

    if (!textToAdd) return;

    chrome.storage.local.get(['pendingQuickNote'], (res) => {
        let currentText = res.pendingQuickNote ? res.pendingQuickNote + "\n\n---\n\n" : "";
        chrome.storage.local.set({ pendingQuickNote: currentText + textToAdd }, () => {
            chrome.action.setBadgeText({ text: "NEW" });
            chrome.action.setBadgeBackgroundColor({ color: "#a8c7fa" });
            setTimeout(() => chrome.action.setBadgeText({ text: "" }), 3000);
        });
    });
});