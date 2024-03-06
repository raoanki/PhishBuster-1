// background.js
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    if (message.action === 'checkPhishing') {
        try {
            console.log('Checking phishing for domain:', message.domain);

            const response = await fetch('http://127.0.0.1:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feature: message.domain }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            console.log('Received result from Flask server:', result);

            chrome.runtime.sendMessage({ action: 'phishingResult', result });
        } catch (error) {
            console.error('Error checking phishing for domain:', message.domain, error);
        }
    }
});
