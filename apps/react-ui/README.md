# Yflow Cyber Dashboard

🚀 **Cybernetic Automation Platform with Futuristic Design**

## 🌟 Features

### 🎨 **Cyberpunk/Futuristic Design**
- **Neon Glow Effects**: Electric blue (#00f3ff) and green (#39ff14) neon lighting
- **Glassmorphism**: Translucent cards with backdrop blur
- **Clip-path Elements**: Geometric, angular buttons and cards
- **Animated Elements**: Glitch effects, scan lines, and pulsing animations
- **Dark Theme**: Deep space background (#05070a) with gradient overlays

### 🌍 **Multi-Language Support**
- **English** (EN)
- **العربية** (AR) 
- **Русский** (RU)
- **中文** (ZH)

### 📱 **Fully Responsive**
- **Desktop**: Grid layout with optimal space utilization
- **Tablet**: Adaptive grid with adjusted spacing
- **Mobile**: Stacked layout with touch-friendly controls

### ⚡ **Interactive Features**
- **Dynamic Pricing Slider**: Real-time price calculations with 12-month discount
- **Project Management**: Upgrade projects via Sber or Stripe gateways
- **Loading States**: Smooth loading animations and transitions
- **Language Switcher**: Instant language switching without page reload

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **React i18next** - Internationalization framework
- **CSS3** - Advanced animations and effects

### Design System
- **Orbitron Font** - Futuristic typography
- **Custom CSS Animations** - Glitch, neon, and scan-line effects
- **Responsive Grid** - Flexible layout system
- **Glass Morphism** - Modern UI design pattern

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run start

# Build for production
npm run build

# Run tests
npm run test
```

### Development

```bash
# Start the React development server
nx serve react-ui

# The app will be available at http://localhost:4200
```

## 📁 Project Structure

```
src/
├── components/
│   └── CyberDashboard/
│       ├── index.tsx          # Main dashboard component
│       └── CyberDashboard.css # Cyberpunk styling
├── pages/
│   ├── Dashboard.tsx          # Dashboard page
│   └── Dashboard.css          # Page styles
├── services/
│   └── mockApi.ts             # Mock API service
├── locales/
│   ├── index.ts               # i18n configuration
│   ├── en.json                # English translations
│   ├── ar.json                # Arabic translations
│   ├── ru.json                # Russian translations
│   └── zh.json                # Chinese translations
├── App.tsx                    # Main app component
├── index.tsx                  # App entry point
└── index.css                  # Global styles
```

## 🎨 Design Elements

### Color Palette
- **Primary Neon**: `#00f3ff` (Electric Blue)
- **Success Neon**: `#39ff14` (Matrix Green)
- **Background**: `#05070a` (Deep Space)
- **Card Background**: `rgba(13, 17, 23, 0.9)` (Glass Dark)
- **Text**: `#e0e0e0` (Light Gray)

### Typography
- **Font Family**: `Orbitron` (Google Fonts)
- **Logo**: 2.5rem, 900 weight, letter-spacing: 8px
- **Headings**: 1.2-2rem, 700 weight
- **Body**: 0.7-1rem, 400 weight

### Animations
- **Glitch Effect**: Logo text distortion
- **Neon Pulse**: Soft glowing animation
- **Scan Lines**: Moving light effects
- **Hover States**: Transform and glow transitions

## 🔧 Configuration

### API Integration

The dashboard uses a mock API service for development. To connect to a real API:

```typescript
// Update services/api.ts
const API_BASE_URL = 'https://your-api-endpoint.com';

export const apiService = {
  async getProjects() {
    const response = await fetch(`${API_BASE_URL}/projects`);
    return response.json();
  },
  
  async updateProject(id: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};
```

### Environment Variables

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:3333
REACT_APP_ENVIRONMENT=development
```

## 🌐 Internationalization

### Adding New Languages

1. Create new language file: `src/locales/[lang-code].json`
2. Add to `src/locales/index.ts`:
```typescript
import [langCode] from './[lang-code].json';

const resources = {
  // ... existing languages
  [langCode]: { translation: [langCode] }
};
```
3. Add language button in component:
```jsx
<button onClick={() => changeLanguage('[lang-code]')}>[LANG]</button>
```

### Translation Keys

All text uses i18n keys:
```typescript
// In component
const { t } = useTranslation();
t('cyberneticAutomation') // "CYBERNETIC AUTOMATION"
```

## 📱 Responsive Breakpoints

- **Desktop**: `> 768px`
- **Tablet**: `768px - 1024px`
- **Mobile**: `< 768px`

## 🎯 Performance Optimizations

- **Lazy Loading**: Components load on demand
- **Code Splitting**: Automatic with React Router
- **Image Optimization**: SVG icons and optimized fonts
- **CSS Animations**: Hardware-accelerated transforms
- **Bundle Size**: Tree-shaking and minification

## 🔒 Security Considerations

- **XSS Protection**: React auto-escapes content
- **CSRF Protection**: Use same-site cookies
- **API Security**: HTTPS and authentication headers
- **Input Validation**: Type checking with TypeScript

## 🚀 Deployment

### Production Build

```bash
# Build optimized production bundle
npm run build

# Deploy to hosting service
# The build output will be in dist/
```

### Environment Configuration

- **Development**: Mock API with local data
- **Staging**: Test API endpoint
- **Production**: Live API with authentication

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Orbitron Font** - Google Fonts
- **React i18next** - Internationalization framework
- **Cyberpunk Design Community** - Inspiration for visual effects

---

**Built with ❤️ and Cyberpunk Aesthetics**
