<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>تسجيل الدخول أو العضوية</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .login-container {
      background: white;
      padding: 20px;
      border: 1px solid #ddd;
      width: 300px;
      text-align: center;
    }
    input {
      width: 90%;
      padding: 10px;
      margin: 10px 0;
    }
    button {
      width: 95%;
      padding: 10px;
      margin-top: 10px;
      background: #28a745;
      color: white;
      border: none;
    }
    .link {
      margin-top: 15px;
      display: block;
      color: blue;
      cursor: pointer;
    }
  </style>
</head>

<body>

<div class="login-container">
  <h2>تسجيل الدخول</h2>
  <input type="text" id="username" placeholder="اسم المستخدم">
  <input type="password" id="password" placeholder="كلمة المرور">
  <button onclick="login()">دخول</button>
  <div class="link" onclick="register()">تسجيل عضوية جديدة</div>
  <div class="link" onclick="guestLogin()">دخول كزائر</div>
</div>

<script>
  function login() {
    var user = document.getElementById('username').value.trim();
    var pass = document.getElementById('password').value.trim();

    if (!user || !pass) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    // التحقق من عضوية الأدمن
    if (user === "admin" && pass === "admin123") {
      localStorage.setItem('currentUser', user);
      window.location.href = "index.html";
    } else {
      var storedUsers = JSON.parse(localStorage.getItem('users')) || [];

      var found = storedUsers.find(u => u.username === user && u.password === pass);
      if (found) {
        localStorage.setItem('currentUser', user);
        window.location.href = "index.html";
      } else {
        alert("بيانات الدخول غير صحيحة");
      }
    }
  }

  function register() {
    var username = prompt("ادخل اسم المستخدم:");
    var password = prompt("ادخل كلمة المرور:");
    if (!username || !password) {
      alert("جميع الحقول مطلوبة!");
      return;
    }
    
    var users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(u => u.username === username)) {
      alert("اسم المستخدم مستخدم بالفعل!");
      return;
    }

    users.push({username: username, password: password});
    localStorage.setItem('users', JSON.stringify(users));
    alert("تم إنشاء الحساب! يمكنك تسجيل الدخول الآن.");
  }

  function guestLogin() {
    localStorage.setItem('currentUser', "زائر");
    window.location.href = "index.html";
  }
</script>

</body>
</html>
