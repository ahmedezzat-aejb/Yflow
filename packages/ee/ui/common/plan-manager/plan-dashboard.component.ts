// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-plan-dashboard',
  standalone: true, // عشان يشتغل في أي مكان فوراً
  template: `
    <div style="padding: 40px; background: #f0f2f5; min-height: 100vh; font-family: 'Segoe UI', sans-serif;">
      <h1 style="color: #1a1a1a; border-bottom: 3px solid #007bff; padding-bottom: 10px;">مدير خطط المشاريع</h1>

      <div style="display: grid; gap: 20px; margin-top: 30px;">
        <div *ngFor="let p of projects" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3 style="margin: 0; color: #333;">{{ p.displayName }}</h3>
            <p style="color: #666; font-size: 0.8rem;">Project ID: {{ p.id }}</p>
            <span [style.background]="p.plan ? '#ffd700' : '#e9ecef'" style="padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: bold;">
              {{ p.plan?.title || 'FREE PLAN' }}
            </span>
          </div>
          <button (click)="upgrade(p.id)" style="background: #28a745; color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: 0.3s;">
            Upgrade to Golden Plan
          </button>
        </div>
      </div>
    </div>
  `
})
export class PlanDashboardComponent implements OnInit {
  projects: any[] = [];
  private readonly API = 'http://localhost:3333/projects'; // السيرفر اللي شغال عندك

  constructor(private http: HttpClient) {}

  ngOnInit() { this.refresh(); }

  refresh() {
    this.http.get<any[]>(this.API).subscribe(res => this.projects = res);
  }

  upgrade(id: string) {
    const goldenPlan = { title: 'Golden Plan', price: 500, currency: 'USD' };
    this.http.patch(`${this.API}/${id}`, { plan: goldenPlan }).subscribe(() => {
      alert('تمت الترقية بنجاح! ✅');
      this.refresh();
    });
  }
}
