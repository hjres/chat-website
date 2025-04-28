// الحصول على عناصر الصفحة
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('messages-container');

// وظيفة لإرسال الرسائل
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        sendMessage();
    }
});

// إرسال الرسالة
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        // إضافة الرسالة إلى واجهة المستخدم
        addMessage(messageText, 'sent');
        messageInput.value = ''; // إعادة ضبط حقل الإدخال بعد إرسال الرسالة
        messageInput.focus(); // العودة إلى حقل الإدخال
    }
}

// إضافة الرسالة إلى الرسائل المعروضة في الشات
function addMessage(text, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // التمرير لأسفل بعد إضافة الرسالة
}