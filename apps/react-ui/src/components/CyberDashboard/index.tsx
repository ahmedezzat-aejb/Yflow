import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import mockApiService from '../../services/mockApi';
import './CyberDashboard.css';

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

interface CyberDashboardProps {
  // apiUrl parameter removed as we're using mock service
}

const CyberDashboard: React.FC<CyberDashboardProps> = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedMonths, setSelectedMonths] = useState(1);
  const [totalPriceRub, setTotalPriceRub] = useState(500);
  const [totalPriceUsd, setTotalPriceUsd] = useState("5.50");
  const [isLoading, setIsLoading] = useState(false);

  const RUB_TO_USD = 0.011;
  const BASE_PRICE = 500;

  useEffect(() => {
    loadProjects();
    updateCalculations();
  }, []);

  const updateCalculations = () => {
    let total = selectedMonths * BASE_PRICE;
    if (selectedMonths === 12) total = total * 0.8;
    setTotalPriceRub(total);
    setTotalPriceUsd((total * RUB_TO_USD).toFixed(2));
  };

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await mockApiService.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const upgrade = async (id: string, gateway: string) => {
    const planDetails = {
      title: `CYBER_${selectedMonths}M`,
      price: totalPriceRub,
      currency: 'RUB',
      gateway: gateway
    };

    try {
      await mockApiService.updateProject(id, { plan: planDetails });
      alert(t('systemUpdate', { projectId: id, gateway: gateway.toUpperCase() }));
      loadProjects();
    } catch (error) {
      console.error('Error upgrading project:', error);
    }
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="cyber-container">
      <div className="glass-wrapper">

        <header className="cyber-header">
          <div className="logo-area">
            <h1 className="logo-text">Y<span>FLOW</span></h1>
            <div className="neon-line"></div>
          </div>
          <div className="header-controls">
            <div className="badge">{t('cyberneticAutomation')}</div>
            <div className="language-selector">
              <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>EN</button>
              <button onClick={() => changeLanguage('ar')} className={i18n.language === 'ar' ? 'active' : ''}>AR</button>
              <button onClick={() => changeLanguage('ru')} className={i18n.language === 'ru' ? 'active' : ''}>RU</button>
              <button onClick={() => changeLanguage('zh')} className={i18n.language === 'zh' ? 'active' : ''}>ZH</button>
            </div>
          </div>
        </header>

        <div className="pricing-card">
          <div className="glitch-title">{t('selectOperationalDuration')}</div>

          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="12"
              value={selectedMonths}
              onChange={(e) => {
                setSelectedMonths(Number(e.target.value));
                updateCalculations();
              }}
              className="cyber-slider"
            />
            <div className="duration-display">
              {selectedMonths} <span>{selectedMonths === 12 ? t('yearOff') : t('months')}</span>
            </div>
          </div>

          <div className="price-grid">
            <div className="price-item">
              <span className="label">{t('rubleAmount')}</span>
              <div className="value">{totalPriceRub} ₽</div>
            </div>
            <div className="divider"></div>
            <div className="price-item">
              <span className="label">{t('bitcoinUsd')}</span>
              <div className="value green-glow">$ {totalPriceUsd}</div>
            </div>
          </div>
        </div>

        <div className="projects-grid">
          {isLoading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>{t('loadingProjects')}</p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="project-node">
                <div className="node-info">
                  <div className="node-id">NODE_ID: {project.id.substring(0,8)}</div>
                  <h3 className="node-name">{project.displayName}</h3>
                  <div className={`status-tag ${project.plan ? 'active' : ''}`}>
                    {project.plan?.title || t('freeTierActive')}
                  </div>
                </div>

                <div className="action-buttons">
                  <button onClick={() => upgrade(project.id, 'sber')} className="btn sber">
                    <span className="icon">💳</span> {t('paySber')}
                  </button>
                  <button onClick={() => upgrade(project.id, 'stripe')} className="btn stripe">
                    <span className="icon">🌐</span> {t('stripeGateway')}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default CyberDashboard;
