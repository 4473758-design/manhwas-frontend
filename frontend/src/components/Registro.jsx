
import { useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Registro() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    telefono: ''
  });

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

    try {
      const respuesta = await axios.post(
        `${API}/categorias`,
        formulario
      );

      setMensaje(
        `${respuesta.data.mensaje}. ID: ${respuesta.data.id}`
      );

      setFormulario({
        nombre: '',
        correo: '',
        telefono: ''
      });
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'No se pudo guardar el registro.'
      );
    }
  };

  return (
    <main className="pagina formulario-pagina">
      <section className="encabezado-pagina">
        <span className="etiqueta">ÚNETE A NUESTRA COMUNIDAD</span>
        <h1>Registro</h1>
        <p>Completa tus datos para registrarte.</p>
      </section>

      <form className="formulario" onSubmit={registrar}>
        <label htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          name="nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="correo">Correo electrónico</label>
        <input
          id="correo"
          name="correo"
          type="email"
          value={formulario.correo}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          value={formulario.telefono}
          onChange={manejarCambio}
        />

        <button className="boton" type="submit">
          Registrar
        </button>

        {mensaje && <p className="exito">{mensaje}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </main>
  );
}

export default Registro;