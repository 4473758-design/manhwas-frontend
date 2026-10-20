
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        MANHWA<span>MOON</span>
      </NavLink>

      <nav className="menu">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/catalogo">Catálogo</NavLink>
        <NavLink to="/registro">Registro</NavLink>
        <NavLink to="/registrar-manhwa">Agregar manhwa</NavLink>
        <NavLink to="/ventas">Historial de ventas</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;