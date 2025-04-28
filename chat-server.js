const express = require('express');
const app = express();
const port = 3000;

// إعدادات middleware
app.use(express.json());

// تخزين الرسائل
let messages = [];

// API لجلب الرسائل
app.get('/api/getMessages', (req, res) => {
    res.json(messages);
});

// API لإرسال رسالة
app.post('/api/sendMessage', (req, res) => {
    const message = req.body.message;
    const sender = 'me'; // يمكنك تعديل ذلك بناءً على المستخدم
    messages.push({ text: message, sender: sender });
    res.json({ status: 'Message received' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});