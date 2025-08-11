document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lab-form');
  const resultP = document.getElementById('lab-result');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const testType = form['test-type'].value;
    const value = parseFloat(form['value'].value);
    if (!testType || isNaN(value)) {
      resultP.textContent = "لطفاً داده‌ها را به درستی وارد کنید.";
      return;
    }

    let passed = false;
    let msg = "";

    // نمونه قوانین ساده - بر اساس نشریه 101 و AASHTO
    switch(testType) {
      case 'soil':
        passed = value >= 15; // مثال حداقل مقاومت خاک
        msg = passed ? "آزمایش خاک موفق بود." : "مقدار مقاومت خاک پایین است.";
        break;
      case 'concrete':
        passed = value >= 25; // حداقل fc بتن (MPa)
        msg = passed ? "آزمایش بتن موفق بود." : "مقاومت بتن کمتر از حد مجاز است.";
        break;
      case 'asphalt':
        passed = value >= 50; // مقاومت آسفالت (مثال)
        msg = passed ? "آزمایش آسفالت موفق بود." : "مقاومت آسفالت پایین است.";
        break;
      case 'steel':
        passed = value >= 300; // مقاومت فولاد (MPa)
        msg = passed ? "آزمایش فولاد موفق بود." : "مقاومت فولاد کمتر از حد استاندارد است.";
        break;
      default:
        msg = "نوع آزمایش نامشخص است.";
    }

    resultP.textContent = msg;
  });
});
