// Mock API service for development and testing
interface Project {
  id: string;
  displayName: string;
  plan?: {
    title: string;
    price: number;
    currency: string;
    gateway: string;
  };
}

class MockApiService {
  private projects: Project[] = [
    {
      id: 'proj-001-cyber',
      displayName: 'Cyber Automation Alpha',
      plan: {
        title: 'CYBER_6M',
        price: 3000,
        currency: 'RUB',
        gateway: 'sber'
      }
    },
    {
      id: 'proj-002-neon',
      displayName: 'Neon Flow System',
      plan: undefined
    },
    {
      id: 'proj-003-digital',
      displayName: 'Digital Matrix Core',
      plan: {
        title: 'CYBER_12M',
        price: 4800,
        currency: 'RUB',
        gateway: 'stripe'
      }
    },
    {
      id: 'proj-004-quantum',
      displayName: 'Quantum Gateway',
      plan: undefined
    },
    {
      id: 'proj-005-synapse',
      displayName: 'Synapse Network',
      plan: {
        title: 'CYBER_3M',
        price: 1500,
        currency: 'RUB',
        gateway: 'sber'
      }
    }
  ];

  async getProjects(): Promise<Project[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...this.projects];
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const projectIndex = this.projects.findIndex(p => p.id === id);
    if (projectIndex === -1) {
      throw new Error(`Project with id ${id} not found`);
    }

    this.projects[projectIndex] = { ...this.projects[projectIndex], ...data };
    return { ...this.projects[projectIndex] };
  }

  // For development purposes - add random projects
  addRandomProject() {
    const randomId = `proj-${Math.random().toString(36).substr(2, 9)}`;
    const names = [
      'Neural Interface',
      'Cyber Protocol',
      'Digital Fortress',
      'Quantum Processor',
      'Synaptic Network',
      'Binary Matrix',
      'Data Stream',
      'Virtual Core'
    ];
    const randomName = names[Math.floor(Math.random() * names.length)];
    
    const newProject: Project = {
      id: randomId,
      displayName: `${randomName} ${Math.floor(Math.random() * 100)}`,
      plan: Math.random() > 0.5 ? undefined : {
        title: 'CYBER_1M',
        price: 500,
        currency: 'RUB',
        gateway: Math.random() > 0.5 ? 'sber' : 'stripe'
      }
    };

    this.projects.push(newProject);
    return newProject;
  }
}

export const mockApiService = new MockApiService();
export default mockApiService;
