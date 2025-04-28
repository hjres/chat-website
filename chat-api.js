// مثال API للتفاعل مع الخادم
function sendMessageToServer(message) {
    fetch('/api/sendMessage', {
        method: 'POST',
        body: JSON.stringify({ message: message }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message sent:', data);
    })
    .catch(error => console.error('Error:', error));
}

function getMessagesFromServer() {
    fetch('/api/getMessages')
        .then(response => response.json())
        .then(data => {
            console.log('Messages:', data);
            // إضافة الرسائل إلى واجهة المستخدم
            data.forEach(message => {
                addMessage(message.text, message.sender === 'me' ? 'sent' : 'received');
            });
        })
        .catch(error => console.error('Error:', error));
}