import styles from './Filtros.module.css';

const Categorias = ({ onSeleccionar }) => {
  // Las opciones oficiales de Gamba Store
  const opciones = [
    'Sintético', 
    'Césped Natural', 
    'Futsal', 
    'Multiterreno', 
    'Retro', 
    'TODAS'
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>ELEGÍ TU TERRENO</h2>
      
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

export default Categorias;