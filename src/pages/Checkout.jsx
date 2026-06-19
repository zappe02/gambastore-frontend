import styles from './Checkout.module.css';

const Checkout = ({ onConfirm, onVolver }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.titulo}>CHECKOUT</h2>
        <button onClick={onVolver} className={styles.btnVolver}>VOLVER</button>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>DATOS DE ENVÍO</div>
        <input className={styles.input} placeholder="Nombre completo" />
        <input className={styles.input} type="email" placeholder="Email" />
        <input className={styles.input} placeholder="Dirección (calle, número)" />
        <div className={styles.row}>
          <input className={styles.input} placeholder="Ciudad (ej. Trelew)" />
          <input className={styles.input} placeholder="Código postal" />
        </div>
        <input className={styles.input} placeholder="País (ej. Argentina)" />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>PAGO</div>
        <input className={styles.input} placeholder="Nombre en la tarjeta" />
        <input className={styles.input} placeholder="Número de tarjeta ficticio" maxLength="19" />
        <div className={styles.row}>
          <input className={styles.input} placeholder="MM/AA" maxLength="5" />
          <input className={styles.input} placeholder="CVV" maxLength="4" />
        </div>
        <button onClick={onConfirm} className={styles.btnPagar} type="button">
          CONFIRMAR PAGO
        </button>
      </div>
    </div>
  );
};

export default Checkout;
