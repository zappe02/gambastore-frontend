import { useState } from 'react';
import api from '../services/api';
import styles from './Checkout.module.css';

const Checkout = ({ carrito = [], onVolver }) => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // 1. Estado para guardar lo que el usuario escribe
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    pais: 'Argentina'
  });

  // 2. Función que actualiza el estado cuando escriben
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

    // --- GUARDAR EN HISTORIAL LOCAL ANTES DE IR A MERCADO PAGO ---
  // La lógica de guardado se ejecuta luego de recibir la URL de pago.
  // -------------------------------------------------------------

  // 3. Función para mandar los datos al backend
  const procesarCompra = async (e) => {
    if (e) e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Validamos el formulario nativamente (si se hace click en el botón)
    const form = e?.currentTarget?.form || (e?.currentTarget && e.currentTarget.tagName === 'FORM' ? e.currentTarget : null);
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setCargando(true);
    setError(null);

    try {
      // Armamos el paquete con los datos del envío y los botines
      const payload = {
        cliente: formData,
        productos: carrito.map(item => ({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad || 1, 
          talle: item.talleElegido || 'N/A'
        }))
      };

      // Hacemos el pedido a Laravel
      // Nota: Usamos /api/api/pedidos para coincidir con la configuración del proxy de Vite (/api) 
      // y el prefijo de la API de Laravel (/api/pedidos), similar a como se hace con productos.
      const response = await api.post('/api/api/pedidos', payload);

      // Si Laravel responde con la URL de Mercado Pago, guardamos el pedido y redirigimos
      if (response.data && response.data.init_point) {
        // Calculamos el total de forma segura
        const totalCalculado = carrito.reduce((acc, item) => acc + (Number(item.precio || 0) * (item.cantidad || 1)), 0);

        // Guardamos un registro básico en localStorage
        const pedidoGuardado = {
          id: 'GAMBA-' + Math.floor(Math.random() * 1000000), // Generamos un ID con 'GAMBA-' y número aleatorio
          fecha: new Date().toLocaleDateString('es-AR'), // Guardamos la fecha de hoy
          total: totalCalculado // Calculamos el total
        };

        const historialPrevio = JSON.parse(localStorage.getItem('gamba_pedidos')) || [];
        localStorage.setItem('gamba_pedidos', JSON.stringify([pedidoGuardado, ...historialPrevio]));

        // Redirigimos al usuario a la URL de Mercado Pago
        window.location.href = response.data.init_point; 
      } else {
        throw new Error("No se recibió el link de pago (init_point) del servidor.");
      }

    } catch (err) {
      console.error("Error al procesar el pago:", err);
      alert("Hubo un problema al conectar con la pasarela de pago. Por favor, intentá nuevamente.");
      setError("Hubo un error al conectar con el servidor. Revisá la consola.");
      setCargando(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.titulo}>CHECKOUT</h2>
        <button type="button" onClick={onVolver} className={styles.btnVolver}>VOLVER</button>
      </div>

      {error && (
        <div style={{ backgroundColor: '#ff3333', color: '#fff', padding: '10px', border: '4px solid #000', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>
          {error}
        </div>
      )}

      {/* Envolvemos los inputs en un <form> para capturar el evento Submit */}
      <form onSubmit={procesarCompra}>
        <div className={styles.section} style={{ marginBottom: '20px' }}>
          <div className={styles.sectionLabel}>DATOS DE ENVÍO</div>
          <input required name="nombre" value={formData.nombre} onChange={handleChange} className={styles.input} placeholder="Nombre completo" />
          <input required name="email" type="email" value={formData.email} onChange={handleChange} className={styles.input} placeholder="Email" />
          <input required name="direccion" value={formData.direccion} onChange={handleChange} className={styles.input} placeholder="Dirección (calle, número)" />
          <div className={styles.row}>
            <input required name="ciudad" value={formData.ciudad} onChange={handleChange} className={styles.input} placeholder="Ciudad (ej. Trelew)" />
            <input required name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} className={styles.input} placeholder="Código postal" />
          </div>
          <input required name="pais" value={formData.pais} onChange={handleChange} className={styles.input} placeholder="País (ej. Argentina)" />
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>PAGO SEGURO</div>
          
          {/* Quitamos los inputs de tarjeta e informamos la redirección */}
          <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '10px' }}>
            Serás redirigido a MercadoPago para completar tu compra de forma segura.
          </p>
          
          <button 
            type="submit" 
            onClick={procesarCompra}
            className={styles.btnPagar} 
            disabled={cargando || carrito.length === 0}
            style={cargando ? { backgroundColor: '#ccc', cursor: 'not-allowed' } : {}}
          >
            {cargando ? 'CONECTANDO...' : 'PAGAR CON MERCADOPAGO'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;