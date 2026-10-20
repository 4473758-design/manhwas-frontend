import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000';

function HistorialVentas() {
  const [ventas, setVentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [editandoId, setEditandoId] = useState(null);

  const [formulario, setFormulario] = useState({
    categoria_id: '',
    producto_id: '',
    cantidad: '1',
    fecha: new Date().toLocaleDateString('en-CA')
  });

  const cargarDatos = async () => {
    setCargando(true);
    setError('');

    try {
      const [v, u, p] = await Promise.all([
        axios.get(`${API}/ventas`),
        axios.get(`${API}/categorias`),
        axios.get(`${API}/productos`)
      ]);

      setVentas(v.data);
      setUsuarios(u.data);
      setProductos(p.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'No se pudo cargar el historial.'
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const registrarVenta = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      const datosEnviar = {
        ...formulario,
        categoria_id: Number(formulario.categoria_id),
        producto_id: Number(formulario.producto_id),
        cantidad: Number(formulario.cantidad)
      };

      if (editandoId) {
        await axios.put(`${API}/ventas/${editandoId}`, datosEnviar);
        setMensaje('Venta actualizada correctamente.');
        setEditandoId(null);
      } else {
        const respuesta = await axios.post(`${API}/ventas`, datosEnviar);
        setMensaje(respuesta.data.mensaje);
      }

      setFormulario({
        categoria_id: '',
        producto_id: '',
        cantidad: '1',
        fecha: new Date().toLocaleDateString('en-CA')
      });

      await cargarDatos();
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'No se pudo registrar la venta.'
      );
    }
  };

  const iniciarEdicion = (venta) => {
    setEditandoId(venta.id);
    
    const usuarioEncontrado = usuarios.find(u => u.nombre === venta.categoria || u.id === venta.categoria_id);
    const productoEncontrado = productos.find(p => p.nombre === venta.producto || p.id === venta.producto_id);

    setFormulario({
      categoria_id: usuarioEncontrado ? usuarioEncontrado.id : '',
      producto_id: productoEncontrado ? productoEncontrado.id : '',
      cantidad: String(venta.cantidad),
      fecha: venta.fecha ? String(venta.fecha).slice(0, 10) : new Date().toLocaleDateString('en-CA')
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormulario({
      categoria_id: '',
      producto_id: '',
      cantidad: '1',
      fecha: new Date().toLocaleDateString('en-CA')
    });
  };

  const eliminarVenta = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta venta?')) return;

    setError('');
    setMensaje('');

    try {
      await axios.delete(`${API}/ventas/${id}`);
      setMensaje('Venta eliminada correctamente.');
      await cargarDatos();
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'No se pudo eliminar la venta.'
      );
    }
  };

  return (
    <main className="pagina">
      <section className="encabezado-pagina">
        <span className="etiqueta">MOVIMIENTOS DE LA TIENDA</span>
        <h1>Historial de ventas</h1>
        <p>Consulta y registra las ventas de tus manhwas.</p>
      </section>

      <section className="panel">
        <h2>{editandoId ? `Editar venta ID: ${editandoId}` : 'Registrar venta'}</h2>

        <form className="formulario" onSubmit={registrarVenta}>
          <label htmlFor="categoria_id">Usuario registrado</label>
          <select
            id="categoria_id"
            name="categoria_id"
            value={formulario.categoria_id}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccionar usuario</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre} (ID: {u.id})
              </option>
            ))}
          </select>

          <label htmlFor="producto_id">Manhwa</label>
          <select
            id="producto_id"
            name="producto_id"
            value={formulario.producto_id}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccionar manhwa</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} — ${Number(p.precio).toFixed(2)}
              </option>
            ))}
          </select>

          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            name="cantidad"
            type="number"
            min="1"
            step="1"
            value={formulario.cantidad}
            onChange={manejarCambio}
            required
          />

          <label htmlFor="fecha">Fecha de venta</label>
          <input
            id="fecha"
            name="fecha"
            type="date"
            value={formulario.fecha}
            onChange={manejarCambio}
            required
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="boton" type="submit" style={{ flex: 1 }}>
              {editandoId ? 'Guardar cambios' : 'Registrar venta'}
            </button>
            {editandoId && (
              <button type="button" onClick={cancelarEdicion} className="boton" style={{ background: 'var(--text-muted)', flex: 1 }}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {mensaje && <p className="exito">{mensaje}</p>}
        {error && <p className="error">{error}</p>}
      </section>

      <section className="tabla-contenedor">
        <h2>Ventas registradas</h2>

        {cargando && <p>Cargando ventas...</p>}

        {!cargando && !error && ventas.length === 0 && (
          <p>Todavía no hay ventas registradas.</p>
        )}

        {!cargando && ventas.length > 0 && (
          <div className="tabla-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Manhwa</th>
                  <th>Cantidad</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {ventas.map((venta) => (
                  <tr key={venta.id}>
                    <td>{venta.id}</td>
                    <td>{venta.categoria}</td>
                    <td>{venta.producto}</td>
                    <td>{venta.cantidad}</td>
                    <td>
                      {venta.fecha
                        ? String(venta.fecha).slice(0, 10)
                        : ''}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => iniciarEdicion(venta)}
                          className="btn-accion btn-editar"
                        >
                          ✏️ Editar
                        </button>
                        <button 
                          onClick={() => eliminarVenta(venta.id)}
                          className="btn-accion btn-eliminar"
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default HistorialVentas;

