const fs = require('fs');
const path = require('path');

console.log("--- 🔍 فحص مسارات مشروع Yflow ---");
console.log("المكان الحالي:", __dirname);

const filesToCheck = [
    'index.html',
    'package.json',
    'src/main.tsx',
    'src/App.tsx'
];

filesToCheck.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        console.log(`✅ موجود: ${file}`);
    } else {
        console.log(`❌ مفقود: ${file} (تأكد من مكانه)`);
    }
});

// فحص محتوى index.html عشان نضمن إنه شايف الـ src صح
try {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    if (html.includes('src="/src/main.tsx"')) {
        console.log("✅ ربط الـ HTML بالـ JS سليم.");
    } else {
        console.log("⚠️ تحذير: الـ index.html مش بيشاور على /src/main.tsx صح.");
    }
} catch (e) {
    console.log("❌ مش عارف أقرأ ملف index.html");
}
