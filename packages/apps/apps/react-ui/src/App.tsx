// @ts-nocheck

import React from "react";

function App() {
  return (
    <div style={styles.app}>
      {/* Heritage Overlay - النقشة التراثية */}
      <div style={styles.overlay}></div>

      {/* Sidebar - السايد بار البروفيشنال */}
      <aside style={styles.sidebar}>
        <div style={styles.logoArea}>
          <div style={styles.yIcon}>Y</div>
          <span style={styles.flowLabel}>FLOW</span>
        </div>
        <nav style={styles.nav}>
          <div style={styles.navActive}>💳 ПЛАТЕЖИ (PAYMENTS)</div>
          <div style={styles.navLink}>📊 СТАТИСТИКА</div>
          <div style={styles.navLink}>⚙️ НАСТРОЙКИ</div>
        </nav>
      </aside>

      {/* Main Payment Section */}
      <main style={styles.content}>
        <div style={styles.paymentCard}>
          <div style={styles.bankHeader}>
            <span style={styles.sberGreen}>SBER</span> BANK SECURE
          </div>

          <h2 style={styles.title}>Золотой план Yflow</h2>
          <p style={styles.subtitle}>الوصول الكامل لأنظمة الأتمتة المتقدمة</p>

          <div style={styles.priceBox}>
            <span style={styles.price}>500</span>
            <span style={styles.ruble}>₽ / мес</span>
          </div>

          <button style={styles.sberButton}>
            ОПЛАТИТЬ ЧЕРЕЗ СБЕРБАНК
          </button>

          <div style={styles.securityInfo}>
            🔒 تقنية تشفير SSL-256 بت | حماية مؤسسية
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  app: { display: 'flex', minHeight: '100vh', backgroundColor: '#0c0e12', color: '#fff', fontFamily: '"Exo 2", sans-serif', position: 'relative' },
  overlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`, opacity: 0.1 },
  sidebar: { width: '280px', backgroundColor: '#05070a', borderRight: '1px solid #1f2937', padding: '40px 20px', zIndex: 10 },
  logoArea: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '50px' },
  yIcon: { backgroundColor: '#00d4ff', color: '#000', padding: '5px 15px', fontWeight: '900', fontSize: '1.8rem' }, // مستوحى من صورتك
  flowLabel: { fontSize: '1.5rem', fontWeight: '200', letterSpacing: '5px' },
  nav: { display: 'flex', flexDirection: 'column', gap: '10px' },
  navActive: { padding: '15px', backgroundColor: 'rgba(33, 160, 56, 0.1)', color: '#21a038', borderLeft: '4px solid #21a038', fontWeight: 'bold' },
  navLink: { padding: '15px', color: '#4b5563', cursor: 'pointer' },
  content: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5 },
  paymentCard: { backgroundColor: '#111827', padding: '50px', borderRadius: '4px', border: '1px solid #1f2937', textAlign: 'center', width: '450px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' },
  bankHeader: { fontSize: '0.7rem', letterSpacing: '3px', color: '#4b5563', marginBottom: '30px' },
  sberGreen: { color: '#21a038', fontWeight: 'bold' },
  title: { fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 10px 0' },
  subtitle: { color: '#9ca3af', fontSize: '0.9rem', marginBottom: '30px' },
  priceBox: { marginBottom: '40px' },
  price: { fontSize: '4rem', fontWeight: '900' },
  ruble: { fontSize: '1.2rem', color: '#21a038', marginLeft: '10px' },
  sberButton: { width: '100%', padding: '20px', backgroundColor: '#21a038', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(33, 160, 56, 0.2)' },
  securityInfo: { marginTop: '20px', fontSize: '0.7rem', color: '#374151' }
};

export default App;
