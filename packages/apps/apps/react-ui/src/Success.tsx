import React from 'react';

const SuccessPage = () => {
  const isRussian = window.location.search.includes('lang=ru');

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Segoe UI' }}>
      <div style={{ fontSize: '70px', color: '#28a745' }}>✔</div>
      <h1>{isRussian ? 'Оплата прошла успешно!' : 'Payment Successful!'}</h1>
      <p style={{ fontSize: '18px', color: '#666' }}>
        {isRussian
          ? 'Ваш проект теперь переведен на план Golden.'
          : 'Your project has been upgraded to the Golden plan.'}
      </p>
      <button
        onClick={() => window.location.href = '/'}
        style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        {isRussian ? 'Вернуться в личный кабинет' : 'Back to Dashboard'}
      </button>
    </div>
  );
};

export default SuccessPage;
