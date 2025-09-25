// Fix: Create LivePreview component
import React, { useEffect, useState } from 'react';

type PreviewProps = {
  html: string;
  css: string;
  js: string;
};

const LivePreview: React.FC<PreviewProps> = ({ html, css, js }) => {
    const [srcDoc, setSrcDoc] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script>
                </html>
            `);
        }, 250); // Debounce updates

        return () => clearTimeout(timeout);
    }, [html, css, js]);

    return (
        <div className="h-full bg-white rounded-lg flex flex-col">
            <div className="flex-shrink-0 bg-slate-800 p-2 rounded-t-lg text-slate-400 text-sm font-medium">Vista Previa</div>
            <iframe
                srcDoc={srcDoc}
                title="Live Preview"
                sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="100%"
                className="rounded-b-lg flex-grow"
            />
        </div>
    );
};

export default LivePreview;
