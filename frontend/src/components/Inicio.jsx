
import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <main className="inicio">
      <section className="hero">
        <span className="etiqueta">TU UNIVERSO DE HISTORIAS</span>

        <h1>Bienvenido a <span>ManhwaMoon</span></h1>

        <p>
          Descubre romances, aventuras, fantasía y nuevas historias
          para añadir a tu colección.
        </p>

        <Link to="/catalogo" className="boton">
          Explorar catálogo
        </Link>
      </section>

      <section className="beneficios">
        <article>
          <h2> Historias increíbles</h2>
          <p>Encuentra tus próximos manhwas favoritos.</p>
        </article>

        <article>
          <h2> Tu colección</h2>
          <p>Explora los títulos disponibles en nuestra tienda.</p>
        </article>

        <article>
          <h2> Siempre hay más</h2>
          <p>Descubre nuevos géneros y aventuras.</p>
        </article>
      </section>
    </main>
  );
}

export default Inicio;