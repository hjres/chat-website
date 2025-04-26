document.getElementById('settings-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const backgroundColor = document.getElementById('background-color').value;
  const fontColor = document.getElementById('font-color').value;
  const fontFamily = document.getElementById('font-family').value;
  const status = document.getElementById('status').value;

  // حفظ الإعدادات في LocalStorage
  localStorage.setItem('chatUsername', username);
  localStorage.setItem('chatBackgroundColor', backgroundColor);
  localStorage.setItem('chatFontColor', fontColor);
  localStorage.setItem('chatFontFamily', fontFamily);
  localStorage.setItem('chatStatus', status);

  // العودة إلى الشات
  window.location.href = 'index.html';
});