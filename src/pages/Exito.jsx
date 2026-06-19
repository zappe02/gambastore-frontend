import styles from './Exito.module.css';

const Exito = ({ onBack }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>¡GOOOL! GRACIAS POR TU COMPRA</h1>
      <div className={styles.subtitulo}>TU PEDIDO ESTÁ EN PROCESO</div>
      <button onClick={() => onBack && onBack()} className={styles.btn} type="button">
        VOLVER
      </button>
    </div>
  );
};

export default Exito;
