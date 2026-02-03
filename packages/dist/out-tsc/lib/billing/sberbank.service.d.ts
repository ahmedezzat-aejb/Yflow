export declare class SberbankService {
    private readonly PLANS;
    private readonly SBERBANK_API_URL;
    createPayment(planType: 'PRO' | 'ENTERPRISE', orderId: string): Promise<any>;
}
