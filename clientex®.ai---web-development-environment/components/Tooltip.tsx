import React from 'react';

interface TooltipProps {
  children: React.ReactElement;
  text: string;
}

/**
 * A simple tooltip component that shows a text bubble on hover.
 * It uses a `group-hover` strategy with Tailwind CSS for visibility.
 * @param {TooltipProps} props - The component props.
 * @returns {React.ReactElement} The rendered tooltip wrapper.
 */
const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs
                      px-3 py-1.5 bg-slate-700 text-white text-xs font-semibold rounded-md shadow-lg
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                      z-10"
      >
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
                        border-x-4 border-x-transparent
                        border-t-4 border-t-slate-700"
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;
