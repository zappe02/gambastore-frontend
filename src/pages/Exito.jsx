import styles from './Exito.module.css';

const Exito = ({ onBack }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>GRACIAS POR TU COMPRA</h1>
      <div className={styles.subtitulo}>Tu pedido está en proceso</div>
      <button onClick={() => onBack && onBack()} className={styles.btn} type="button">
        VOLVER
      </button>
    </div>
  );
};

export default Exito;
