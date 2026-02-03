import { Body, Controller, Param, Patch, Post, Query, Get, Res, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() data: any) {
    return this.projectService.create(data);
  }

  @Get()
  async findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: any
  ) {
    return this.projectService.update(+id, request);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }

  // الطريق المعدل لاستقبال الشهور
  // GET /api/projects/:id/upgrade-to-golden?months=12
  @Get(':id/upgrade-to-golden')
  async upgradeProject(
    @Param('id') projectId: string,
    @Query('months') months: string // استلام الشهور من الـ UI
  ) {
      const monthsCount = parseInt(months) || 1;
      console.log(`🚀 طلب ترقية للمشروع: ${projectId} لمدة ${monthsCount} شهر`);

      // بنادي على الخدمة المعدلة اللي بتحسب السعر بناءً على الشهور
      const payment = await this.projectService.generateSberbankLink(+projectId, monthsCount);

      return {
          status: 'redirect',
          url: payment.paymentUrl
      };
  }

  // طريق الـ Callback المعدل لتحديث الداتابيز
  @Get('sber-callback')
  async handleSberbank(
    @Query('orderId') orderId: string,
    @Res() res: any // استخدمنا الـ Response عشان نعمل تحويل (Redirect)
  ) {
      console.log(`✅ تم الرجوع من البنك للطلب: ${orderId}`);

      // استخراج الـ ProjectId من الـ OrderId (اللي عملناه بصيغة YFLOW-ID-Time)
      // مثال: YFLOW-123-17150000 -> ["YFLOW", "123", "17150000"]
      const parts = orderId.split('-');
      const projectId = parts[1];

      // هنا المفروض نكلم خدمة finalizeUpgrade اللي كتبناها في السيرفس
      // ملاحظة: لتبسيط المثال، هنفترض إننا بنثبتها Golden
      await this.projectService.finalizeUpgrade(+projectId, 1);

      // تحويل المستخدم لصفحة النجاح في الـ Angular (الـ Dashboard بتاعتك)
      // غير الـ URL ده للينك الـ Dashboard الحقيقي بتاعك
      return res.redirect('http://localhost:4200/dashboard?status=success');
  }
}
