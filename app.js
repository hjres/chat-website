let currentRoom = 'general'; // الغرفة الافتراضية

// دالة لإرسال الرسالة
function sendMessage() {
  var messageBox = document.getElementById('messages');
  var input = document.getElementById('messageInput');
  if (input.value.trim() !== '') {
    var message = document.createElement('div');
    message.textContent = localStorage.getItem('currentUser') + ": " + input.value;
    messageBox.appendChild(message);
    input.value = '';
    messageBox.scrollTop = messageBox.scrollHeight;
  }
}

// دالة لتسجيل الخروج
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = "login.html"; // يرجع لصفحة تسجيل الدخول
}

// دالة لتبديل الثيم
function toggleTheme() {
  const body = document.body;
  const theme = body.classList.contains('light-theme') ? 'dark-theme' : 'light-theme';
  body.classList.remove('light-theme', 'dark-theme');
  body.classList.add(theme);
  localStorage.setItem('theme', theme);
}

// التحقق عند تحميل الصفحة
window.onload = function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.add(savedTheme);
  }

  var username = localStorage.getItem('currentUser');
  if (!username) {
    window.location.href = "login.html";
  } else if (username === "admin") {
    document.getElementById('admin-panel').style.display = 'block';
  }
};

// دالة لإدارة الأعضاء
function manageUsers() {
  alert('هذه صفحة إدارة الأعضاء (قيد التطوير)');
}

// دالة لإدارة الرسائل
function manageMessages() {
  alert('هذه صفحة إدارة الرسائل (قيد التطوير)');
}

// دالة لعرض البلاغات
function viewReports() {
  alert('عرض البلاغات (قيد التطوير)');
}

// دالة لعرض الملف الشخصي
function showProfile(user) {
  var profileName = document.getElementById('profileName');
  var profileImage = document.getElementById('profileImage');
  profileName.textContent = user;
  profileImage.src = 'profile-placeholder.jpg'; // أو ضع رابط الصورة
  document.getElementById('profilePopup').style.display = 'block';
}

// دالة لإغلاق الملف الشخصي
function closeProfile() {
  document.getElementById('profilePopup').style.display = 'none';
}

// دالة للرفع المعاينة
function previewImage() {
  const file = document.getElementById('uploadImage').files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    document.getElementById('uploadedImagePreview').innerHTML = `<img src="${reader.result}" />`;
  };
  if (file) {
    reader.readAsDataURL(file);
  }
}

// دالة لبدء المحادثة الخاصة
function startPrivateChat() {
  alert('مراسلة خاصة');
}

// دالة لإبلاغ عن المستخدم
function reportUser() {
  alert('تم الإبلاغ عن المستخدم');
}

// دالة لإضافة غرفة جديدة
function createRoom() {
  const roomName = prompt('أدخل اسم الغرفة الجديدة');
  if (roomName) {
    const roomList = document.getElementById('roomList');
    const roomItem = document.createElement('li');
    roomItem.textContent = roomName;
    roomItem.onclick = () => joinRoom(roomName);
    roomList.appendChild(roomItem);
  }
}

// دالة للانضمام إلى غرفة
function joinRoom(roomName) {
  currentRoom = roomName;
  document.getElementById('messages').innerHTML = ''; // مسح الرسائل القديمة
  alert(`تم الانضمام إلى الغرفة: ${roomName}`);
}
