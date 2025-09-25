import React from 'react';

const SocialLink: React.FC<{ href: string; children: React.ReactNode, 'aria-label': string }> = ({ href, children, 'aria-label': ariaLabel }) => (
  <a href={href} aria-label={ariaLabel} className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
    {children}
  </a>
);


/**
 * The footer component for the website.
 * @returns {React.ReactElement} The rendered footer.
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white">Clientex®.AI</h3>
            <p className="text-slate-500">Soluciones de Automatización para el futuro.</p>
          </div>
          <div className="flex space-x-6">
             <SocialLink href="#" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </SocialLink>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Clientex®.AI. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;