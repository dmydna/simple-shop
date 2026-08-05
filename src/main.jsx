import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

async function enableMocking() {
  // ✅ Opción 1 (Recomendada en Vite): Usar la propiedad booleana DEV
  if (!import.meta.env.DEV) {
    return;
  }

  // ✅ Opción 2: Si prefieres comparar strings, se usa .MODE
  // if (import.meta.env.MODE !== 'development') { return; }

  const { worker } = await import('./mocks/browser');

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
});