import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const YflowApi = {
  // Projects API
  getProjects: () => axios.get(`${API_URL}/projects`),
  createProject: (data: any) => axios.post(`${API_URL}/projects`, data),
  getProjectById: (id: string) => axios.get(`${API_URL}/projects/${id}`),
  updateProject: (id: string, data: any) => axios.patch(`${API_URL}/projects/${id}`, data),
  deleteProject: (id: string) => axios.delete(`${API_URL}/projects/${id}`),

  // Flows API
  getFlows: () => axios.get(`${API_URL}/flows`),
  getFlowById: (id: string) => axios.get(`${API_URL}/flows/${id}`),
  createFlow: (data: any) => axios.post(`${API_URL}/flows`, data),
  updateFlow: (id: string, data: any) => axios.patch(`${API_URL}/flows/${id}`, data),
  deleteFlow: (id: string) => axios.delete(`${API_URL}/flows/${id}`),
  executeFlow: (id: string, data: any) => axios.post(`${API_URL}/flows/${id}/execute`, data),

  // Generic methods
  post: (url: string, data: any) => axios.post(`${API_URL}${url}`, data),
  get: (url: string) => axios.get(`${API_URL}${url}`),
  patch: (url: string, data: any) => axios.patch(`${API_URL}${url}`, data),
  delete: (url: string) => axios.delete(`${API_URL}${url}`),
};
