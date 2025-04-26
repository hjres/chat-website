// بيانات وهمية للمستخدمين (يمكن استبدالها لاحقًا بقاعدة بيانات)
let users = [
  { username: "admin", password: "1234", isAdmin: true, avatar: "images/default.png", status: "مدير الموقع" },
  { username: "user1", password: "1111", isAdmin: false, avatar: "images/default.png", status: "مستخدم عادي" }
];

// بيانات الجلسة
let currentUser = null;
let pinnedMessages = [];
let adminMessageColor = "#ffd54f";

// تسجيل الدخول
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function(e) {
      e.preventDefault();
      login();
    });
    showRegisteredUsers();
  }
});

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.location.href = "index.html";
  } else {
    document.getElementById("error").classList.remove("hidden");
  }
}

function showRegisteredUsers() {
  const list = document.getElementById("users");
  users.forEach(u => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="${u.avatar}" class="avatar"> ${u.username}`;
    list.appendChild(li);
  });
}

// تحميل بيانات الجلسة عند الدخول للشات
if (localStorage.getItem("currentUser") && document.body.classList.contains('chat-page')) {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  loadMessages();
}

// إرسال رسالة
function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const messageText = messageInput.value.trim();
  if (!messageText) return;

  const messagesDiv = document.getElementById("messages");

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.innerHTML = `
    <img src="${currentUser.avatar}" class="avatar">
    <strong style="color: ${currentUser.color || 'black'}">${currentUser.username}</strong>:
    <span>${messageText}</span>
  `;

  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  messageInput.value = '';

  // إشعار بسيط
  if (currentUser.notifications) {
    alert("وصلتك رسالة جديدة!");
  }
}

// الإعدادات
function openSettings() {
  document.getElementById("settings").classList.remove("hidden");
}

function closeSettings() {
  document.getElementById("settings").classList.add("hidden");
}

function saveSettings() {
  const newName = document.getElementById("newName").value;
  const newStatus = document.getElementById("newStatus").value;
  const theme = document.getElementById("themeSelect").value;
  const avatarFile = document.getElementById("newAvatar").files[0];

  if (newName) currentUser.username = newName;
  if (newStatus) currentUser.status = newStatus;
  if (theme) currentUser.theme = theme;

  // رفع الصورة الجديدة
  if (avatarFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      currentUser.avatar = e.target.result;
      saveCurrentUser();
    };
    reader.readAsDataURL(avatarFile);
  } else {
    saveCurrentUser();
  }

  alert("تم حفظ الإعدادات!");
  closeSettings();
}

function saveCurrentUser() {
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  location.reload();
}

// لوحة تحكم الأدمن
function goToAdminPanel() {
  if (currentUser && currentUser.isAdmin) {
    window.location.href = "admin.html";
  } else {
    alert("فقط الأدمن يمكنه الدخول للوحة التحكم!");
  }
}

// تحميل الأعضاء في لوحة الأدمن
if (document.body.classList.contains('admin-page')) {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "login.html";
  } else {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser.isAdmin) {
      window.location.href = "index.html";
    }
  }

  const adminUserList = document.getElementById("adminUserList");
  users.forEach((u, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${u.username} (${u.status})
      <button onclick="banUser(${index})">حظر</button>
      <button onclick="unbanUser(${index})">فك الحظر</button>
    `;
    adminUserList.appendChild(li);
  });
}

function banUser(index) {
  users[index].banned = true;
  alert("تم حظر المستخدم!");
}

function unbanUser(index) {
  users[index].banned = false;
  alert("تم فك الحظر!");
}

// تثبيت الرسائل
function pinMessage() {
  const messageText = document.getElementById("pinnedMessage").value.trim();
  if (!messageText) return;

  pinnedMessages.push(messageText);

  const messagesDiv = document.getElementById("messages");
  const pinnedDiv = document.createElement("div");
  pinnedDiv.className = "message pinned";
  pinnedDiv.style.backgroundColor = adminMessageColor;
  pinnedDiv.innerHTML = `<strong>مثبت:</strong> ${messageText}`;
  messagesDiv.appendChild(pinnedDiv);

  alert("تم تثبيت الرسالة!");
}

// تغيير لون رسائل الأدمن
function changeAdminColor() {
  const color = document.getElementById("adminColorPicker").value;
  adminMessageColor = color;
  alert("تم تغيير لون رسائل الأدمن!");
}

// تحميل الرسائل (بسيط الآن)
function loadMessages() {
  const messagesDiv = document.getElementById("messages");
  pinnedMessages.forEach(text => {
    const pinnedDiv = document.createElement("div");
    pinnedDiv.className = "message pinned";
    pinnedDiv.style.backgroundColor = adminMessageColor;
    pinnedDiv.innerHTML = `<strong>مثبت:</strong> ${text}`;
    messagesDiv.appendChild(pinnedDiv);
  });
}