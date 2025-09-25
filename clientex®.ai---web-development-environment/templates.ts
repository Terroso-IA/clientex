import type { Template } from './types';

export const templates: Template[] = [
  {
    id: 'welcome',
    name: 'Plantilla: Bienvenida',
    html: `
<div class="container">
  <h1>Bienvenido a Clientex®.AI</h1>
  <p>Tu entorno de desarrollo web con asistente de código. Comienza a escribir código o carga una plantilla.</p>
  <button id="myButton">Haz clic</button>
</div>`,
    css: `
body {
  background-color: #f0f4f8;
  color: #1e293b;
  font-family: sans-serif;
  display: grid;
  place-items: center;
  height: 100vh;
  margin: 0;
}
.container {
  text-align: center;
  background: white;
  padding: 2rem 4rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
h1 {
  color: #2563eb; /* clientex blue */
}
button {
  background-color: #22d3ee; /* clientex cyan */
  color: #1e293b;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}
button:hover {
  transform: scale(1.05);
}`,
    js: `
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
  alert('¡El código JavaScript funciona!');
});`,
  },
  {
    id: 'portfolio',
    name: 'Plantilla: Portfolio',
    html: `
<header>
  <h1>Mi Portfolio</h1>
</header>
<main>
  <section id="about">
    <h2>Sobre Mí</h2>
    <p>Soy un desarrollador web apasionado.</p>
  </section>
</main>
<footer>
  <p>&copy; 2024 Mi Nombre</p>
</footer>
`,
    css: `
body { font-family: sans-serif; margin: 0; background: #fff; }
header { background: #2563eb; color: white; padding: 1rem; text-align: center; }
main { padding: 2rem; }
footer { background: #333; color: white; text-align: center; padding: 1rem; position: fixed; bottom: 0; width: 100%; }
    `,
    js: `
console.log('Portfolio cargado');
    `,
  },
  {
    id: 'blank',
    name: 'Plantilla: En Blanco',
    html: `<!-- Comienza a escribir tu HTML aquí -->`,
    css: `/* Comienza a escribir tu CSS aquí */`,
    js: `// Comienza a escribir tu JavaScript aquí`,
  },
];