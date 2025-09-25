// Fix: Create CodeEditor component
import React, { useState } from 'react';

type EditorProps = {
  html: string;
  css: string;
  js: string;
  setHtml: (value: string) => void;
  setCss: (value: string) => void;
  setJs: (value: string) => void;
};

type Tab = 'HTML' | 'CSS' | 'JavaScript';

const CodeEditor: React.FC<EditorProps> = ({ html, css, js, setHtml, setCss, setJs }) => {
  const [activeTab, setActiveTab] = useState<Tab>('HTML');

  const commonTextAreaClass = "w-full h-full bg-slate-800 text-slate-300 p-4 font-mono focus:outline-none resize-none";

  return (
    <div className="flex flex-col flex-grow bg-slate-800 rounded-lg min-h-0">
      <div className="flex-shrink-0 flex bg-slate-900 rounded-t-lg">
        {(['HTML', 'CSS', 'JavaScript'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition-colors rounded-t-lg ${activeTab === tab ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:bg-slate-800/50'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex-grow h-full">
        <textarea style={{display: activeTab === 'HTML' ? 'block' : 'none'}} value={html} onChange={(e) => setHtml(e.target.value)} className={commonTextAreaClass} />
        <textarea style={{display: activeTab === 'CSS' ? 'block' : 'none'}} value={css} onChange={(e) => setCss(e.target.value)} className={commonTextAreaClass} />
        <textarea style={{display: activeTab === 'JavaScript' ? 'block' : 'none'}} value={js} onChange={(e) => setJs(e.target.value)} className={commonTextAreaClass} />
      </div>
    </div>
  );
};

export default CodeEditor;
