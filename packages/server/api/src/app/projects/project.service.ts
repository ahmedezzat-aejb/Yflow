// @ts-nocheck
import { Type, Static } from '@sinclair/typebox';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>
  ) {}

  async create(data: any) {
    const project = this.projectRepository.create({
      ...data,
      plan: { type: 'free', expiresAt: null }
    });
    return this.projectRepository.save(project);
  }

  async findAll() {
    return this.projectRepository.find({
      relations: ['flows']
    });
  }

  async findOne(id: number) {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['flows']
    });
  }

  async update(id: number, request: any) {
    await this.projectRepository.update(id, request);
    return this.projectRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return this.projectRepository.delete(id);
  }

  // --- دالة فحص الصلاحيات (قلب نظام Yflow) ---
  async canUseFeature(projectId: number, featureName: string): Promise<boolean> {
    const project = await this.projectRepository.findOneBy({ id: projectId });

    // 1. لو المشروع مش موجود أو الخطة Free
    if (!project || !project.plan || project.plan.type === 'free') {
        return false;
    }

    // 2. لو الخطة Golden، نتشيك على تاريخ الانتهاء
    if (project.plan.expiresAt) {
        const now = new Date();
        const expiresAt = new Date(project.plan.expiresAt);
        if (expiresAt < now) {
            console.log(`⚠️ Yflow System: Subscription for project ${projectId} has expired.`);
            return false;
        }
    }

    return true; // مبروك، معاك صلاحيات Golden
  }

  // --- توليد رابط دفع سبير بنك لـ Yflow ---
  async generateSberbankLink(projectId: number, months: number = 1) {
    const url = process.env.SBER_API_URL || 'https://sandbox.payment.sberbank.ru/payment/rest/register.do';

    const BASE_PRICE_RUB = 500;
    let totalAmount = months * BASE_PRICE_RUB;
    if (months >= 12) totalAmount *= 0.8; // خصم Yflow الخاص (20%)

    const finalSberAmount = Math.round(totalAmount * 100);

    const params = new URLSearchParams({
        userName: process.env.SBER_USERNAME || 'T7714222111-api',
        password: process.env.SBER_PASSWORD || 'password_test',
        orderNumber: `YFLOW-${projectId}-${months}-${Date.now()}`,
        amount: finalSberAmount.toString(),
        returnUrl: process.env.SBER_RETURN_URL || 'http://localhost:3333/projects/sber-callback',
        currency: "643",
        description: `Upgrade Yflow project to Golden - ${months} months`
    });

    try {
        const response = await fetch(`${url}?${params.toString()}`);
        const result = await response.json();
        if (result.errorCode) throw new Error(result.errorMessage);
        return { paymentUrl: result.formUrl };
    } catch (error) {
        throw new Error("Yflow Payment Error: فشل الاتصال بالبنك");
    }
  }

  // --- تفعيل ترقية Yflow Golden ---
  async finalizeUpgrade(projectId: number, months: number) {
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + months);

      const updatedPlan = {
          type: 'golden',
          expiresAt: expiryDate,
          activatedAt: new Date()
      };

      console.log(`🚀 [Yflow System] Project ${projectId} is now GOLDEN until ${expiryDate.toDateString()}`);

      return await this.projectRepository.update(projectId, { plan: updatedPlan });
  }
}
