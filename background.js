// 右クリックコンテキストメニューの作成
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "add-to-flickmemo",
        title: "FlickMemoにメモを追加",
        contexts: ["selection"]
    });
});

// コンテキストメニューがクリックされた時の処理
chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "add-to-flickmemo" && info.selectionText) {
        const textToAdd = info.selectionText.trim();
        if (!textToAdd) return;

        chrome.storage.local.get(['pendingQuickNote'], (res) => {
            let currentText = res.pendingQuickNote ? res.pendingQuickNote + "\n\n" : "";
            chrome.storage.local.set({ pendingQuickNote: currentText + textToAdd }, () => {
                chrome.action.setBadgeText({ text: "NEW" });
                chrome.action.setBadgeBackgroundColor({ color: "#a8c7fa" });
                setTimeout(() => chrome.action.setBadgeText({ text: "" }), 3000);
            });
        });
    }
});