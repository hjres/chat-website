let currentUser = null;
let messages = [];

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // تحقق من اسم المستخدم وكلمة المرور (ببساطة هنا)
    if (username && password) {
        currentUser = { name: username, password: password };
        document.getElementById('user-name').innerText = username;
        showChat();
    } else {
        alert("الرجاء ملء جميع الحقول.");
    }
}

function createAccount() {
    const username = prompt("أدخل اسم المستخدم الجديد:");
    const password = prompt("أدخل كلمة السر:");

    if (username && password) {
        // تحقق من عدم وجود اسم مستخدم مسجل مسبقاً
        if (localStorage.getItem(username)) {
            alert("هذا الاسم مستخدم بالفعل.");
        } else {
            localStorage.setItem(username, password);
            alert("تم إنشاء العضوية بنجاح!");
        }
    } else {
        alert("الرجاء ملء جميع الحقول.");
    }
}

function showChat() {
    document.querySelector('.login-container').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
    loadMessages();
}

function loadMessages() {
    let messageHtml = '';
    messages.forEach(msg => {
        messageHtml += `<div class="message">
                            <span class="sender">${msg.sender}:</span>
                            <span>${msg.text}</span>
                         </div>`;
    });
    document.getElementById('messages').innerHTML = messageHtml;
}

function sendMessage() {
    const messageText = document.getElementById('message').value;
    if (messageText) {
        messages.push({ sender: currentUser.name, text: messageText });
        loadMessages();
        document.getElementById('message').value = '';
    }
}

function openSettings() {
    document.getElementById('settings').style.display = 'block';
}

function closeSettings() {
    document.getElementById('settings').style.display = 'none';
}

function changeTheme() {
    const theme = document.getElementById('theme').value;
    if (theme === 'dark') {
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
    } else {
        document.body.style.backgroundColor = '#f0f0f0';
        document.body.style.color = '#333';
    }
}
function openProfile(username, imageUrl) {
  document.getElementById('profileName').innerText = username;
  document.getElementById('profileImage').src = imageUrl;
  document.getElementById('profilePopup').style.display = 'block';
}

function closeProfile() {
  document.getElementById('profilePopup').style.display = 'none';
}

function startPrivateChat() {
  alert('بدأ محادثة خاصة!');
}

function reportUser() {
  alert('تم إرسال بلاغ للإدارة.');
}
openProfile(username, imageUrl);
function sendPrivateMessage(toUser, message) {
  // الكود هنا مجرد محاكاة، مستقبلا نستخدم قاعدة بيانات
  alert(`تم إرسال رسالة خاصة إلى ${toUser}: ${message}`);
}
function previewImage() {
  const file = document.getElementById('uploadImage').files[0];
  if (file) {
    if (file.size > 10 * 1024 * 1024) { // 10MB
      alert('حجم الصورة كبير جدًا!');
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '200px';
      document.getElementById('uploadedImagePreview').innerHTML = '';
      document.getElementById('uploadedImagePreview').appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}
