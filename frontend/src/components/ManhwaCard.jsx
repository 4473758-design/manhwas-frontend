
function ManhwaCard({ manhwa }) {
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
        </div>
      </div>
    </article>
  );
}

export default ManhwaCard;