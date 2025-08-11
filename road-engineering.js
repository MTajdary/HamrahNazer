document.addEventListener('DOMContentLoaded', () => {
  const slopeInput = document.getElementById('slope');
  const lengthInput = document.getElementById('length');
  const cutFillInput = document.getElementById('cut-fill');
  const calcBtn = document.getElementById('calc-road');
  const resultP = document.getElementById('road-result');

  calcBtn.addEventListener('click', () => {
    const slope = parseFloat(slopeInput.value);
    const length = parseFloat(lengthInput.value);
    const cutFill = parseFloat(cutFillInput.value);

    if (isNaN(slope) || isNaN(length) || isNaN(cutFill)) {
      resultP.textContent = "لطفاً همه مقادیر را وارد کنید.";
      return;
    }

    // محاسبه نمونه: شیب طولی واقعی (به درصد) و حجم کلی خاک‌برداری
    const effectiveSlope = slope * length / 100;
    const totalVolume = cutFill * length;

    resultP.textContent = `شیب طولی واقعی: ${effectiveSlope.toFixed(2)} متر\nحجم کلی خاک‌برداری: ${totalVolume.toFixed(2)} متر مکعب`;
  });
});
