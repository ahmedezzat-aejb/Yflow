import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@nestjs/common';
let SberbankService = class SberbankService {
    constructor() {
        // إعدادات الأسعار لـ Yflow - مربوطة بالروبل
        this.PLANS = {
            PRO: {
                amount: 2500, // 2500 روبل
                name: 'Yflow Pro Plan'
            },
            ENTERPRISE: {
                amount: 10000, // 10,000 روبل
                name: 'Yflow Enterprise Plan'
            }
        };
        // بيقرأ رابط البنك من ملف الـ .env أو يستخدم الرابط الافتراضي
        this.SBERBANK_API_URL = process.env['SBERBANK_API_URL'] || 'https://securepayments.sberbank.ru/payment/rest/register.do';
    }
    createPayment(planType, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedPlan = this.PLANS[planType];
            // سبير بنك بيطلب السعر بالـ Kopecks (بنضرب في 100)
            const amountInKopecks = selectedPlan.amount * 100;
            const params = new URLSearchParams({
                // بيسحب اليوزر والباسورد من ملف الـ .env اللي جهزناه سوا
                userName: process.env['SBERBANK_USERNAME'] || '',
                password: process.env['SBERBANK_PASSWORD'] || '',
                orderNumber: orderId,
                amount: amountInKopecks.toString(),
                currency: '643', // كود الروبل الروسي
                returnUrl: `${process.env['AP_FRONTEND_URL']}/success`, // هيرجع العميل لصفحة النجاح في Yflow
                failUrl: `${process.env['AP_FRONTEND_URL']}/fail`, // هيرجع العميل لصفحة الفشل لو الدفع باظ
                description: `Subscription: ${selectedPlan.name}`
            });
            try {
                const response = yield fetch(`${this.SBERBANK_API_URL}?${params.toString()}`, {
                    method: 'POST' // سبير بنك بيفضل الـ POST في الـ Register
                });
                const data = yield response.json();
                // لو البنك رجع خطأ (زي يوزر غلط) هيظهرلك في الـ Console عشان نعرفه
                if (data.errorCode) {
                    console.error('Sberbank Error:', data.errorMessage);
                }
                return data; // هيرجع الـ formUrl اللي فيه صفحة الدفع
            }
            catch (error) {
                console.error('Sberbank Connection Error:', error);
                throw error;
            }
        });
    }
};
SberbankService = __decorate([
    Injectable()
], SberbankService);
export { SberbankService };
//# sourceMappingURL=sberbank.service.js.map