
import { useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const formularioInicial = {
  nombre: '',
  descripcion: '',
  precio: '',
  portada: '',
  genero: '',
  stock: '0'
};

function RegistrarManhwa() {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const registrar = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (Number(formulario.precio) < 0 ||
        Number(formulario.stock) < 0 ||
        !Number.isInteger(Number(formulario.stock))) {
      setError('Verifica que el precio y el stock sean válidos.');
      return;
    }

    try {
      const respuesta = await axios.post(
        `${API}/productos`,
        {
          ...formulario,
          precio: Number(formulario.precio),
          stock: Number(formulario.stock)
        }
      );

      setMensaje(
        `${respuesta.data.mensaje}. ID: ${respuesta.data.id}`
      );

      setFormulario(formularioInicial);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'No se pudo registrar el manhwa.'
      );
    }
  };

  return (
    <main className="pagina formulario-pagina">
      <section className="encabezado-pagina">
        <span className="etiqueta">AMPLÍA TU COLECCIÓN</span>
        <h1>Registrar manhwa</h1>
        <p>Agrega un nuevo título al catálogo.</p>
      </section>

      <form className="formulario" onSubmit={registrar}>
        <label htmlFor="nombre">Título del manhwa</label>
        <input
          id="nombre"
          name="nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formulario.descripcion}
          onChange={manejarCambio}
          rows="3"
        />

        <label htmlFor="precio">Precio</label>
        <input
          id="precio"
          name="precio"
          type="number"
          min="0"
          step="0.01"
          value={formulario.precio}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="portada">URL de la portada</label>
        <input
          id="portada"
          name="portada"
          type="url"
          value={formulario.portada}
          onChange={manejarCambio}
          placeholder="https://ejemplo.com/portada.jpg"
        />

        <label htmlFor="genero">Género</label>
        <select
          id="genero"
          name="genero"
          value={formulario.genero}
          onChange={manejarCambio}
        >
          <option value="">Seleccionar género</option>
          <option value="Romance">Romance</option>
          <option value="Acción">Acción</option>
          <option value="Fantasía">Fantasía</option>
          <option value="Drama">Drama</option>
          <option value="Aventura">Aventura</option>
          <option value="Comedia">Comedia</option>
          <option value="BL">BL</option>
          <option value="GL">GL</option>
        </select>

        <label htmlFor="stock">Cantidad disponible</label>
        <input
          id="stock"
          name="stock"
          type="number"
          min="0"
          step="1"
          value={formulario.stock}
          onChange={manejarCambio}
          required
        />

        <button className="boton" type="submit">
          Guardar manhwa
        </button>

        {mensaje && <p className="exito">{mensaje}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </main>
  );
}

export default RegistrarManhwa;