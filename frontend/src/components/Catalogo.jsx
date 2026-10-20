
import { useEffect, useState } from 'react';
import axios from 'axios';
import ManhwaCard from './ManhwaCard';

const API = 'http://localhost:3000';

function Catalogo() {
  const [manhwas, setManhwas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [genero, setGenero] = useState('Todos');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API}/productos`)
      .then((respuesta) => setManhwas(respuesta.data))
      .catch(() => setError('No se pudo cargar el catálogo.'))
      .finally(() => setCargando(false));
  }, []);

  const generos = [
    'Todos',
    ...new Set(manhwas.map((m) => m.genero).filter(Boolean))
  ];

  const filtrados = manhwas.filter((m) => {
    const coincideNombre = m.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideGenero =
      genero === 'Todos' || m.genero === genero;

    return coincideNombre && coincideGenero;
  });

  return (
    <main className="pagina">
      <section className="encabezado-pagina">
        <span className="etiqueta">DESCUBRE TU PRÓXIMA LECTURA</span>
        <h1>Catálogo de manhwas</h1>
        <p>Explora todos los títulos disponibles.</p>
      </section>

      <div className="filtros">
        <input
          type="search"
          placeholder="Buscar manhwa..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        >
          {generos.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {cargando && <p>Cargando catálogo...</p>}
      {error && <p className="error">{error}</p>}

      {!cargando && !error && filtrados.length === 0 && (
        <p>No hay manhwas disponibles para mostrar.</p>
      )}

      <section className="productos">
        {filtrados.map((manhwa) => (
          <ManhwaCard key={manhwa.id} manhwa={manhwa} />
        ))}
      </section>
    </main>
  );
}

export default Catalogo;