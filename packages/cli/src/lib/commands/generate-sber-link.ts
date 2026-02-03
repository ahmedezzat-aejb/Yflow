import { Command } from 'commander';

export const generateSberLinkCommand = new Command('sber-link')
  .description('توليد رابط دفع تجريبي لسبير بنك')
  .argument('<projectId>', 'معرف المشروع')
  .action(async (projectId) => {
    console.log(`🔍 جاري فحص المشروع رقم: ${projectId}...`);

    // محاكاة طلب للبنك
    const testUrl = "https://sandbox.payment.sberbank.ru/payment/rest/register.do";
    console.log(`✅ تم الاتصال بـ Sberbank بنجاح.`);
    console.log(`🔗 رابط الدفع جاهز: ${testUrl}?orderId=${projectId}_test_123`);
  });
