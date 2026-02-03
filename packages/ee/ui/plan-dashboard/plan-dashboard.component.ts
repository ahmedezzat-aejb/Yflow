// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plan-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cyber-container">
      <div class="glass-wrapper">

        <header class="cyber-header">
          <div class="logo-area">
            <h1 class="logo-text">Y<span>FLOW</span></h1>
            <div class="neon-line"></div>
          </div>
          <div class="badge">CYBERNETIC AUTOMATION</div>
        </header>

        <div class="pricing-card">
          <div class="glitch-title">SELECT OPERATIONAL DURATION</div>

          <div class="slider-container">
            <input type="range" min="1" max="12" [(ngModel)]="selectedMonths" (input)="updateCalculations()" class="cyber-slider">
            <div class="duration-display">{{ selectedMonths }} <span>{{ selectedMonths === 12 ? 'YEAR (20% OFF)' : 'MONTHS' }}</span></div>
          </div>

          <div class="price-grid">
            <div class="price-item">
              <span class="label">RUBLE AMOUNT</span>
              <div class="value">{{ totalPriceRub }} ₽</div>
            </div>
            <div class="divider"></div>
            <div class="price-item">
              <span class="label">BITCOIN / USD</span>
              <div class="value green-glow">$ {{ totalPriceUsd }}</div>
            </div>
          </div>
        </div>

        <div class="projects-grid">
          <div *ngFor="let project of projects" class="project-node">
            <div class="node-info">
              <div class="node-id">NODE_ID: {{ project.id.substring(0,8) }}</div>
              <h3 class="node-name">{{ project.displayName }}</h3>
              <div class="status-tag" [class.active]="project.plan">
                {{ project.plan?.title || 'FREE_TIER_ACTIVE' }}
              </div>
            </div>

            <div class="action-buttons">
              <button (click)="upgrade(project.id, 'sber')" class="btn sber">
                <span class="icon">💳</span> OПЛАТИТЬ SBER
              </button>
              <button (click)="upgrade(project.id, 'stripe')" class="btn stripe">
                <span class="icon">🌐</span> STRIPE GATEWAY
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <style>
      .cyber-container {
        background-color: #05070a;
        background-image: radial-gradient(circle at 50% 50%, #0d1a21 0%, #05070a 100%);
        min-height: 100vh;
        padding: 20px;
        color: #e0e0e0;
        font-family: 'Orbitron', sans-serif; /* يفضل استدعاء هذا الخط من جوجل */
      }

      .glass-wrapper {
        max-width: 1000px;
        margin: 0 auto;
      }

      .cyber-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
        flex-wrap: wrap;
        gap: 20px;
      }

      .logo-text {
        font-size: 2rem;
        letter-spacing: 5px;
        margin: 0;
        color: #fff;
      }

      .logo-text span { color: #00f3ff; text-shadow: 0 0 10px #00f3ff; }

      .badge {
        border: 1px solid #00f3ff;
        padding: 5px 15px;
        font-size: 0.7rem;
        color: #00f3ff;
        box-shadow: inset 0 0 5px #00f3ff;
        clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
      }

      /* Pricing Card */
      .pricing-card {
        background: rgba(13, 17, 23, 0.8);
        border: 1px solid #1f2937;
        border-top: 3px solid #00f3ff;
        padding: 30px;
        border-radius: 4px;
        position: relative;
        margin-bottom: 30px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      }

      .glitch-title { color: #888; font-size: 0.8rem; margin-bottom: 20px; text-transform: uppercase; }

      .cyber-slider {
        width: 100%;
        appearance: none;
        background: #1a1f26;
        height: 4px;
        outline: none;
        margin: 25px 0;
      }
      .cyber-slider::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        background: #00f3ff;
        border-radius: 0;
        cursor: pointer;
        box-shadow: 0 0 15px #00f3ff;
      }

      .price-grid {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 20px;
      }

      .value { font-size: 1.8rem; font-weight: bold; margin-top: 5px; }
      .green-glow { color: #39ff14; text-shadow: 0 0 10px rgba(57, 255, 20, 0.5); }

      /* Projects List */
      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
      }

      .project-node {
        background: #0d1117;
        border-left: 4px solid #1f2937;
        padding: 20px;
        transition: 0.3s;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .project-node:hover {
        border-left-color: #00f3ff;
        background: #111821;
        transform: translateY(-5px);
      }

      .node-name { margin: 10px 0; font-size: 1.1rem; }
      .node-id { font-size: 0.6rem; color: #444; }

      .status-tag {
        font-size: 0.7rem;
        background: #1a1f26;
        padding: 4px 10px;
        display: inline-block;
      }
      .status-tag.active { color: #39ff14; border: 1px solid #39ff14; }

      /* Buttons */
      .btn {
        width: 100%;
        padding: 12px;
        border: none;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
        font-size: 0.8rem;
        text-align: left;
        clip-path: polygon(0 0, 95% 0, 100% 30%, 100% 100%, 5% 100%, 0 70%);
      }
      .sber { background: #21a038; margin-bottom: 10px; }
      .stripe { background: #675de6; }

      /* Responsive للموبايل */
      @media (max-width: 600px) {
        .price-grid { flex-direction: column; gap: 20px; }
        .cyber-header { justify-content: center; text-align: center; }
        .project-node { grid-template-columns: 1fr; }
      }
    </style>
  `
})
export class PlanDashboardComponent implements OnInit {
  projects: any[] = [];
  selectedMonths: number = 1;
  totalPriceRub: number = 500;
  totalPriceUsd: string = "5.50";

  private readonly API_URL = 'http://localhost:3333/projects';
  private readonly RUB_TO_USD = 0.011;
  private readonly BASE_PRICE = 500;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProjects();
    this.updateCalculations();
  }

  updateCalculations() {
    let total = this.selectedMonths * this.BASE_PRICE;
    if (this.selectedMonths === 12) total = total * 0.8;
    this.totalPriceRub = total;
    this.totalPriceUsd = (total * this.RUB_TO_USD).toFixed(2);
  }

  loadProjects() {
    this.http.get<any[]>(this.API_URL).subscribe(res => {
      this.projects = res;
    });
  }

  upgrade(id: string, gateway: string) {
  if (gateway === 'sber') {
    // بدل ما نبعت PATCH، هنطلب لينك الدفع من السيرفر
    // بنمرر عدد الشهور اللي اختارها المستخدم من السلايدر
    this.http.get(`${this.API_URL}/${id}/upgrade-to-golden?months=${this.selectedMonths}`)
      .subscribe((res: any) => {
        if (res.status === 'redirect' && res.url) {
          alert('🚀 جارٍ تحويلك لبوابة دفع Sberbank...');
          window.location.href = res.url; // ده اللي هيفتح صفحة البنك الحقيقية
        }
      }, err => {
        alert('❌ فشل الاتصال بالسيرفر، تأكد أن بورت 3333 شغال');
      });
  } else {
    // Stripe Logic (بنفس الطريقة لو جاهز عندك)
    alert('Stripe gateway integration coming soon...');
  }
}
}

// Note: This component assumes that the backend API is running on localhost:3333
// and that it has the necessary endpoints to fetch projects and generate Sberbank payment links.
