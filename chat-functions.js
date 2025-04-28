// هنا يمكن إضافة وظائف الاتصال بالخادم أو API.
function fetchMessages() {
    // مثال على جلب الرسائل من الخادم (إذا كنت تستخدم API)
    // fetch('/api/messages')
    //   .then(response => response.json())
    //   .then(data => {
    //     data.forEach(message => {
    //       addMessage(message.text, message.sender === 'me' ? 'sent' : 'received');
    //     });
    //   });
}

// يمكن أن تضيف دالة أخرى لتحميل الرسائل بشكل دوري:
setInterval(fetchMessages, 5000); // جلب الرسائل كل 5 ثوانٍ