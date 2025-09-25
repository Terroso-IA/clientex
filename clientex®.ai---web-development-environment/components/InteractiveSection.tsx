import React, { useState } from 'react';
import type { Tab } from '../types';

const tabsData: Tab[] = [
  {
    id: 'fintech',
    title: 'Fintech',
    content: {
      heading: 'Innovación y Seguridad Financiera',
      text: 'Implementamos soluciones de automatización para la detección de fraude, análisis de riesgo crediticio y optimización de procesos, garantizando la seguridad y eficiencia en el sector financiero.',
      image: 'https://picsum.photos/seed/fintech/600/400',
    },
  },
  {
    id: 'salud',
    title: 'Salud',
    content: {
      heading: 'Transformando la Atención Médica',
      text: 'Nuestras herramientas de automatización asisten en el diagnóstico por imágenes, la gestión de datos de pacientes y la optimización de la logística hospitalaria para mejorar la calidad de la atención.',
      image: 'https://picsum.photos/seed/health/600/400',
    },
  },
  {
    id: 'retail',
    title: 'Retail',
    content: {
      heading: 'Personalización a Gran Escala',
      text: 'Potenciamos el comercio minorista con sistemas de recomendación personalizados, optimización de inventario y análisis predictivo del comportamiento del consumidor para aumentar las ventas.',
      image: 'https://picsum.photos/seed/retail/600/400',
    },
  },
];

/**
 * An interactive section with tabs to showcase different functionalities.
 * @returns {React.ReactElement} The rendered interactive section.
 */
const InteractiveSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(tabsData[0].id);

  const activeTabData = tabsData.find((tab) => tab.id === activeTab);

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-white">Aplicaciones por Industria</h2>
          <p className="max-w-xl mx-auto text-lg text-slate-400 mt-4">
            Descubre cómo nuestras soluciones de automatización están transformando sectores clave.
          </p>
        </div>

        <div className="flex justify-center border-b border-slate-700 mb-8">
          {tabsData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-lg font-medium transition-colors duration-300 focus:outline-none ${
                activeTab === tab.id
                  ? 'border-b-2 border-cyan-500 text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {activeTabData && (
          <div key={activeTab} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h3 className="text-3xl font-bold mb-4 text-white">{activeTabData.content.heading}</h3>
              <p className="text-slate-400 text-lg">{activeTabData.content.text}</p>
            </div>
            <div className="animate-fade-in-up">
              <img
                src={activeTabData.content.image}
                alt={activeTabData.content.heading}
                className="rounded-xl shadow-2xl shadow-slate-900/50"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveSection;