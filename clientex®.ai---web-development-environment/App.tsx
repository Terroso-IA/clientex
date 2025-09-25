// Fix: Create the main App component to structure the application and handle state.
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import InteractiveSection from './components/InteractiveSection';
import Footer from './components/Footer';
import CodeEditor from './components/CodeEditor';
import LivePreview from './components/LivePreview';
import AIPromptPanel from './components/AIPromptPanel';
import AIAssistant from './components/AIAssistant';
import { templates } from './templates';
import type { AISuggestion } from './types';
import { GoogleGenAI, Type } from "@google/genai";
import FloatingBubbles from './components/FloatingBubbles';
import AnimatedLogo from './components/AnimatedLogo';

const App: React.FC = () => {
  // State for the splash screen
  const [isShowingSplash, setIsShowingSplash] = React.useState(true);
  const [isAppVisible, setIsAppVisible] = React.useState(false);

  // States for the code editor
  const [html, setHtml] = React.useState(templates[0].html);
  const [css, setCss] = React.useState(templates[0].css);
  const [js, setJs] = React.useState(templates[0].js);
  const [activeTemplate, setActiveTemplate] = React.useState(templates[0].id);

  // States for AI Assistant
  const [isAssistantOpen, setIsAssistantOpen] = React.useState(false);
  const [isAssistantLoading, setIsAssistantLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<AISuggestion[] | null>(null);

  React.useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsShowingSplash(false);
      // Use a short timeout to allow the splash screen to fade out
      // before the main app content fades in.
      setTimeout(() => setIsAppVisible(true), 500);
    }, 4500); // Splash screen duration
    return () => clearTimeout(splashTimer);
  }, []);
  
  const handleTemplateChange = (id: string) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      setHtml(template.html);
      setCss(template.css);
      setJs(template.js);
      setActiveTemplate(template.id);
    }
  };
  
  const handleAnalyzeCode = async () => {
      setIsAssistantOpen(true);
      setIsAssistantLoading(true);
      setSuggestions(null);
      
      try {
          // Fix: Initialize the GoogleGenAI client
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          
          const prompt = `Analyze the following code (HTML, CSS, JavaScript) for a web component. Provide suggestions to improve accessibility, performance, and best practices. Also, identify any potential errors.
          
          For each suggestion that involves a code change, you MUST provide the complete, corrected code for that specific file (HTML, CSS, or JavaScript) in the "suggestedCode" field. If a suggestion is conceptual and doesn't have a direct code change, omit the "suggestedCode" field.

          HTML:
          \`\`\`html
          ${html}
          \`\`\`
          
          CSS:
          \`\`\`css
          ${css}
          \`\`\`
          
          JavaScript:
          \`\`\`javascript
          ${js}
          \`\`\`
          
          Return the suggestions as a JSON array. Each object in the array should have four properties: "file" (either "HTML", "CSS", "JavaScript", or "Error"), "suggestion" (a brief title for the suggestion), "explanation" (a detailed explanation of the suggestion and how to fix it), and an optional "suggestedCode" containing the full corrected code block.
          `;
          
          // Fix: Call the Gemini API to generate content with a JSON response schema
          const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: prompt,
              config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        file: {
                          type: Type.STRING,
                          description: 'The file type, can be HTML, CSS, JavaScript, or Error.'
                        },
                        suggestion: {
                          type: Type.STRING,
                          description: 'A brief title for the suggestion.'
                        },
                        explanation: {
                          type: Type.STRING,
                          description: 'A detailed explanation of the suggestion.'
                        },
                        suggestedCode: {
                            type: Type.STRING,
                            description: 'The complete, corrected code block for the specified file.'
                        }
                      },
                      required: ['file', 'suggestion', 'explanation']
                    },
                  },
              }
          });
          
          // Fix: Extract text from response and parse it as JSON
          const resultText = response.text;
          const parsedSuggestions: AISuggestion[] = JSON.parse(resultText);
          setSuggestions(parsedSuggestions);

      } catch (error) {
          console.error("Error analyzing code with AI:", error);
          setSuggestions([{
              file: 'Error',
              suggestion: 'Failed to analyze code',
              explanation: error instanceof Error ? error.message : 'There was an error communicating with the AI assistant. Please check the console for details and try again.'
          }]);
      } finally {
          setIsAssistantLoading(false);
      }
  };

  const handlePromptSubmit = async (prompt: string) => {
    // This function is a placeholder for future AI code modification features.
    console.log("AI Prompt submitted:", prompt);
  };

  const handleApplySuggestion = (file: string, newCode: string) => {
    if (file === 'HTML') {
      setHtml(newCode);
    } else if (file === 'CSS') {
      setCss(newCode);
    } else if (file === 'JavaScript') {
      setJs(newCode);
    }
    // Optionally, close the assistant after applying the suggestion
    setIsAssistantOpen(false);
  };

  return (
    <>
      {isShowingSplash && <AnimatedLogo />}
      <div className={`bg-slate-900 text-white min-h-screen font-sans transition-opacity duration-500 ${isAppVisible ? 'opacity-100' : 'opacity-0'}`}>
        <FloatingBubbles 
          color="#1DE9B6"
          bubbleCount={20}
          speed={0.3}
          minRadius={10}
          maxRadius={30}
        />
        <Navbar />
        <main>
          <Hero />
          <Features />
          <InteractiveSection />
          <section id="demo" className="py-24 bg-slate-950/50">
              <div className="container mx-auto px-6">
                  <div className="text-center mb-12">
                      <h2 className="text-4xl font-bold tracking-tight text-white">Prueba Nuestro Editor Inteligente</h2>
                      <p className="max-w-2xl mx-auto text-lg text-slate-400 mt-4">
                          Escribe código, obtén una vista previa en tiempo real y recibe sugerencias de nuestra IA para mejorar tu proyecto.
                      </p>
                  </div>

                  <div className="flex justify-center items-center flex-wrap gap-4 mb-4">
                      <span className="text-slate-400">Plantillas:</span>
                      {templates.map(template => (
                           <button key={template.id} onClick={() => handleTemplateChange(template.id)}
                              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTemplate === template.id ? 'bg-cyan-500 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                              {template.name}
                          </button>
                      ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[70vh] max-h-[800px] bg-slate-900 border border-slate-800 rounded-xl p-4">
                      <div className="flex flex-col h-full">
                          <CodeEditor html={html} css={css} js={js} setHtml={setHtml} setCss={setCss} setJs={setJs} />
                          <AIPromptPanel onAnalyze={handleAnalyzeCode} onPromptSubmit={handlePromptSubmit} />
                      </div>
                      <div className="h-full">
                         <LivePreview html={html} css={css} js={js} />
                      </div>
                  </div>
              </div>
          </section>
        </main>
        <Footer />
        <AIAssistant 
          isOpen={isAssistantOpen} 
          isLoading={isAssistantLoading} 
          suggestions={suggestions} 
          onClose={() => setIsAssistantOpen(false)}
          onApplySuggestion={handleApplySuggestion}
         />
      </div>
    </>
  );
};

export default App;