
# همراه ناظر - PWA (Hamrah Nazer)

این مخزن شامل PWA فارسی (RTL) برای مهندس ناظر و مهندس راه است.

## نحوه استفاده
1. این پوشه را در ریشه‌ی ریپوی GitHub قرار دهید و push کنید.
2. در GitHub Pages از Settings → Pages سورس را روی branch `main` و پوشه `/ (root)` تنظیم کنید.
3. پس از چند دقیقه، سایت فعال خواهد شد: `https://<username>.github.io/<repo>`

## نکات
- برای کار آفلاین، Service Worker کش را مدیریت می‌کند.
- برای همگام‌سازی واقعی، تابع `sendToServer(job)` در `app.js` را به سرویس واقعی (مثلاً Firebase) وصل کنید.
- آیکون اصلی در `icons/logo.svg` قرار دارد.

---
نسخه آماده برای آپلود روی GitHub Pages.
