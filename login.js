document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  
  if (username === '' || password === '') {
    alert('يرجى إدخال اسم المستخدم وكلمة السر');
    return;
  }

  // تخزين بيانات العضوية في LocalStorage
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);

  // توجيه المستخدم إلى صفحة الشات
  window.location.href = 'index.html';
});