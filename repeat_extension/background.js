'use strict';
chrome.browserAction.setBadgeText({ text: 'ON' });
chrome.browserAction.setBadgeBackgroundColor({ color: 'blue' });
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({ color: '# 3aa757' }, function() {
        console.log("La couleur est verte.");
    });
    console.log("je suis une extension de google chrome");
});
console.log("je suis une extension de google chrome 1111");