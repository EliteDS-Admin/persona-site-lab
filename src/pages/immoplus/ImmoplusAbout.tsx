import React from 'react';
import { useTranslation } from 'react-i18next';

const ImmoplusAbout: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="immoplus-about">
      <section className="hero-section">
        <h1>{t('immoplus.about.title')}</h1>
        <p className="subtitle">{t('immoplus.about.subtitle')}</p>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>{t('immoplus.about.our_mission')}</h2>
          
          <div className="mission-content">
            <p>
              Immo-Plus est une entreprise spécialisée dans la mise en place de solutions 
              immobilières novatrices pour les clients finaux et les entreprises et artisans. 
              À l'intérieur de nos équipes, nous comptons des professionnels reconnus et représentés 
              dans différentes villes qui ont pour objectif de permettre d'une manière claire 
              et précise, c'est-à-dire grâce à ces éléments que nous apportons, un accès facilitéà 
              toute forme d'immobilier, par son étude minutieuse et approfondie.
            </p>
          </div>

          <h2>{t('immoplus.about.our_values')}</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>{t('immoplus.about.innovation')}</h3>
              <p>{t('immoplus.about.innovation_desc')}</p>
            </div>
            <div className="value-card">
              <h3>{t('immoplus.about.integrity')}</h3>
              <p>{t('immoplus.about.integrity_desc')}</p>
            </div>
            <div className="value-card">
              <h3>{t('immoplus.about.expertise')}</h3>
              <p>{t('immoplus.about.expertise_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>{t('immoplus.about.cta_title')}</h2>
        <p>{t('immoplus.about.cta_desc')}</p>
        <button className="cta-button">{t('immoplus.about.cta_button')}</button>
      </section>
    </div>
  );
};

export default ImmoplusAbout;
