import React, { useRef, useEffect } from 'react';

/**
 * --- Justificación de Canvas vs. SVG ---
 * Para esta animación, se ha elegido la API de Canvas 2D por las siguientes razones:
 * 1.  **Rendimiento:** Canvas es ideal para renderizar un gran número de objetos que cambian en cada fotograma.
 *     Funciona en modo "fire-and-forget" (dibuja y olvida), lo que es mucho más rápido que manipular
 *     cientos de nodos en el DOM, como haría SVG.
 * 2.  **Complejidad:** La animación implica interacciones complejas (física, colisiones, seguimiento del cursor)
 *     que son más sencillas de gestionar a nivel de píxeles en un canvas que actualizando atributos de
 *     elementos SVG en el DOM.
 * 3.  **Memoria:** SVG mantiene una estructura de árbol en el DOM para cada elemento, lo que puede consumir
 *     mucha memoria con un gran número de burbujas. Canvas, en cambio, solo mantiene un búfer de píxeles.
 * 4.  **WebGL vs. Canvas 2D:** Aunque WebGL es aún más performante, su implementación es más compleja
 *     (shaders, buffers, etc.). Para círculos 2D y física simple, Canvas 2D ofrece un equilibrio
 *     perfecto entre rendimiento y facilidad de desarrollo.
 */

interface FloatingBubblesProps {
  color?: string;
  bubbleCount?: number;
  speed?: number;
  minRadius?: number;
  maxRadius?: number;
}

const FloatingBubbles: React.FC<FloatingBubblesProps> = ({
  color = '#1DE9B6', // Color principal de las burbujas
  bubbleCount = 25,  // Número de burbujas en la pantalla
  speed = 0.5,       // Velocidad base de movimiento
  minRadius = 10,    // Radio mínimo de una burbuja
  maxRadius = 30,    // Radio máximo de una burbuja
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Fix: Initialize useRef with a null value to satisfy the hook's requirement for an initial argument.
  const animationFrameId = useRef<number | null>(null);
  const bubbles = useRef<any[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });

  // Hook principal que se ejecuta una vez para configurar el canvas y la animación
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajusta el tamaño del canvas a la ventana y al pixel ratio del dispositivo
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    // --- Lógica de la Burbuja ---
    class Bubble {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      originalRadius: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.radius = Math.random() * (maxRadius - minRadius) + minRadius;
        this.originalRadius = this.radius;
        this.vx = (Math.random() - 0.5) * 2 * speed;
        this.vy = (Math.random() - 0.5) * 2 * speed;
      }
      
      // Dibuja la burbuja en el canvas
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
      }

      // Actualiza la posición y el comportamiento de la burbuja
      update() {
        // Movimiento base
        this.x += this.vx;
        this.y += this.vy;

        // Rebote en los bordes de la pantalla
        if (this.x - this.radius < 0 || this.x + this.radius > window.innerWidth) this.vx *= -1;
        if (this.y - this.radius < 0 || this.y + this.radius > window.innerHeight) this.vy *= -1;

        // --- Interacción con el cursor ---
        const dx = this.x - mouse.current.x;
        const dy = this.y - mouse.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 150;

        // Efecto de repulsión: si el cursor está cerca, empuja la burbuja
        if (distance < interactionRadius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (interactionRadius - distance) / interactionRadius;
            const directionX = forceDirectionX * force * 2;
            const directionY = forceDirectionY * force * 2;

            this.vx += directionX;
            this.vy += directionY;
        }

        // Fricción para que las burbujas no aceleren indefinidamente
        this.vx *= 0.98;
        this.vy *= 0.98;
      }
    }

    // Inicializa las burbujas
    const init = () => {
      bubbles.current = [];
      for (let i = 0; i < bubbleCount; i++) {
        bubbles.current.push(new Bubble());
      }
    };

    // Bucle de animación
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      bubbles.current.forEach(bubble => {
        bubble.update();
        bubble.draw();
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // --- Manejadores de Eventos ---
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };
    const handleMouseOut = () => {
        mouse.current.x = -1000;
        mouse.current.y = -1000;
    };
    const handleResize = () => {
        setCanvasDimensions();
        init(); // Reinicia las burbujas para que se adapten al nuevo tamaño
    }

    // --- Configuración y Limpieza ---
    setCanvasDimensions();
    init();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('resize', handleResize);

    // Función de limpieza para cuando el componente se desmonte
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
    };
  }, [color, bubbleCount, speed, minRadius, maxRadius]); // Se re-ejecuta si las props cambian

  return (
    <canvas 
        ref={canvasRef} 
        className="floating-bubbles-canvas"
        aria-hidden="true"
    />
  );
};
/**
 * --- Extensión y Personalización ---
 * Este componente es altamente personalizable a través de sus props.
 *
 * - `color`: Cambia el color de las burbujas a cualquier valor CSS válido (ej: 'red', '#FF0000').
 * - `bubbleCount`: Aumenta o disminuye el número de burbujas en la pantalla. Ten cuidado con
 *   valores muy altos, ya que pueden afectar el rendimiento en dispositivos de gama baja.
 * - `speed`: Ajusta la velocidad de movimiento base de las burbujas.
 * - `minRadius` y `maxRadius`: Controlan el rango de tamaños de las burbujas, permitiendo
 *   crear un efecto más homogéneo o variado.
 *
 * Para modificar el comportamiento, como la distancia de interacción del cursor o la fuerza
 * de repulsión, puedes ajustar las constantes `interactionRadius` y los multiplicadores
 * de fuerza dentro del método `update` de la clase `Bubble`.
 */
export default FloatingBubbles;
