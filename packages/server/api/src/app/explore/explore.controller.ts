import { Controller, Get, Query, Param } from '@nestjs/common';

interface ExploreItem {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  popularity: number;
  isNew: boolean;
  isPremium: boolean;
  tags: string[];
}

interface App {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  isInstalled: boolean;
  isPremium: boolean;
  popularity: number;
  features: string[];
  connections: number;
}

interface Utility {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  isAvailable: boolean;
  isPremium: boolean;
  lastUsed?: string;
  usage: number;
  action?: string;
}

@Controller('explore')
export class ExploreController {
  private exploreItems: ExploreItem[] = [
    {
      id: '1',
      name: 'Email Automation Suite',
      description: 'Complete email marketing automation with personalization',
      category: 'Popular',
      icon: '📧',
      popularity: 98,
      isNew: false,
      isPremium: false,
      tags: ['Email', 'Marketing', 'Automation']
    },
    {
      id: '2',
      name: 'Social Media Manager',
      description: 'Schedule and manage posts across all social platforms',
      category: 'Popular',
      icon: '📱',
      popularity: 95,
      isNew: true,
      isPremium: false,
      tags: ['Social Media', 'Scheduling', 'Marketing']
    },
    {
      id: '3',
      name: 'E-commerce Integration',
      description: 'Connect your online store with multiple sales channels',
      category: 'Popular',
      icon: '🛒',
      popularity: 92,
      isNew: false,
      isPremium: true,
      tags: ['E-commerce', 'Sales', 'Integration']
    }
  ];

  private apps: App[] = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team communication and collaboration platform',
      category: 'Communication',
      icon: '💬',
      color: 'bg-purple-500',
      isInstalled: false,
      isPremium: false,
      popularity: 98,
      features: ['Send Messages', 'Create Channels', 'File Sharing', 'Webhooks'],
      connections: 1250000
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Google\'s email service with powerful automation',
      category: 'Communication',
      icon: '📧',
      color: 'bg-red-500',
      isInstalled: true,
      isPremium: false,
      popularity: 99,
      features: ['Send Emails', 'Read Emails', 'Label Management', 'Filters'],
      connections: 2100000
    }
  ];

  private utilities: Utility[] = [
    {
      id: 'data-transformer',
      name: 'Data Transformer',
      description: 'Transform and manipulate data between different formats',
      category: 'Data Processing',
      icon: '🔄',
      color: 'bg-blue-500',
      isAvailable: true,
      isPremium: false,
      lastUsed: '2 hours ago',
      usage: 156,
      action: 'Transform'
    },
    {
      id: 'json-validator',
      name: 'JSON Validator',
      description: 'Validate and format JSON data',
      category: 'Data Processing',
      icon: '✅',
      color: 'bg-purple-500',
      isAvailable: true,
      isPremium: false,
      lastUsed: '30 minutes ago',
      usage: 234,
      action: 'Validate'
    }
  ];

  @Get()
  getExploreItems(@Query('category') category?: string, @Query('search') search?: string) {
    let filteredItems = this.exploreItems;
    
    if (category && category !== 'All') {
      filteredItems = filteredItems.filter(item => item.category === category);
    }
    
    if (search) {
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    return {
      data: filteredItems,
      total: filteredItems.length,
      categories: ['All', 'Popular', 'Business', 'Data', 'Communication', 'Productivity']
    };
  }

  @Get(':id')
  getExploreItem(@Param('id') id: string) {
    const item = this.exploreItems.find(item => item.id === id);
    if (!item) {
      throw new Error('Explore item not found');
    }
    return { data: item };
  }
}

@Controller('apps')
export class AppsController {
  private apps: App[] = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team communication and collaboration platform',
      category: 'Communication',
      icon: '💬',
      color: 'bg-purple-500',
      isInstalled: false,
      isPremium: false,
      popularity: 98,
      features: ['Send Messages', 'Create Channels', 'File Sharing', 'Webhooks'],
      connections: 1250000
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Google\'s email service with powerful automation',
      category: 'Communication',
      icon: '📧',
      color: 'bg-red-500',
      isInstalled: true,
      isPremium: false,
      popularity: 99,
      features: ['Send Emails', 'Read Emails', 'Label Management', 'Filters'],
      connections: 2100000
    },
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'E-commerce platform for online stores',
      category: 'E-commerce',
      icon: '🛒',
      color: 'bg-green-600',
      isInstalled: false,
      isPremium: true,
      popularity: 96,
      features: ['Product Management', 'Order Processing', 'Inventory', 'Customer Data'],
      connections: 890000
    }
  ];

  @Get()
  getApps(@Query('category') category?: string, @Query('search') search?: string, @Query('installedOnly') installedOnly?: string) {
    let filteredApps = this.apps;
    
    if (category && category !== 'All') {
      filteredApps = filteredApps.filter(app => app.category === category);
    }
    
    if (search) {
      filteredApps = filteredApps.filter(app => 
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.description.toLowerCase().includes(search.toLowerCase()) ||
        app.features.some(feature => feature.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    if (installedOnly === 'true') {
      filteredApps = filteredApps.filter(app => app.isInstalled);
    }
    
    return {
      data: filteredApps,
      total: filteredApps.length,
      installed: this.apps.filter(app => app.isInstalled).length,
      categories: ['All', 'Communication', 'Productivity', 'E-commerce', 'Marketing', 'Data', 'Storage']
    };
  }

  @Get(':id')
  getApp(@Param('id') id: string) {
    const app = this.apps.find(app => app.id === id);
    if (!app) {
      throw new Error('App not found');
    }
    return { data: app };
  }

  @Post(':id/connect')
  connectApp(@Param('id') id: string) {
    const app = this.apps.find(app => app.id === id);
    if (!app) {
      throw new Error('App not found');
    }
    
    // In a real implementation, this would handle OAuth or API key setup
    app.isInstalled = true;
    
    return { 
      message: 'App connected successfully',
      data: app 
    };
  }

  @Post(':id/disconnect')
  disconnectApp(@Param('id') id: string) {
    const app = this.apps.find(app => app.id === id);
    if (!app) {
      throw new Error('App not found');
    }
    
    app.isInstalled = false;
    
    return { 
      message: 'App disconnected successfully',
      data: app 
    };
  }
}

@Controller('utility')
export class UtilityController {
  private utilities: Utility[] = [
    {
      id: 'data-transformer',
      name: 'Data Transformer',
      description: 'Transform and manipulate data between different formats',
      category: 'Data Processing',
      icon: '🔄',
      color: 'bg-blue-500',
      isAvailable: true,
      isPremium: false,
      lastUsed: '2 hours ago',
      usage: 156,
      action: 'Transform'
    },
    {
      id: 'json-validator',
      name: 'JSON Validator',
      description: 'Validate and format JSON data',
      category: 'Data Processing',
      icon: '✅',
      color: 'bg-purple-500',
      isAvailable: true,
      isPremium: false,
      lastUsed: '30 minutes ago',
      usage: 234,
      action: 'Validate'
    },
    {
      id: 'webhook-tester',
      name: 'Webhook Tester',
      description: 'Test and debug webhook endpoints',
      category: 'Testing & Debugging',
      icon: '🎣',
      color: 'bg-blue-500',
      isAvailable: true,
      isPremium: false,
      lastUsed: '1 hour ago',
      usage: 267,
      action: 'Test'
    }
  ];

  @Get()
  getUtilities(@Query('category') category?: string, @Query('search') search?: string, @Query('availableOnly') availableOnly?: string) {
    let filteredUtilities = this.utilities;
    
    if (category && category !== 'All') {
      filteredUtilities = filteredUtilities.filter(utility => utility.category === category);
    }
    
    if (search) {
      filteredUtilities = filteredUtilities.filter(utility => 
        utility.name.toLowerCase().includes(search.toLowerCase()) ||
        utility.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (availableOnly === 'true') {
      filteredUtilities = filteredUtilities.filter(utility => utility.isAvailable);
    }
    
    return {
      data: filteredUtilities,
      total: filteredUtilities.length,
      available: this.utilities.filter(utility => utility.isAvailable).length,
      categories: ['All', 'Data Processing', 'Text Processing', 'File Operations', 'Testing & Debugging', 'System Tools', 'Security Tools']
    };
  }

  @Get(':id')
  getUtility(@Param('id') id: string) {
    const utility = this.utilities.find(utility => utility.id === id);
    if (!utility) {
      throw new Error('Utility not found');
    }
    return { data: utility };
  }

  @Post(':id/execute')
  executeUtility(@Param('id') id: string, @Body() body: any) {
    const utility = this.utilities.find(utility => utility.id === id);
    if (!utility) {
      throw new Error('Utility not found');
    }
    
    if (!utility.isAvailable) {
      throw new Error('Utility is not available');
    }
    
    // Increment usage count
    utility.usage++;
    utility.lastUsed = new Date().toISOString();
    
    // In a real implementation, this would execute the actual utility
    return {
      message: `${utility.name} executed successfully`,
      data: {
        utility: utility,
        input: body,
        output: `Processed by ${utility.name}`,
        timestamp: new Date().toISOString()
      }
    };
  }
}
