import styles from './Filtros.module.css';

const Marcas = ({ onSeleccionar }) => {
  // Podés expandir esta lista según lo que tengas en tu base de datos
  const opciones = ['Nike', 'Adidas', 'Puma', 'Umbro', 'TODAS'];

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>SELECCIONÁ UNA MARCA</h2>
      
      <div className={styles.grid}>
        {opciones.map((opcion) => (
          <button 
            key={opcion} 
            type="button"
            className={opcion === 'TODAS' ? styles.btnReset : styles.btnOpcion}
            onClick={() => onSeleccionar(opcion)}
          >
            {opcion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Marcas;