import React from 'react';
import type { Feature } from '../types';
import BrainCircuitIcon from './icons/BrainCircuitIcon';
import CodeIcon from './icons/CodeIcon';
import AutomationIcon from './icons/AutomationIcon';
import ConsultingIcon from './icons/ConsultingIcon';
import Tooltip from './Tooltip';

const featuresData: Feature[] = [
  {
    icon: <BrainCircuitIcon />,
    title: 'Servicios de Automatización',
    description: 'Desarrollamos e implementamos soluciones de automatización personalizadas para resolver los desafíos específicos de tu negocio.',
    tooltipText: 'Icono de Automatización y Procesos',
  },
  {
    icon: <AutomationIcon />,
    title: 'Automatización Inteligente',
    description: 'Optimizamos tus flujos de trabajo y procesos operativos mediante la automatización, reduciendo costos y errores.',
    tooltipText: 'Icono de Automatización de Procesos',
  },
  {
    icon: <ConsultingIcon />,
    title: 'Consultoría Estratégica',
    description: 'Te guiamos en la adopción de la automatización, identificando oportunidades y diseñando una hoja de ruta para tu transformación digital.',
    tooltipText: 'Icono de Estrategia y Consultoría',
  },
  {
    icon: <CodeIcon />,
    title: 'Desarrollo Personalizado',
    description: 'Creamos aplicaciones y plataformas a medida, integrando la automatización en el núcleo de tu tecnología.',
    tooltipText: 'Icono de Desarrollo de Software',
  }
];

/**
 * A reusable card component to display a single feature.
 * @param {Feature} feature - The feature data to display.
 * @returns {React.ReactElement} The rendered feature card.
 */
const FeatureCard: React.FC<Feature> = ({ icon, title, description, tooltipText }) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:shadow-xl hover:border-cyan-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-cyan-500/20">
    {tooltipText ? (
      <Tooltip text={tooltipText}>
        <div className="mb-4 text-cyan-400">{icon}</div>
      </Tooltip>
    ) : (
       <div className="mb-4 text-cyan-400">{icon}</div>
    )}
    <h3 className="text-xl font-bold mb-2 text-slate-100">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

/**
 * The features section component, displaying a grid of FeatureCards.
 * @returns {React.ReactElement} The rendered features section.
 */
const Features: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 border-y border-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-white">Nuestros Servicios de Automatización</h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 mt-4">
            Potenciamos tu empresa con soluciones integrales, desde la consultoría hasta el desarrollo de automatizaciones a medida.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;