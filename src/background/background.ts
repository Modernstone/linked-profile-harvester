
// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('LinkedIn Profile Harvester installed');
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkLinkedInPage') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const isLinkedInPage = tabs[0]?.url?.includes('linkedin.com');
      sendResponse({ isLinkedInPage });
    });
    return true; // Keep the message channel open for async response
  }
});

// Add a context menu option
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'extractLinkedInProfile',
    title: 'Extract LinkedIn Profile',
    contexts: ['page'],
    documentUrlPatterns: ['*://*.linkedin.com/*']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'extractLinkedInProfile' && tab?.id) {
    chrome.tabs.sendMessage(tab.id, { action: 'extractProfile' }, (response) => {
      if (response?.success) {
        chrome.runtime.sendMessage({ 
          action: 'profileExtracted', 
          profile: response.profile 
        });
      }
    });
  }
});
