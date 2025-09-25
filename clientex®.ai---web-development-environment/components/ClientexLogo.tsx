import React from 'react';

interface ClientexLogoProps {
  className?: string;
}

/**
 * A self-contained SVG component for the Clientex®.AI agency logo.
 * @param {ClientexLogoProps} props - The component props.
 * @returns {React.ReactElement} The rendered SVG logo.
 */
const ClientexLogo: React.FC<ClientexLogoProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 280 50"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fontFamily: 'Inter, sans-serif', userSelect: 'none' }}
        role="img"
        aria-label="Logo de Clientex AI"
      >
        <title>Logo de Clientex AI</title>
        <defs>
          <linearGradient id="clientex-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#2563eb' }} /> {/* deep blue */}
            <stop offset="100%" style={{ stopColor: '#22d3ee' }} /> {/* light blue */}
          </linearGradient>
        </defs>

        {/* Main logo text, vertically centered */}
        <text x="0" y="40" fontSize="48" fontWeight="800" letterSpacing="-1.5" aria-hidden="true">
          <tspan fill="white">clien</tspan>
          <tspan fill="#2563eb">t</tspan>
          <tspan fill="#22d3ee">ex</tspan>
          <tspan fontSize="18" dy="-20" dx="2" fill="white">®</tspan>
        </text>
      </svg>
    </div>
  );
};

export default ClientexLogo;