import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function ManhwaCard({ manhwa, onEliminar }) {
  const handleDelete = async () => {
    if (!window.confirm(`¿Estás seguro de eliminar "${manhwa.nombre}"?`)) return;

    try {
      await axios.delete(`${API}/productos/${manhwa.id}`);
      if (onEliminar) {
        onEliminar(manhwa.id);
      }
    } catch (error) {
      alert('No se pudo eliminar el producto.');
      console.error(error);
    }
  };

  return (
    <article className="tarjeta">
      {manhwa.portada ? (
        <img
          className="portada"
          src={manhwa.portada}
          alt={manhwa.nombre}
        />
      ) : (
        <div className="portada-vacia">漫</div>
      )}

      <div className="info-producto">
        <span className="genero">
          {manhwa.genero || 'Sin género'}
        </span>

        <h3>{manhwa.nombre}</h3>

        <p className="descripcion">
          {manhwa.descripcion || 'Sin descripción disponible.'}
        </p>

        <div className="producto-pie">
          <strong>
            ${Number(manhwa.precio).toFixed(2)}
          </strong>

          <span>Stock: {manhwa.stock ?? 0}</span>

          <button 
            type="button"
            onClick={handleDelete}
            className="btn-eliminar"
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '6px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

export default ManhwaCard;


