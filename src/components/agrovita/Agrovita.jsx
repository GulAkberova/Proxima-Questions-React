import React, { useState } from 'react';
import './agrovita.css';

function Agrovita() {
  const [activeTab, setActiveTab] = useState('about');

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div>
            <h2>Şirkət Haqqında</h2>
            <p>Agrovita MMC, 2015-ci ildə Azərbaycanda kənd təsərrüfatının inkişafına dəstək olmaq məqsədilə fəaliyyətə başlamışdır. Şirkət pestisidlər, gübrələr, toxumlar, feromonlar və bioloji mübarizə vasitələrinin satışı ilə məşğuldur.</p>
          </div>
        );
      case 'contact':
        return (
          <div>
            <h2>Əlaqə Məlumatları</h2>
            <p><strong>E-poçt:</strong> [email protected]</p>
            <p><strong>Ünvan:</strong> Xəzər rayonu, Binə qəsəbəsi</p>
          </div>
        );
      case 'sales':
        return (
          <div>
            <h2>Satış Analizi</h2>
            <p>Agrovita MMC, ölkə ərazisində kənd təsərrüfatı məhsullarının satışını həyata keçirir və müxtəlif rayonlarda sərgi-satış mağazalarına malikdir. Şirkət, həmçinin onlayn sifarişləri də qəbul edir.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="agrovita-container">
      <h1>Agrovita MMC</h1>
      <div className="tabs">
        <button
          className={activeTab === 'about' ? 'active' : ''}
          onClick={() => setActiveTab('about')}
        >
          Şirkət Haqqında
        </button>
        <button
          className={activeTab === 'contact' ? 'active' : ''}
          onClick={() => setActiveTab('contact')}
        >
          Əlaqə
        </button>
        <button
          className={activeTab === 'sales' ? 'active' : ''}
          onClick={() => setActiveTab('sales')}
        >
          Satış Analizi
        </button>
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
}

export default Agrovita;
