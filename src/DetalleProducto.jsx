import React from 'react'

const DetalleProducto = ({ product: propProduct, onBack }) => {
  const product = propProduct || {
    title: 'ZAPATILLAS RETRO',
    brand: 'GAMBA',
    description:
      'Zapatillas de diseño retro con suela reforzada y acabado mate. Perfectas para uso urbano y look vintage.',
    price: '79.99€',
    sizes: ['36', '37', '38', '39', '40', '41']
  }

  const title = product.title || product.name || 'PRODUCTO';
  const brand = product.brand || product.marca || '';
  const description = product.description || product.descripcion || '';
  const sizes = product.sizes || [];
  const priceDisplay = typeof product.price === 'number' ? `$${Number(product.price).toLocaleString('es-AR')}` : product.price;

  const styles = {
    container: {
      position: 'relative',
      display: 'flex',
      gap: 24,
      padding: 32,
      background: '#fff',
      border: '4px solid #000',
      boxShadow: '8px 8px 0px #000',
      fontFamily: 'Arial Black, Impact, sans-serif',
      textTransform: 'uppercase',
      color: '#000',
      alignItems: 'flex-start'
    },
    imageWrapper: {
      width: 420,
      height: 420,
      flex: '0 0 420px',
      border: '4px solid #000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: '#fff'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    },
    info: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 420
    },
    header: {
      marginBottom: 8
    },
    title: {
      fontSize: 32,
      fontWeight: 900,
      margin: 0,
      letterSpacing: 1
    },
    brand: {
      fontSize: 16,
      fontWeight: 900,
      color: '#000'
    },
    description: {
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1.4,
      marginTop: 16,
      textTransform: 'uppercase'
    },
    price: {
      fontSize: 28,
      fontWeight: 900,
      marginTop: 12
    },
    sizesRow: {
      display: 'flex',
      gap: 12,
      marginTop: 18,
      flexWrap: 'wrap'
    },
    sizeButton: {
      border: '4px solid #000',
      padding: '12px 18px',
      background: '#fff',
      boxShadow: '8px 8px 0px #000',
      fontWeight: 900,
      cursor: 'pointer'
    },
    addRow: {
      display: 'flex',
      gap: 16,
      alignItems: 'center'
    },
    addButton: {
      background: '#ffde00',
      border: '4px solid #000',
      boxShadow: '8px 8px 0px #000',
      padding: '20px 28px',
      fontSize: 18,
      fontWeight: 900,
      cursor: 'pointer'
    }
  }

  return (
    <div style={styles.container}>
      <div style={{ position: 'absolute', top: 16, left: 16 }}>
        <button onClick={() => onBack && onBack()} style={{ border: '3px solid #000', padding: '6px 10px', background: '#fff', cursor: 'pointer' }}>VOLVER</button>
      </div>
      <div style={styles.imageWrapper}>
        <img
          alt={product.title}
          src="https://via.placeholder.com/600x600?text=Producto"
          style={styles.image}
        />
      </div>

      <div style={styles.info}>
        <div>
          <div style={styles.header}>
            <h1 style={styles.title}>{title}</h1>
            <div style={styles.brand}>{brand}</div>
          </div>

          <div style={styles.description}>{description}</div>

          <div style={styles.sizesRow}>
            {sizes.map((s) => (
              <button key={s} style={styles.sizeButton} type="button">
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.addRow}>
          <div style={styles.price}>{priceDisplay}</div>
          <button style={styles.addButton} type="button">
            AÑADIR AL CARRITO
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetalleProducto
