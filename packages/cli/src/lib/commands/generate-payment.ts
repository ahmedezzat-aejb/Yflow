// @ts-nocheck

// packages/cli/src/lib/commands/generate-payment.ts
import { Command } from 'commander';

export const generatePaymentCommand = new Command('pay')
  .description('توليد رابط دفع سبير بنك لمشروع معين')
  .argument('<projectId>', 'ID بتاع المشروع')
  .option('-a, --amount <number>', 'المبلغ بالروبل', '500')
  .action(async (projectId, options) => {
    console.log(`🚀 جاري الاتصال بـ Sberbank للمشروع: ${projectId}...`);

    const SBER_API = 'https://sandbox.payment.sberbank.ru/payment/rest/register.do';

    // تجهيز البيانات
    const params = new URLSearchParams({
        userName: 'T7714222111-api', // اليوزر التيست
        password: 'password_test',
        orderNumber: `CLI-${projectId}-${Date.now()}`,
        amount: (parseInt(options.amount) * 100).toString(), // تحويل للقروش
        returnUrl: 'http://localhost:3333/success',
        currency: '643'
    });

    try {
        const response = await fetch(`${SBER_API}?${params.toString()}`);
        const data = await response.json();

        if (data.formUrl) {
            console.log('\x1b[32m%s\x1b[0m', '✅ تم توليد رابط الدفع بنجاح:');
            console.log('\x1b[36m%s\x1b[0m', data.formUrl); // لون لبني للرابط
        } else {
            console.error('❌ خطأ من البنك:', data.errorMessage || 'بيانات غير صحيحة');
        }
    } catch (error) {
        console.error('❌ فشل الاتصال بالسيرفر:', error.message);
    }
  });
