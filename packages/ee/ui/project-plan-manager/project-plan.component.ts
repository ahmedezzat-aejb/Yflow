// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-plan-manager',
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">إدارة خطط المشاريع (احترافي)</h1>
      <div class="grid gap-4">
        <div *ngFor="let project of projects" class="border p-4 rounded-lg shadow-sm bg-white flex justify-between items-center">
          <div>
            <h2 class="font-semibold text-lg">{{ project.displayName }}</h2>
            <p class="text-sm text-gray-500">ID: {{ project.id }}</p>
            <span class="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              الخطة: {{ project.plan?.title || 'Free' }}
            </span>
          </div>
          <button (click)="upgrade(project.id)" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            ترقية لـ Golden Plan
          </button>
        </div>
      </div>
    </div>
  `
})
export class ProjectPlanManagerComponent implements OnInit {
  projects: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3333/projects').subscribe(res => this.projects = res);
  }

  upgrade(id: string) {
    const plan = { title: 'Golden Plan', price: 500, currency: 'USD' };
    this.http.patch(`http://localhost:3333/projects/${id}`, { plan }).subscribe(() => {
      alert('تم التحديث بنجاح!');
      this.ngOnInit(); // Reload
    });
  }
}
