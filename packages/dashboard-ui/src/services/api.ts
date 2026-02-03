import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // عنوان الـ NestJS

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const YflowApi = {
  // Projects API
  getProjects: () => axios.get(`${API_URL}/projects`),
  createProject: (data: any) => axios.post(`${API_URL}/projects`, data),
  getProjectById: (id: string) => axios.get(`${API_URL}/projects/${id}`),
  updateProject: (id: string, data: any) => axios.patch(`${API_URL}/projects/${id}`, data),
  deleteProject: (id: string) => axios.delete(`${API_URL}/projects/${id}`),
  
  // Flows API (CRUD)
  getFlows: () => axios.get(`${API_URL}/flows`),
  getFlowById: (id: string) => axios.get(`${API_URL}/flows/${id}`),
  createFlow: (data: any) => axios.post(`${API_URL}/flows`, data),
  updateFlow: (id: string, data: any) => axios.patch(`${API_URL}/flows/${id}`, data),
  deleteFlow: (id: string) => axios.delete(`${API_URL}/flows/${id}`),
  
  // Execute Flow
  executeFlow: (id: string) => axios.post(`${API_URL}/flows/${id}/execute`),
  
  // Get Flow Runs/History
  getFlowRuns: (flowId: string) => axios.get(`${API_URL}/flows/${flowId}/runs`),
};

// Error handling wrapper
export const handleApiError = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('API Error:', error.response.data);
    return error.response.data.message || 'Server error occurred';
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Network Error:', error.request);
    return 'Network error occurred';
  } else {
    // Something happened in setting up the request
    console.error('Request Error:', error.message);
    return 'Request setup error';
  }
};
