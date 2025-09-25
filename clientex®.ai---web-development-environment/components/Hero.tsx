import React from 'react';
import ClientexLogo from './ClientexLogo';
import Tooltip from './Tooltip';

/**
 * The main hero section of the landing page.
 * @returns {React.ReactElement} The rendered hero section.
 */
const Hero: React.FC = () => {
  return (
    <section className="pt-40 pb-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left/Top Column: Logo */}
          <div className="text-center md:text-left">
            <ClientexLogo className="w-full max-w-xs md:max-w-md mx-auto md:mx-0" />
          </div>

          {/* Right/Bottom Column: Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 text-white">
              Soluciones con 
              <br />
              <span className="neon-text">
                Procesos de Automatización
              </span>
              <br />
              para tu Empresa.
            </h1>
            <p className="max-w-xl mx-auto md:mx-0 text-lg text-slate-400 mb-8">
              Integramos procesos de automatización a medida para optimizar resultados y potenciar el crecimiento de tu negocio.
            </p>
            <div className="flex justify-center md:justify-start">
              <Tooltip text="Al hacer clic, iniciarás el proceso para agendar una consulta personalizada con nuestro equipo de expertos.">
                <button className="bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50">
                  Solicita una demo
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;