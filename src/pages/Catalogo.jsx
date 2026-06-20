import styles from './Catalogo.module.css';

const Catalogo = ({ productos, onVerProducto, filtroActual, onLimpiarFiltro }) => {
  return (
    <>
      <h2 className={styles.titulo}>PLAYER SELECT // TEMPORADA 2026</h2>

      {/* 🌟 NUEVO: BANNER DE FILTRO ACTIVO */}
      {filtroActual && filtroActual.tipo !== 'todos' && (
        <div className={styles.bannerFiltro}>
          <span className={styles.textoFiltro}>
            FILTRANDO {filtroActual.tipo === 'marca' ? 'MARCA' : 'TERRENO'}: {filtroActual.valor}
          </span>
          <button
            type="button"
            className={styles.btnLimpiar}
            onClick={onLimpiarFiltro}
          >
            [X] LIMPIAR
          </button>
        </div>
      )}

      <div className={styles.grid}>
        {productos.map((prod) => (
          <div key={prod.id} className={styles.card}>
            <div className={styles.cardImage}>
              <img
                src={prod.imagen_url || 'https://placehold.co/300x200/17191b/ffd400?text=SIN+IMAGEN'}
                alt={prod.nombre}
              />
            </div>

            <div className={styles.cardBody}>
              <span className={styles.modelo}>{prod.modelo || 'GAMBA'}</span>

              <h3 className={styles.nombre} onClick={() => onVerProducto(prod)}>
                {prod.nombre}
              </h3>

              <p className={styles.descripcion}>
                {prod.descripcion || 'Sin descripción disponible.'}
              </p>

              <div className={styles.cardFooter}>
                <span className={styles.precio}>
                  ${Number(prod.precio).toLocaleString('es-AR')}
                </span>
                <button type="button" className={styles.btnVer} onClick={() => onVerProducto(prod)}>
                  SELECT ▸
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Catalogo;