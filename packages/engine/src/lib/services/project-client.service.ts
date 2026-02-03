const API_BASE_URL = 'http://localhost:3333';

export const projectClientService = {
  // جلب المشاريع
  async getProjects() {
    const res = await fetch(`${API_BASE_URL}/projects`);
    return res.json();
  },

  // تحديث الخطة
  async updatePlan(id: string, plan: any) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan })
    });
    return res.json();
  }
};
