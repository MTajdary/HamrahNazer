import jsPDF from "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('report-form');
  const previewDiv = document.getElementById('image-preview');
  const pdfResult = document.getElementById('pdf-result');
  let imagesData = [];

  document.getElementById('report-images').addEventListener('change', e => {
    previewDiv.innerHTML = "";
    imagesData = [];
    const files = e.target.files;
    if(files.length > 5) {
      alert("حداکثر 5 تصویر مجاز است.");
      e.target.value = "";
      return;
    }
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        const img = document.createElement('img');
        img.src = ev.target.result;
        img.style.maxWidth = '100px';
        img.style.margin = '5px';
        previewDiv.appendChild(img);
        imagesData.push(ev.target.result);
      };
      reader.readAsDataURL(file);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts:true,
      floatPrecision: 16
    });

    const title = document.getElementById('report-title').value;
    const text = document.getElementById('report-text').value;

    doc.setFontSize(18);
    doc.text(title, 10, 20);
    doc.setFontSize(12);
    doc.text(text, 10, 30, {maxWidth: 190});

    let yPos = 50;
    imagesData.forEach((imgData, idx) => {
      if(yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.addImage(imgData, 'JPEG', 10, yPos, 60, 40);
      yPos += 50;
    });

    // تگ کپی‌رایت در پایان گزارش
    doc.setFontSize(10);
    doc.text("© محمد تاجداری", 10, 290);

    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);

    pdfResult.innerHTML = `<p>گزارش ساخته شد: <a href="${url}" target="_blank" download="report.pdf">دانلود PDF</a></p>`;
  });
});
