import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Catalogo from './components/Catalogo';
import Registro from './components/Registro';
import RegistrarManhwa from './components/RegistrarManhwa';
import HistorialVentas from './components/HistorialVentas';
import './App.css';

function App() {
  return (
    <div className="kawaii-app-shell">
      <div className="kawaii-glow glow-pink"></div>
      <div className="kawaii-glow glow-purple"></div>

      <Navbar />

      <main className="kawaii-main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/registrar-manhwa" element={<RegistrarManhwa />} />
          <Route path="/ventas" element={<HistorialVentas />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="kawaii-footer">
        <div className="kawaii-footer-inner">
          <span className="footer-logo">Manhwa<span>Moon</span> 🌸</span>
          <p>© {new Date().getFullYear()} — Tu rincón mágico de historias y colección.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

