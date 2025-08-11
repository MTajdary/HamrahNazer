document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('settings-form');
  const englishCheckbox = document.getElementById('toggle-english-numbers');
  const unitSelect = document.getElementById('unit-select');
  const reportTagCheckbox = document.getElementById('toggle-report-tag');
  const msg = document.getElementById('settings-msg');

  // بارگذاری تنظیمات ذخیره شده
  const settings = JSON.parse(localStorage.getItem('hn-settings') || '{}');
  englishCheckbox.checked = settings.englishNumbers || false;
  unitSelect.value = settings.unit || 'metric';
  reportTagCheckbox.checked = settings.showReportTag !== false;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const newSettings = {
      englishNumbers: englishCheckbox.checked,
      unit: unitSelect.value,
      showReportTag: reportTagCheckbox.checked
    };
    localStorage.setItem('hn-settings', JSON.stringify(newSettings));
    msg.textContent = "تنظیمات ذخیره شد.";
  });
});
