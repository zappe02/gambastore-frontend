import { useState } from 'react';
import styles from './DetalleProducto.module.css';

const DetalleProducto = ({ product, onBack, onAddToCart }) => {
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);

  if (!product) return null;

  const nombre = product.nombre || 'PRODUCTO';
  const modelo = product.modelo || 'No especificado';
  const tipo = product.tipo || 'Multiterreno';
  const descripcion = product.descripcion || 'Este producto no cuenta con una descripción detallada en este momento.';
  const precio = typeof product.precio === 'number' ? `$${product.precio.toLocaleString('es-AR')}` : product.precio;
  const imagen = product.imagen_url || 'https://placehold.co/600x600/f0f0f0/000000?text=SIN+IMAGEN';
  const talles = product.talles || [];

  const handleAñadir = () => {
    if (!talleSeleccionado) return;
    onAddToCart({ ...product, talleElegido: talleSeleccionado });
    onBack();
  };

  return (
    <div className={styles.container}>
      <button onClick={onBack} className={styles.btnVolver}>← VOLVER</button>

      <div className={styles.layout}>
        <div className={styles.imagenWrapper}>
          <img alt={nombre} src={imagen} className={styles.imagen} />
        </div>

        <div className={styles.info}>
          <h1 className={styles.nombre}>{nombre}</h1>

          <div className={styles.fichaBox}>
            <h4 className={styles.fichaTitulo}>FICHA TÉCNICA</h4>
            <ul className={styles.fichaLista}>
              <li><strong>MODELO:</strong> {modelo}</li>
              <li><strong>SUPERFICIE:</strong> {tipo}</li>
              <li><strong>DETALLE:</strong> {descripcion}</li>
            </ul>
          </div>

          <div>
            <h3 className={styles.tallesTitulo}>SELECCIONÁ TU TALLE:</h3>
            <div className={styles.tallesGrid}>
              {talles.map((item) => {
                const isSelected = talleSeleccionado === item.talle;
                const hasStock = item.stock > 0;
                return (
                  <button
                    type="button"
                    key={item.talle}
                    onClick={() => hasStock && setTalleSeleccionado(item.talle)}
                    disabled={!hasStock}
                    className={`${styles.talleBtn} ${isSelected ? styles.talleBtnActivo : ''} ${!hasStock ? styles.talleBtnAgotado : ''}`}
                  >
                    {item.talle}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.compraFooter}>
            <div className={styles.precioFinal}>{precio}</div>
            <button
              type="button"
              onClick={handleAñadir}
              disabled={!talleSeleccionado}
              className={`${styles.addBtn} ${!talleSeleccionado ? styles.addBtnDisabled : ''}`}
            >
              {talleSeleccionado ? 'AÑADIR AL CARRITO' : 'ELEGÍ UN TALLE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
