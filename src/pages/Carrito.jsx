import styles from './Carrito.module.css';

const Carrito = ({ carrito = [], onAvanzar, onVolver }) => {
  const total = carrito.reduce((sum, item) => sum + Number(item.precio || 0), 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.titulo}>CARRITO</h2>
        <button onClick={onVolver} className={styles.btnVolver}>VOLVER</button>
      </div>

      <div className={styles.list}>
        {carrito.length === 0 ? (
          <div className={styles.emptyState}>GAME OVER<br />NO HAY BOTINES EN CANCHA</div>
        ) : (
          carrito.map((it, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.imgBox}>
                <img
                  src={it.imagen_url || 'https://placehold.co/80x80/17191b/ffd400?text=IMG'}
                  alt={it.nombre}
                />
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>{it.nombre}</div>
                <div className={styles.itemMeta}>TALLE: {it.talleElegido || 'N/A'}</div>
              </div>
              <div className={styles.itemPrice}>${Number(it.precio).toLocaleString('es-AR')}</div>
            </div>
          ))
        )}
      </div>

      {carrito.length > 0 && (
        <div className={styles.totalBox}>
          <div className={styles.totalRow}>
            <div className={styles.totalLabel}>TOTAL</div>
            <div className={styles.totalValue}>${total.toLocaleString('es-AR')}</div>
          </div>
          <button onClick={onAvanzar} className={styles.btnPagar}>IR A PAGAR</button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
