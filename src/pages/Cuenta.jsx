import { useState } from 'react';
import styles from './Cuenta.module.css';

const Cuenta = () => {
  const [codigoTracking, setCodigoTracking] = useState('');
  const [estadoBusqueda, setEstadoBusqueda] = useState(null);
  const [historial] = useState(() => {
    if (typeof window === 'undefined') return [];

    try {
      const pedidosGuardados = JSON.parse(localStorage.getItem('gamba_pedidos')) || [];
      return pedidosGuardados;
    } catch {
      return [];
    }
  });

  const handleBuscar = (e) => {
    e.preventDefault();
    if (!codigoTracking.trim()) return;

    setEstadoBusqueda({ status: 'loading' });

    // Simulamos que le preguntamos a la API de Laravel
    setTimeout(() => {
      // Para la demo, buscamos si el código coincide con alguno del historial
      const pedidoEncontrado = historial.find(p => p.id === codigoTracking);
      
      if (pedidoEncontrado) {
        setEstadoBusqueda({ status: 'success', data: pedidoEncontrado });
      } else {
        setEstadoBusqueda({ status: 'error' });
      }
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>TERMINAL // SEGUIMIENTO</h2>

      {/* SECCIÓN 1: BUSCADOR DE TRACKING */}
      <div className={styles.card}>
        <h3 className={styles.subtitulo}>RASTREAR ORDEN</h3>
        <p className={styles.texto}>Ingresá el ID de tu pedido para conocer el estado del envío.</p>
        
        <form onSubmit={handleBuscar} className={styles.searchForm}>
          <input 
            type="text" 
            placeholder="EJ: GAMBA-9876" 
            className={styles.inputTracking}
            value={codigoTracking}
            onChange={(e) => setCodigoTracking(e.target.value)}
          />
          <button type="submit" className={styles.btnBuscar}>
            BUSCAR
          </button>
        </form>

        {estadoBusqueda?.status === 'loading' && (
          <div className={styles.alertaNeutral}>CONECTANDO CON EL SERVIDOR...</div>
        )}

        {estadoBusqueda?.status === 'error' && (
          <div className={styles.alertaError}>ORDEN NO ENCONTRADA O INEXISTENTE.</div>
        )}

        {estadoBusqueda?.status === 'success' && (
          <div className={styles.alertaExito}>
            <strong>ESTADO:</strong> PREPARANDO ENVÍO <br/>
            <strong>FECHA:</strong> {estadoBusqueda.data.fecha} <br/>
            <strong>TOTAL:</strong> ${estadoBusqueda.data.total}
          </div>
        )}
      </div>

      {/* SECCIÓN 2: HISTORIAL LOCAL */}
      <h3 className={styles.subtitulo} style={{ marginTop: '40px' }}>COMPRAS EN ESTE DISPOSITIVO</h3>
      
      {historial.length === 0 ? (
        <p className={styles.texto}>No hay registros de compras recientes en este navegador.</p>
      ) : (
        <div className={styles.gridHistorial}>
          {historial.map((pedido, index) => (
            <div key={index} className={styles.itemHistorial}>
              <div className={styles.itemHeader}>
                <span className={styles.pedidoId}>ID: {pedido.id}</span>
                <span className={styles.pedidoFecha}>{pedido.fecha}</span>
              </div>
              <div className={styles.itemTotal}>
                TOTAL: ${pedido.total}
              </div>
              <div className={styles.itemEstado}>ESTADO: EN PROCESO</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cuenta;