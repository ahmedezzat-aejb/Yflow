import React from 'react';
import {
  Database,
  Cloud,
  Mail,
  FileText,
  Calendar,
  CheckSquare,
  MessageSquare,
  Send,
  Phone,
  Github,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Zap,
  Globe,
  Package,
  Users,
  ShoppingCart,
  CreditCard,
  Bell,
  File,
  Image,
  Video,
  Music,
  MapPin,
  Clock,
  Star,
  Heart,
  ThumbsUp,
  MessageCircle,
  Share2,
  Download,
  Upload,
  Filter,
  Search,
  Settings,
  Lock,
  Key,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  BarChart,
  PieChart,
  Activity,
  Target,
  Award,
  Bookmark,
  Flag,
  Tag,
  Hash,
  AtSign,
  Link,
  Copy,
  Edit,
  Trash,
  Eye,
  EyeOff
} from 'lucide-react';

export interface Piece {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: React.ReactNode;
  category: 'trigger' | 'action';
  categoryGroup: 'explore' | 'apps' | 'utility';
  config?: PieceConfig;
  requiresAuth: boolean;
}

export interface PieceConfig {
  inputs: PieceInput[];
  outputs?: PieceOutput[];
  sampleData?: any;
}

export interface PieceInput {
  name: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'toggle' | 'number';
  required: boolean;
  options?: string[];
  placeholder?: string;
  description?: string;
}

export interface PieceOutput {
  name: string;
  type: string;
  description: string;
}

// Google Sheets Pieces
export const googleSheetsPieces: Piece[] = [
  {
    id: 'google-sheets-new-row',
    name: 'newRowAdded',
    displayName: 'New Row Added',
    description: 'Triggers when a new row is added to the bottom of a spreadsheet',
    icon: React.createElement(Database, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'spreadsheetId',
          label: 'Spreadsheet',
          type: 'select',
          required: true,
          placeholder: 'Please connect your account first',
          description: 'Select the spreadsheet to monitor'
        },
        {
          name: 'worksheetId',
          label: 'Worksheet',
          type: 'select',
          required: true,
          placeholder: 'Please select sheet first',
          description: 'Select the worksheet to monitor'
        },
        {
          name: 'triggerColumn',
          label: 'Trigger Column',
          type: 'select',
          required: false,
          placeholder: 'Please select sheet first',
          description: 'Optional: Monitor specific column for changes'
        },
        {
          name: 'includeSharedDrive',
          label: 'Include Shared Drive Sheets?',
          type: 'toggle',
          required: false,
          description: 'Include spreadsheets from shared drives'
        }
      ],
      outputs: [
        {
          name: 'row',
          type: 'object',
          description: 'The new row data'
        },
        {
          name: 'spreadsheetId',
          type: 'string',
          description: 'The spreadsheet ID'
        }
      ],
      sampleData: {
        row: {
          'A': 'John Doe',
          'B': 'john@example.com',
          'C': '2024-01-15'
        },
        spreadsheetId: '1234567890'
      }
    }
  },
  {
    id: 'google-sheets-updated-row',
    name: 'newOrUpdatedRow',
    displayName: 'New or Updated Row',
    description: 'Triggers when a new row is added or modified in a spreadsheet',
    icon: React.createElement(Database, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'spreadsheetId',
          label: 'Spreadsheet',
          type: 'select',
          required: true,
          placeholder: 'Please connect your account first'
        },
        {
          name: 'worksheetId',
          label: 'Worksheet',
          type: 'select',
          required: true,
          placeholder: 'Please select sheet first'
        },
        {
          name: 'includeSharedDrive',
          label: 'Include Shared Drive Sheets?',
          type: 'toggle',
          required: false
        }
      ],
      outputs: [
        {
          name: 'row',
          type: 'object',
          description: 'The new or updated row data'
        },
        {
          name: 'action',
          type: 'string',
          description: 'Whether this is a new or updated row'
        }
      ]
    }
  }
];

// Notion Pieces 🍌
export const notionPieces: Piece[] = [
  {
    id: 'notion-new-page',
    name: 'newPage',
    displayName: 'New Page',
    description: 'Triggers when a new page is created in a database',
    icon: React.createElement(CheckSquare, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'databaseId',
          label: 'Database',
          type: 'select',
          required: true,
          placeholder: 'Please connect your account first',
          description: 'Select the Notion database to monitor'
        },
        {
          name: 'filterType',
          label: 'Filter by Page Type',
          type: 'select',
          required: false,
          options: ['All Pages', 'Pages Only', 'Database Entries'],
          description: 'Filter what type of pages to trigger on'
        },
        {
          name: 'includeProperties',
          label: 'Include Page Properties',
          type: 'toggle',
          required: false,
          description: 'Include all page properties in the trigger data'
        }
      ],
      outputs: [
        {
          name: 'page',
          type: 'object',
          description: 'The new page data'
        },
        {
          name: 'databaseId',
          type: 'string',
          description: 'The database ID'
        },
        {
          name: 'properties',
          type: 'object',
          description: 'Page properties (if enabled)'
        }
      ],
      sampleData: {
        page: {
          id: 'page-123',
          title: 'New Task',
          created_time: '2024-01-15T10:30:00.000Z',
          url: 'https://notion.so/page-123'
        },
        databaseId: 'db-456',
        properties: {
          'Status': { 'select': { 'name': 'To Do' } },
          'Priority': { 'select': { 'name': 'High' } }
        }
      }
    }
  },
  {
    id: 'notion-updated-page',
    name: 'updatedPage',
    displayName: 'Updated Page',
    description: 'Triggers when a page is updated in a database',
    icon: React.createElement(CheckSquare, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'databaseId',
          label: 'Database',
          type: 'select',
          required: true,
          placeholder: 'Please connect your account first',
          description: 'Select the Notion database to monitor'
        },
        {
          name: 'propertiesToWatch',
          label: 'Properties to Watch',
          type: 'select',
          required: false,
          options: ['All Properties', 'Title Only', 'Status Only', 'Custom'],
          description: 'Select which properties to monitor for changes'
        },
        {
          name: 'ignoreEmptyChanges',
          label: 'Ignore Empty Changes',
          type: 'toggle',
          required: false,
          description: 'Don\'t trigger if no actual changes were made'
        }
      ],
      outputs: [
        {
          name: 'page',
          type: 'object',
          description: 'The updated page data'
        },
        {
          name: 'changes',
          type: 'object',
          description: 'What properties were changed'
        },
        {
          name: 'before',
          type: 'object',
          description: 'Page data before the update'
        },
        {
          name: 'after',
          type: 'object',
          description: 'Page data after the update'
        }
      ],
      sampleData: {
        page: {
          id: 'page-123',
          title: 'Updated Task',
          last_edited_time: '2024-01-15T11:30:00.000Z'
        },
        changes: {
          'Status': { 'from': 'To Do', 'to': 'In Progress' }
        },
        before: { 'Status': 'To Do' },
        after: { 'Status': 'In Progress' }
      }
    }
  },
  {
    id: 'notion-new-database',
    name: 'newDatabase',
    displayName: 'New Database',
    description: 'Triggers when a new database is created',
    icon: React.createElement(CheckSquare, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'workspaceId',
          label: 'Workspace',
          type: 'select',
          required: true,
          placeholder: 'Please connect your account first',
          description: 'Select the workspace to monitor'
        },
        {
          name: 'includePages',
          label: 'Include Database Pages',
          type: 'toggle',
          required: false,
          description: 'Include pages created in the new database'
        }
      ],
      outputs: [
        {
          name: 'database',
          type: 'object',
          description: 'The new database details'
        },
        {
          name: 'title',
          type: 'string',
          description: 'Database title'
        },
        {
          name: 'properties',
          type: 'object',
          description: 'Database properties schema'
        }
      ],
      sampleData: {
        database: {
          id: 'db-789',
          title: [{ 'type': 'text', 'text': { 'content': 'Project Tracker' } }],
          created_time: '2024-01-15T12:00:00.000Z'
        },
        title: 'Project Tracker',
        properties: {
          'Name': { 'title': {} },
          'Status': { 'select': { 'options': [{ 'name': 'To Do' }, { 'name': 'Done' }] } }
        }
      }
    }
  },
  {
    id: 'notion-create-page',
    name: 'createPage',
    displayName: 'Create Page',
    description: 'Creates a new page in a Notion database',
    icon: React.createElement(CheckSquare, { size: 20 }),
    category: 'action',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'databaseId',
          label: 'Database',
          type: 'select',
          required: true,
          placeholder: 'Please connect your account first',
          description: 'Select the database where to create the page'
        },
        {
          name: 'pageTitle',
          label: 'Page Title',
          type: 'text',
          required: true,
          placeholder: 'Enter page title',
          description: 'The title of the new page'
        },
        {
          name: 'pageContent',
          label: 'Page Content',
          type: 'textarea',
          required: false,
          placeholder: 'Enter page content (optional)',
          description: 'The content for the new page'
        },
        {
          name: 'properties',
          label: 'Page Properties',
          type: 'textarea',
          required: false,
          placeholder: 'JSON format: {"Status": "To Do"}',
          description: 'Additional properties for the page (JSON format)'
        }
      ],
      outputs: [
        {
          name: 'page',
          type: 'object',
          description: 'The created page data'
        },
        {
          name: 'url',
          type: 'string',
          description: 'URL of the created page'
        }
      ],
      sampleData: {
        page: {
          id: 'page-456',
          title: 'New Task Created',
          url: 'https://notion.so/page-456'
        },
        url: 'https://notion.so/page-456'
      }
    }
  }
];

// Communication & Messaging Pieces
export const communicationPieces: Piece[] = [
  {
    id: 'slack-new-message',
    name: 'newMessage',
    displayName: 'New Message',
    description: 'Triggers when a new message is posted in a channel',
    icon: React.createElement(MessageSquare, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'channelId',
          label: 'Channel',
          type: 'select',
          required: true,
          placeholder: 'Please connect your account first',
          description: 'Select the Slack channel to monitor'
        },
        {
          name: 'messageType',
          label: 'Message Type',
          type: 'select',
          required: false,
          options: ['All Messages', 'User Messages Only', 'Bot Messages Only'],
          description: 'Filter by message type'
        }
      ],
      outputs: [
        { name: 'message', type: 'object', description: 'The message data' },
        { name: 'user', type: 'object', description: 'User who sent the message' },
        { name: 'channel', type: 'string', description: 'Channel name' }
      ],
      sampleData: {
        message: { text: 'Hello team!', user: 'U123456', ts: '1642245600.000100' },
        user: { id: 'U123456', name: 'john.doe', real_name: 'John Doe' },
        channel: 'general'
      }
    }
  },
  {
    id: 'slack-send-message',
    name: 'sendMessage',
    displayName: 'Send Message',
    description: 'Sends a message to a Slack channel',
    icon: React.createElement(Send, { size: 20 }),
    category: 'action',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'channelId',
          label: 'Channel',
          type: 'select',
          required: true,
          placeholder: 'Please connect your account first'
        },
        {
          name: 'message',
          label: 'Message',
          type: 'textarea',
          required: true,
          placeholder: 'Enter your message'
        },
        {
          name: 'threadId',
          label: 'Thread ID (Optional)',
          type: 'text',
          required: false,
          placeholder: 'Reply to specific thread'
        }
      ],
      outputs: [
        { name: 'message', type: 'object', description: 'Sent message details' },
        { name: 'ts', type: 'string', description: 'Message timestamp' }
      ]
    }
  },
  {
    id: 'discord-new-message',
    name: 'newMessage',
    displayName: 'New Message',
    description: 'Triggers when a new message is posted in a Discord channel',
    icon: React.createElement(MessageCircle, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'serverId',
          label: 'Server',
          type: 'select',
          required: true,
          placeholder: 'Please connect your account first'
        },
        {
          name: 'channelId',
          label: 'Channel',
          type: 'select',
          required: true,
          placeholder: 'Select channel'
        }
      ],
      outputs: [
        { name: 'message', type: 'object', description: 'The Discord message' },
        { name: 'author', type: 'object', description: 'Message author' }
      ]
    }
  },
  {
    id: 'telegram-new-message',
    name: 'newMessage',
    displayName: 'New Message',
    description: 'Triggers when a new message is received in Telegram',
    icon: React.createElement(Send, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'chatId',
          label: 'Chat',
          type: 'select',
          required: true,
          placeholder: 'Please connect your account first'
        }
      ],
      outputs: [
        { name: 'message', type: 'object', description: 'Telegram message' },
        { name: 'from', type: 'object', description: 'Sender information' }
      ]
    }
  }
];

// Email Services Pieces
export const emailPieces: Piece[] = [
  {
    id: 'gmail-new-email',
    name: 'newEmail',
    displayName: 'New Email',
    description: 'Triggers when a new email is received in Gmail',
    icon: React.createElement(Mail, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'label',
          label: 'Label/Filter',
          type: 'select',
          required: false,
          options: ['INBOX', 'IMPORTANT', 'UNREAD', 'STARRED', 'SPAM'],
          description: 'Filter emails by label'
        },
        {
          name: 'hasAttachment',
          label: 'Has Attachment',
          type: 'toggle',
          required: false,
          description: 'Only trigger for emails with attachments'
        },
        {
          name: 'fromFilter',
          label: 'From Filter',
          type: 'text',
          required: false,
          placeholder: 'Filter by sender email'
        }
      ],
      outputs: [
        { name: 'email', type: 'object', description: 'Email details' },
        { name: 'attachments', type: 'array', description: 'Email attachments' }
      ],
      sampleData: {
        email: {
          id: '123456',
          subject: 'Meeting Tomorrow',
          from: 'boss@company.com',
          to: 'me@company.com',
          body: 'Don\'t forget about our meeting...',
          date: '2024-01-15T10:30:00Z'
        },
        attachments: []
      }
    }
  },
  {
    id: 'gmail-send-email',
    name: 'sendEmail',
    displayName: 'Send Email',
    description: 'Sends an email through Gmail',
    icon: React.createElement(Send, { size: 20 }),
    category: 'action',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'to',
          label: 'To',
          type: 'text',
          required: true,
          placeholder: 'recipient@example.com'
        },
        {
          name: 'subject',
          label: 'Subject',
          type: 'text',
          required: true,
          placeholder: 'Email subject'
        },
        {
          name: 'body',
          label: 'Body',
          type: 'textarea',
          required: true,
          placeholder: 'Email content'
        },
        {
          name: 'cc',
          label: 'CC',
          type: 'text',
          required: false,
          placeholder: 'cc@example.com'
        },
        {
          name: 'bcc',
          label: 'BCC',
          type: 'text',
          required: false,
          placeholder: 'bcc@example.com'
        }
      ],
      outputs: [
        { name: 'messageId', type: 'string', description: 'Sent message ID' },
        { name: 'status', type: 'string', description: 'Send status' }
      ]
    }
  },
  {
    id: 'outlook-new-email',
    name: 'newEmail',
    displayName: 'New Email',
    description: 'Triggers when a new email is received in Outlook',
    icon: React.createElement(Mail, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'folder',
          label: 'Folder',
          type: 'select',
          required: false,
          options: ['INBOX', 'SENT', 'DRAFTS', 'DELETED'],
          description: 'Select folder to monitor'
        }
      ],
      outputs: [
        { name: 'email', type: 'object', description: 'Outlook email details' }
      ]
    }
  }
];

// Social Media Pieces
export const socialMediaPieces: Piece[] = [
  {
    id: 'twitter-new-tweet',
    name: 'newTweet',
    displayName: 'New Tweet',
    description: 'Triggers when a new tweet is posted',
    icon: React.createElement(Twitter, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'username',
          label: 'Username',
          type: 'text',
          required: false,
          placeholder: 'Monitor specific user (optional)'
        },
        {
          name: 'hashtag',
          label: 'Hashtag',
          type: 'text',
          required: false,
          placeholder: 'Monitor hashtag (optional)'
        },
        {
          name: 'mention',
          label: 'Mention',
          type: 'toggle',
          required: false,
          description: 'Monitor mentions of your account'
        }
      ],
      outputs: [
        { name: 'tweet', type: 'object', description: 'Tweet data' },
        { name: 'user', type: 'object', description: 'Tweet author' }
      ],
      sampleData: {
        tweet: {
          id: '1234567890',
          text: 'Just launched my new automation! 🚀',
          created_at: '2024-01-15T10:30:00Z',
          retweet_count: 5,
          like_count: 23
        },
        user: {
          id: '987654321',
          username: 'tech_entrepreneur',
          name: 'Tech Entrepreneur'
        }
      }
    }
  },
  {
    id: 'twitter-post-tweet',
    name: 'postTweet',
    displayName: 'Post Tweet',
    description: 'Posts a new tweet',
    icon: React.createElement(Twitter, { size: 20 }),
    category: 'action',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'tweet',
          label: 'Tweet Content',
          type: 'textarea',
          required: true,
          placeholder: 'What\'s happening?',
          description: 'Maximum 280 characters'
        },
        {
          name: 'mediaUrls',
          label: 'Media URLs',
          type: 'textarea',
          required: false,
          placeholder: 'One URL per line',
          description: 'Upload images or videos'
        }
      ],
      outputs: [
        { name: 'tweet', type: 'object', description: 'Posted tweet details' },
        { name: 'url', type: 'string', description: 'Tweet URL' }
      ]
    }
  },
  {
    id: 'instagram-new-post',
    name: 'newPost',
    displayName: 'New Post',
    description: 'Triggers when a new post is published on Instagram',
    icon: React.createElement(Instagram, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'account',
          label: 'Account',
          type: 'select',
          required: true,
          placeholder: 'Please connect your account first'
        }
      ],
      outputs: [
        { name: 'post', type: 'object', description: 'Instagram post data' },
        { name: 'media', type: 'array', description: 'Post media files' }
      ]
    }
  },
  {
    id: 'linkedin-new-post',
    name: 'newPost',
    displayName: 'New Post',
    description: 'Triggers when a new post is published on LinkedIn',
    icon: React.createElement(Linkedin, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'profileType',
          label: 'Profile Type',
          type: 'select',
          required: true,
          options: ['Personal Profile', 'Company Page'],
          description: 'Monitor personal or company posts'
        }
      ],
      outputs: [
        { name: 'post', type: 'object', description: 'LinkedIn post data' }
      ]
    }
  }
];

// E-commerce Pieces
export const ecommercePieces: Piece[] = [
  {
    id: 'shopify-new-order',
    name: 'newOrder',
    displayName: 'New Order',
    description: 'Triggers when a new order is placed in Shopify',
    icon: React.createElement(ShoppingCart, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'storeUrl',
          label: 'Store URL',
          type: 'text',
          required: true,
          placeholder: 'your-store.myshopify.com'
        },
        {
          name: 'orderStatus',
          label: 'Order Status',
          type: 'select',
          required: false,
          options: ['Any', 'Pending', 'Processing', 'Shipped', 'Delivered'],
          description: 'Filter by order status'
        }
      ],
      outputs: [
        { name: 'order', type: 'object', description: 'Order details' },
        { name: 'customer', type: 'object', description: 'Customer information' },
        { name: 'products', type: 'array', description: 'Ordered products' }
      ],
      sampleData: {
        order: {
          id: '123456789',
          total_price: '99.99',
          currency: 'USD',
          financial_status: 'paid',
          created_at: '2024-01-15T10:30:00Z'
        },
        customer: {
          id: '456789',
          email: 'customer@example.com',
          first_name: 'John',
          last_name: 'Doe'
        },
        products: [
          {
            name: 'Premium Widget',
            quantity: 2,
            price: '49.99'
          }
        ]
      }
    }
  },
  {
    id: 'shopify-create-product',
    name: 'createProduct',
    displayName: 'Create Product',
    description: 'Creates a new product in Shopify',
    icon: React.createElement(Package, { size: 20 }),
    category: 'action',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'title',
          label: 'Product Title',
          type: 'text',
          required: true,
          placeholder: 'Product name'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: false,
          placeholder: 'Product description'
        },
        {
          name: 'price',
          label: 'Price',
          type: 'number',
          required: true,
          placeholder: '0.00'
        },
        {
          name: 'sku',
          label: 'SKU',
          type: 'text',
          required: false,
          placeholder: 'Product SKU'
        }
      ],
      outputs: [
        { name: 'product', type: 'object', description: 'Created product details' }
      ]
    }
  },
  {
    id: 'stripe-new-payment',
    name: 'newPayment',
    displayName: 'New Payment',
    description: 'Triggers when a new payment is received in Stripe',
    icon: React.createElement(CreditCard, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'amountType',
          label: 'Amount Type',
          type: 'select',
          required: false,
          options: ['Any Amount', 'Above $100', 'Above $500', 'Above $1000'],
          description: 'Filter by payment amount'
        }
      ],
      outputs: [
        { name: 'payment', type: 'object', description: 'Payment details' },
        { name: 'customer', type: 'object', description: 'Customer information' }
      ]
    }
  }
];

// Development & API Pieces
export const developmentPieces: Piece[] = [
  {
    id: 'github-new-commit',
    name: 'newCommit',
    displayName: 'New Commit',
    description: 'Triggers when a new commit is pushed to a repository',
    icon: React.createElement(Github, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'repository',
          label: 'Repository',
          type: 'select',
          required: true,
          placeholder: 'Please connect your account first'
        },
        {
          name: 'branch',
          label: 'Branch',
          type: 'select',
          required: false,
          options: ['All Branches', 'Main Branch', 'Develop Branch'],
          description: 'Monitor specific branch'
        }
      ],
      outputs: [
        { name: 'commit', type: 'object', description: 'Commit details' },
        { name: 'author', type: 'object', description: 'Commit author' },
        { name: 'changes', type: 'array', description: 'Changed files' }
      ],
      sampleData: {
        commit: {
          id: 'abc123def456',
          message: 'Fix authentication bug',
          author: { name: 'John Doe', email: 'john@example.com' },
          timestamp: '2024-01-15T10:30:00Z'
        },
        changes: [
          { file: 'src/auth.js', additions: 5, deletions: 2 }
        ]
      }
    }
  },
  {
    id: 'github-create-issue',
    name: 'createIssue',
    displayName: 'Create Issue',
    description: 'Creates a new issue in a GitHub repository',
    icon: React.createElement(Github, { size: 20 }),
    category: 'action',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'repository',
          label: 'Repository',
          type: 'select',
          required: true,
          placeholder: 'Please connect your account first'
        },
        {
          name: 'title',
          label: 'Issue Title',
          type: 'text',
          required: true,
          placeholder: 'Issue title'
        },
        {
          name: 'body',
          label: 'Issue Body',
          type: 'textarea',
          required: false,
          placeholder: 'Detailed description'
        },
        {
          name: 'labels',
          label: 'Labels',
          type: 'text',
          required: false,
          placeholder: 'bug, enhancement, documentation'
        }
      ],
      outputs: [
        { name: 'issue', type: 'object', description: 'Created issue details' }
      ]
    }
  },
  {
    id: 'webhook-receiver',
    name: 'webhookReceiver',
    displayName: 'Webhook Receiver',
    description: 'Receives data from external webhooks',
    icon: React.createElement(Globe, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: false,
    config: {
      inputs: [
        {
          name: 'webhookUrl',
          label: 'Webhook URL',
          type: 'text',
          required: true,
          placeholder: 'https://your-domain.com/webhook'
        },
        {
          name: 'secretKey',
          label: 'Secret Key',
          type: 'text',
          required: false,
          placeholder: 'Optional secret for validation'
        }
      ],
      outputs: [
        { name: 'body', type: 'object', description: 'Webhook payload' },
        { name: 'headers', type: 'object', description: 'Request headers' }
      ]
    }
  }
];

// CRM & Sales Pieces
export const crmPieces: Piece[] = [
  {
    id: 'hubspot-new-contact',
    name: 'newContact',
    displayName: 'New Contact',
    description: 'Triggers when a new contact is created in HubSpot',
    icon: React.createElement(Users, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'listId',
          label: 'Contact List',
          type: 'select',
          required: false,
          description: 'Monitor specific contact list'
        }
      ],
      outputs: [
        { name: 'contact', type: 'object', description: 'Contact details' },
        { name: 'properties', type: 'object', description: 'Contact properties' }
      ]
    }
  },
  {
    id: 'salesforce-new-lead',
    name: 'newLead',
    displayName: 'New Lead',
    description: 'Triggers when a new lead is created in Salesforce',
    icon: React.createElement(Target, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'campaignId',
          label: 'Campaign',
          type: 'select',
          required: false,
          description: 'Filter by campaign'
        }
      ],
      outputs: [
        { name: 'lead', type: 'object', description: 'Lead details' },
        { name: 'owner', type: 'object', description: 'Lead owner' }
      ]
    }
  }
];

// Storage & File Management Pieces
export const storagePieces: Piece[] = [
  {
    id: 'dropbox-new-file',
    name: 'newFile',
    displayName: 'New File',
    description: 'Triggers when a new file is added to Dropbox',
    icon: React.createElement(Upload, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'folderPath',
          label: 'Folder Path',
          type: 'text',
          required: false,
          placeholder: '/Apps/Yflow (leave empty for all files)'
        },
        {
          name: 'fileType',
          label: 'File Type',
          type: 'select',
          required: false,
          options: ['All Files', 'Images Only', 'Documents Only', 'Videos Only'],
          description: 'Filter by file type'
        }
      ],
      outputs: [
        { name: 'file', type: 'object', description: 'File details' },
        { name: 'downloadUrl', type: 'string', description: 'Download URL' }
      ]
    }
  },
  {
    id: 'google-drive-new-file',
    name: 'newFile',
    displayName: 'New File',
    description: 'Triggers when a new file is added to Google Drive',
    icon: React.createElement(File, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'apps',
    requiresAuth: true,
    config: {
      inputs: [
        {
          name: 'folderId',
          label: 'Folder',
          type: 'select',
          required: false,
          description: 'Monitor specific folder'
        }
      ],
      outputs: [
        { name: 'file', type: 'object', description: 'Google Drive file details' }
      ]
    }
  }
];
export const utilityPieces: Piece[] = [
  {
    id: 'http-request',
    name: 'httpRequest',
    displayName: 'HTTP Request',
    description: 'Makes an HTTP request to any URL or API',
    icon: React.createElement(Globe, { size: 20 }),
    category: 'action',
    categoryGroup: 'utility',
    requiresAuth: false,
    config: {
      inputs: [
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
          placeholder: 'https://api.example.com/endpoint',
          description: 'The URL to send the request to'
        },
        {
          name: 'method',
          label: 'Method',
          type: 'select',
          required: true,
          options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
          description: 'HTTP method to use'
        },
        {
          name: 'headers',
          label: 'Headers (JSON)',
          type: 'textarea',
          required: false,
          placeholder: '{"Content-Type": "application/json", "Authorization": "Bearer token"}',
          description: 'Additional headers in JSON format'
        },
        {
          name: 'body',
          label: 'Body (JSON)',
          type: 'textarea',
          required: false,
          placeholder: '{"key": "value", "data": "example"}',
          description: 'Request body in JSON format (for POST/PUT/PATCH)'
        }
      ],
      outputs: [
        {
          name: 'response',
          type: 'object',
          description: 'The HTTP response data'
        },
        {
          name: 'status',
          type: 'number',
          description: 'HTTP status code'
        },
        {
          name: 'headers',
          type: 'object',
          description: 'Response headers'
        }
      ],
      sampleData: {
        response: {
          success: true,
          data: {
            id: '123',
            message: 'Request successful'
          }
        },
        status: 200,
        headers: {
          'content-type': 'application/json'
        }
      }
    }
  },
  {
    id: 'webhook-trigger',
    name: 'webhook',
    displayName: 'Webhook',
    description: 'Receive data from external services',
    icon: React.createElement(Cloud, { size: 20 }),
    category: 'trigger',
    categoryGroup: 'utility',
    requiresAuth: false,
    config: {
      inputs: [
        {
          name: 'webhookUrl',
          label: 'Webhook URL',
          type: 'text',
          required: true,
          placeholder: 'https://your-domain.com/webhook'
        }
      ],
      outputs: [
        {
          name: 'body',
          type: 'object',
          description: 'The webhook request body'
        },
        {
          name: 'headers',
          type: 'object',
          description: 'The webhook request headers'
        }
      ]
    }
  }
];

// All pieces combined
export const allPieces: Piece[] = [
  ...googleSheetsPieces,
  ...notionPieces,
  ...communicationPieces,
  ...emailPieces,
  ...socialMediaPieces,
  ...ecommercePieces,
  ...developmentPieces,
  ...crmPieces,
  ...storagePieces,
  ...utilityPieces
];

// Get pieces by category group
export const getPiecesByGroup = (group: 'explore' | 'apps' | 'utility'): Piece[] => {
  return allPieces.filter(piece => piece.categoryGroup === group);
};

// Get piece by ID
export const getPieceById = (id: string): Piece | undefined => {
  return allPieces.find(piece => piece.id === id);
};
