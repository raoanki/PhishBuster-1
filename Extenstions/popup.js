document.addEventListener("DOMContentLoaded", function () {
    // Function to extract domain from URL
    function extractDomain(url) {
        try {
            const domain = new URL(url).hostname;
            return domain;
        } catch (error) {
            console.error('Error extracting domain:', error);
            return '';
        }
    }

    // Send message to background script to check phishing
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        const domain = extractDomain(currentTab.url);
        chrome.runtime.sendMessage({ action: 'checkPhishing', domain: domain });
    });

    // Listen for messages from background script
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action === 'phishingResult') {
            const resultDiv = document.getElementById('result');
            resultDiv.textContent = message.result.result;
        }
    });
});