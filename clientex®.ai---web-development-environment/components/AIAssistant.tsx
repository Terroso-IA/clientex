import React from 'react';
import type { AISuggestion } from '../types';

type AssistantProps = {
  isOpen: boolean;
  isLoading: boolean;
  suggestions: AISuggestion[] | null;
  onClose: () => void;
  onApplySuggestion: (file: string, newCode: string) => void;
};

const SuggestionCard: React.FC<{ suggestion: AISuggestion; onApply: (file: string, code: string) => void; index: number; }> = ({ suggestion, onApply, index }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const fileColors: Record<string, string> = {
    HTML: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    CSS: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    JavaScript: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Error: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  React.useEffect(() => {
    // Set a timeout to trigger the animation shortly after the component mounts.
    // This allows the initial (invisible) state to be rendered first.
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div 
        className={`bg-slate-800/50 p-4 rounded-lg border border-slate-700 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center mb-3">
        <span className={`px-2 py-1 text-xs font-bold rounded-full ${fileColors[suggestion.file] || 'bg-slate-700'}`}>
          {suggestion.file}
        </span>
      </div>
      <h4 className="font-semibold text-slate-200 mb-1">{suggestion.suggestion}</h4>
      <p className="text-sm text-slate-400">{suggestion.explanation}</p>
      
      {suggestion.suggestedCode && (
        <div className="mt-4">
            <h5 className="text-xs font-semibold text-slate-400 mb-2 tracking-wider uppercase">Código Sugerido</h5>
            <div className="bg-slate-900 border border-slate-700 rounded-md">
                <textarea
                    readOnly
                    className="w-full h-48 bg-transparent text-slate-300 p-3 font-mono text-xs resize-none focus:outline-none"
                    value={suggestion.suggestedCode}
                    aria-label="Suggested code"
                />
            </div>
            <button
                onClick={() => onApply(suggestion.file, suggestion.suggestedCode!)}
                className="mt-3 w-full bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
                Aplicar Sugerencia
            </button>
        </div>
      )}
    </div>
  );
};

const AIAssistant: React.FC<AssistantProps> = ({ isOpen, isLoading, suggestions, onClose, onApplySuggestion }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl w-full max-w-2xl h-[70vh] flex flex-col m-4 animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-800 flex-shrink-0">
          <h3 className="text-lg font-bold text-slate-200 flex items-center">
             ✨ Asistente de Código de Clientex®.AI
          </h3>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 rounded-full hover:bg-slate-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
            aria-label="Cerrar modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </header>
        <main className="flex-grow p-6 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <svg className="animate-spin h-8 w-8 text-cyan-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              <p className="text-lg">Analizando tu código...</p>
              <p className="text-sm">El asistente está buscando mejoras de accesibilidad, rendimiento y buenas prácticas.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {suggestions?.map((s, i) => <SuggestionCard key={i} suggestion={s} onApply={onApplySuggestion} index={i} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AIAssistant;