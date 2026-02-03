// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  // هنا بنكتب الـ HTML جوه الملف نفسه عشان نخلص من مشكلة الـ HTML المفقود
  template: `
    <div style="direction: rtl; padding: 25px; background: #ffffff; border: 5px solid #2563eb; border-radius: 20px; margin: 30px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);">
      <h1 style="color: #1e293b; font-size: 1.8rem; margin-bottom: 25px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
        ⚙️ لوحة تحكم الاشتراكات (تجربة حقيقية)
      </h1>

      <div *ngIf="projects.length === 0" style="padding: 20px; text-align: center; color: #64748b;">
        جاري تحميل المشاريع من السيرفر...
      </div>

      <div style="display: grid; gap: 15px;">
        <div *ngFor="let p of projects" style="background: #f8fafc; padding: 20px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #e2e8f0;">
          <div>
            <div style="font-weight: 800; font-size: 1.2rem; color: #0f172a;">{{ p.displayName }}</div>
            <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 8px;">ID: {{ p.id }}</div>
            <span [style.background]="p.plan ? '#fef08a' : '#cbd5e1'" style="padding: 5px 15px; border-radius: 50px; font-size: 0.85rem; font-weight: bold; color: #854d0e;">
               الحالية: {{ p.plan?.title || 'FREE' }}
            </span>
          </div>

          <button (click)="upgrade(p.id)" style="background: #2563eb; color: white; border: none; padding: 12px 25px; border-radius: 10px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);">
            ترقية لـ Golden Plan ✨
          </button>
        </div>
      </div>
    </div>
  `
})
export class PlanDashboardComponent implements OnInit {
  projects: any[] = [];
  // السيرفر بتاعك اللي شغال على بورت 3333
  private readonly API = 'http://localhost:3333/projects';

  constructor(private http: HttpClient) {}

  ngOnInit() { this.load(); }

  load() {
    this.http.get<any[]>(this.API).subscribe({
      next: (res) => this.projects = res,
      error: (err) => alert('السيرفر مش شغال أو فيه مشكلة في الـ CORS')
    });
  }

  upgrade(id: string) {
    const payload = { plan: { title: 'Golden Plan', price: 500, currency: 'USD' } };
    this.http.patch(`${this.API}/${id}`, payload).subscribe(() => {
      alert('تمت الترقية بنجاح في الداتابيز! ✅');
      this.load(); // ريفريش للداتا
    });
  }
}
