document.addEventListener('DOMContentLoaded', () => {
  const lengthInput = document.getElementById('length');
  const widthInput = document.getElementById('width');
  const depthInput = document.getElementById('depth');
  const calcBtn = document.getElementById('calc-volume');
  const resultP = document.getElementById('volume-result');

  calcBtn.addEventListener('click', () => {
    const length = parseFloat(lengthInput.value);
    const width = parseFloat(widthInput.value);
    const depth = parseFloat(depthInput.value);
    if (isNaN(length) || isNaN(width) || isNaN(depth)) {
      resultP.textContent = "لطفاً همه مقادیر را وارد کنید.";
      return;
    }
    const volume = length * width * depth; // متر مکعب
    resultP.textContent = `حجم خاک: ${volume.toFixed(3)} متر مکعب`;
  });
});
