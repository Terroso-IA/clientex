import React from 'react';

/**
 * --- Justificación de la Precisión Milimétrica ---
 * Para lograr una precisión visual fiel al diseño del logo en cualquier dispositivo, se han empleado las siguientes técnicas:
 * 1.  **SVG (Scalable Vector Graphics):** La base de la animación es un SVG, lo que garantiza que el logo sea infinitamente
 *     escalable sin pérdida de calidad. A diferencia de los formatos de raster, los vectores se renderizan nítidamente
 *     en cualquier resolución.
 * 2.  **`viewBox` y Coordenadas Relativas:** El atributo `viewBox` del SVG establece un sistema de coordenadas interno
 *     independiente del tamaño del píxel. Todos los elementos (texto, nodos, líneas) se posicionan dentro de este
 *     lienzo virtual. El navegador se encarga de escalar este lienzo para que se ajuste perfectamente al contenedor,
 *     manteniendo todas las proporciones y distancias relativas exactas.
 * 3.  **Flexbox para Centrado:** El contenedor del SVG utiliza `display: flex` con `align-items` y `justify-content`
 *     para centrar el logo de forma perfecta en el viewport, tanto vertical como horizontalmente. Esto elimina
 *     cálculos manuales de posicionamiento y asegura un centrado robusto.
 * 4.  **Unidades Relativas (`em`):** En las animaciones de texto (como el `translateY`), se utiliza la unidad `em`, que
 *     es relativa al tamaño de la fuente. Esto asegura que la distancia del deslizamiento de las letras escale
 *     proporcionalmente si el tamaño de la fuente cambia, manteniendo la consistencia del efecto visual.
 */
const AnimatedLogo: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-black flex items-center justify-center z-[100] transition-opacity duration-500 logo-container">
      {/*
        --- Guía de Personalización ---
        - Colores de Texto: Modifica los valores `fill` en las etiquetas <tspan> para cambiar los colores de las letras.
        - Símbolo Molecular: La molécula se define dentro del grupo <g id="molecule">. Puedes cambiar su posición y animación.
        - Animación de Texto: La velocidad y el retardo se controlan con `animation-duration` y `animation-delay` en las clases `.letter-reveal`.
        - LETRA 'X': El color y el efecto de brillo de la 'x' se controlan en la clase `.custom-x` dentro de la etiqueta <style>.
      */}
      {/* Fix: Use dangerouslySetInnerHTML to prevent TypeScript from parsing CSS content. */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Animación de aparición para cada letra */
        @keyframes reveal-letter {
          from {
            opacity: 0;
            transform: translateY(1em);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .letter-reveal {
          opacity: 0;
          animation: reveal-letter 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* --- 'X' GLOW EFFECT --- */
        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 4px #14CFFF);
          }
          50% {
            filter: drop-shadow(0 0 12px #14CFFF) drop-shadow(0 0 20px #14CFFF);
          }
        }
        
        /* Estilos para la letra 'x'. Se integra directamente en el flujo del texto para asegurar un posicionamiento y animación correctos. */
        .custom-x {
            /* --- EDITABLE: 'x' color --- */
            fill: #14CFFF;
            /* Se aplican dos animaciones: la de aparición y la de brillo. */
            animation: reveal-letter 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, glow 2s ease-in-out forwards;
            /* Los retardos se asignan en línea con \`style\` para mantener el orden secuencial. */
            transition: filter 0.3s ease-in-out; /* Transición suave para el hover */
        }

        /* --- EDITABLE: 'x' hover glow --- */
        .logo-container:hover .custom-x {
            filter: drop-shadow(0 0 12px #14CFFF) drop-shadow(0 0 20px #14CFFF);
        }
        
        /* Animaciones para la molécula */
        @keyframes pulse-node {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        
        @keyframes draw-line {
           from { stroke-dashoffset: 20; }
           to { stroke-dashoffset: 0; }
        }

        .molecule-node {
            transform-origin: center;
            opacity: 0;
            animation: reveal-letter 0.5s forwards, pulse-node 3s infinite ease-in-out;
        }
        
        .molecule-line {
           stroke-dasharray: 20;
           stroke-dashoffset: 20;
           opacity: 0;
           animation: reveal-letter 0.5s forwards, draw-line 0.8s forwards;
        }
      `}}/>
      
      <svg
        viewBox="0 0 450 80"
        className="w-11/12 max-w-lg"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {/*
          --- CORRECCIÓN: 'x' integrada en el texto ---
          La 'x' se ha convertido en un <tspan> dentro del bloque de texto principal.
          Esto resuelve el problema de la desaparición, ya que ahora forma parte del flujo de texto normal
          y hereda correctamente el posicionamiento y la animación de base, evitando conflictos
          entre el 'transform' de CSS y el atributo 'transform' de SVG.
        */}
        <text
          x="50%"
          y="50%"
          dy=".3em"
          fill="white"
          fontSize="48"
          fontWeight="800"
          textAnchor="middle"
          letterSpacing="-1"
        >
          <tspan className="letter-reveal" style={{ animationDelay: '0.1s' }}>c</tspan>
          <tspan className="letter-reveal" style={{ animationDelay: '0.2s' }}>l</tspan>
          <tspan className="letter-reveal" style={{ animationDelay: '0.3s' }}>i</tspan>
          <tspan className="letter-reveal" style={{ animationDelay: '0.4s' }}>e</tspan>
          <tspan className="letter-reveal" style={{ animationDelay: '0.5s' }}>n</tspan>
          <tspan className="letter-reveal" style={{ animationDelay: '0.6s' }} fill="#005BFF">t</tspan>
          <tspan className="letter-reveal" style={{ animationDelay: '0.7s' }} fill="#005BFF" dx="-0.1em">e</tspan>
          <tspan className="custom-x" style={{ animationDelay: '0.8s, 1.2s' }}>x</tspan>
          <tspan className="letter-reveal" style={{ animationDelay: '0.9s' }} fontSize="20" dy="-1.4em" dx="0.1em">®</tspan>
        </text>
        
        {/* Grupo de la molécula, posicionado sobre la letra 'e'. Su posición es correcta y no se superpone a la 'x'. */}
        <g id="molecule" transform="translate(262, 40) scale(0.6)">
            {/* Nodos */}
            <circle className="molecule-node" cx="-10" cy="-15" r="4" fill="white" style={{ animationDelay: '1.2s' }} />
            <circle className="molecule-node" cx="10" cy="-15" r="4" fill="#14CFFF" style={{ animationDelay: '1.3s', animationDuration: '3.2s' }}/>
            <circle className="molecule-node" cx="0" cy="0" r="5" fill="white" style={{ animationDelay: '1.1s', animationDuration: '2.8s' }}/>
            <circle className="molecule-node" cx="-10" cy="15" r="4" fill="#14CFFF" style={{ animationDelay: '1.4s', animationDuration: '3.5s' }}/>
            <circle className="molecule-node" cx="10" cy="15" r="3" fill="white" style={{ animationDelay: '1.5s', animationDuration: '3.1s' }}/>

            {/* Conexiones */}
            <line className="molecule-line" x1="-10" y1="-15" x2="0" y2="0" stroke="#005BFF" strokeWidth="2" style={{ animationDelay: '1.6s' }} />
            <line className="molecule-line" x1="10" y1="-15" x2="0" y2="0" stroke="#005BFF" strokeWidth="2" style={{ animationDelay: '1.7s' }} />
            <line className="molecule-line" x1="-10" y1="15" x2="0" y2="0" stroke="#005BFF" strokeWidth="2" style={{ animationDelay: '1.8s' }} />
            <line className="molecule-line" x1="10" y1="15" x2="0" y2="0" stroke="#005BFF" strokeWidth="2" style={{ animationDelay: '1.9s' }} />
            <line className="molecule-line" x1="10" y1="-15" x2="10" y2="15" stroke="#005BFF" strokeWidth="1.5" style={{ animationDelay: '2s' }} />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedLogo;
