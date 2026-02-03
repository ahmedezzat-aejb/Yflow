const fs = require('fs');
const path = require('path');

const paths = [
  'packages/server/api/src/main.ts',
  'packages/server/api/src/app/app.module.ts',
  'packages/server/api/src/app/projects/project.entity.ts',
  'packages/server/api/src/app/projects/project.service.ts',
  'packages/server/api/src/app/database/data-source.ts',
  'packages/server/api/project.json',
  'packages/server/api/tsconfig.app.json',
  'node_modules/typeorm/package.json'
];

console.log('--- فحص خريطة المشروع ---');
paths.forEach(p => {
  const exists = fs.existsSync(path.join(__dirname, p));
  console.log(`${exists ? '✅' : '❌'} ${p}`);
});

try {
  require('typeorm');
  console.log('✅ TypeORM: موجودة وسليمة');
} catch (e) {
  console.log('❌ TypeORM: مش ملقوطة أو فيها ملفات ناقصة');
}
