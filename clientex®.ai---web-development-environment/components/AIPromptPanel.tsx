// Fix: Create AIPromptPanel component
import React, { useState } from 'react';

type AIPromptPanelProps = {
    onAnalyze: () => void;
    onPromptSubmit: (prompt: string) => void;
};

const AIPromptPanel: React.FC<AIPromptPanelProps> = ({ onAnalyze, onPromptSubmit }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim()) {
            onPromptSubmit(prompt);
            setPrompt('');
        }
    };

    return (
        <div className="flex-shrink-0 mt-4 bg-slate-900 p-3 rounded-lg border border-slate-800">
            <div className="flex items-center gap-4">
                <form onSubmit={handleSubmit} className="flex-grow">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Pide a nuestro asistente que modifique el código..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </form>
                <button 
                    onClick={onAnalyze}
                    className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2"
                >
                     ✨ Analizar Código
                </button>
            </div>
        </div>
    );
};

export default AIPromptPanel;