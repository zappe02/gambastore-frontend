import React from 'react';

const Carrito = ({ carrito = [], onAvanzar, onVolver }) => {
  const total = carrito.reduce((sum, item) => sum + Number(item.precio || 0), 0);

  const styles = {
    wrapper: {
      width: '100%',
      padding: '20px',
      boxSizing: 'border-box',
      background: '#fff',
      border: '4px solid #000',
      boxShadow: '8px 8px 0px #000',
      fontFamily: "'Arial Black', Impact, sans-serif",
      textTransform: 'uppercase',
      color: '#000',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '4px solid #000',
      paddingBottom: '10px'
    },
    /* 🌟 FORZAMOS EL COLOR NEGRO ACÁ */
    title: { fontSize: '1.5rem', fontWeight: 900, margin: 0, color: '#000' }, 
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    row: {
      display: 'flex',
      gap: '15px',
      padding: '15px 0',
      borderBottom: '2px dashed #000',
      alignItems: 'center'
    },
    imageContainer: {
      width: '70px',
      height: '70px',
      border: '3px solid #000',
      background: '#f0f0f0',
      flexShrink: 0,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    itemDetails: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    },
    itemName: { fontSize: '1rem', fontWeight: 900, lineHeight: 1.2, color: '#000' },
    itemMeta: { 
      fontSize: '0.75rem', 
      fontWeight: 700, 
      background: '#000', 
      color: '#fff', 
      alignSelf: 'flex-start', 
      padding: '2px 6px' 
    },
    itemPrice: { fontSize: '1.2rem', fontWeight: 900, textAlign: 'right', color: '#000' },
    emptyState: {
      textAlign: 'center',
      padding: '40px 0',
      fontSize: '1.2rem',
      fontWeight: 900,
      color: '#000'
    },
    stubBox: {
      background: '#fff',
      border: '4px solid #000',
      padding: '20px',
      boxShadow: '6px 6px 0px #000',
      boxSizing: 'border-box',
      marginTop: '10px'
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    totalLabel: { fontSize: '1.5rem', fontWeight: 900, color: '#000' },
    totalValue: { fontSize: '1.8rem', fontWeight: 900, color: '#000' },
    checkoutButton: {
      width: '100%',
      padding: '15px',
      background: '#ffde00',
      border: '4px solid #000',
      boxShadow: '6px 6px 0px #000',
      fontSize: '1.2rem',
      fontWeight: 900,
      cursor: 'pointer',
      textTransform: 'uppercase',
      color: '#000'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.title}>CARRITO</h2>
        {/* 🌟 FORZAMOS EL COLOR NEGRO EN EL BOTÓN VOLVER */}
        <button 
          onClick={onVolver} 
          style={{ border: '3px solid #000', padding: '6px 12px', background: '#fff', color: '#000', cursor: 'pointer', fontWeight: 900, boxShadow: '3px 3px 0px #000' }}
        >
          VOLVER
        </button>
      </div>

      <div style={styles.list}>
        {carrito.length === 0 ? (
          <div style={styles.emptyState}>TU CARRITO ESTÁ VACÍO</div>
        ) : (
          carrito.map((it, index) => (
            <div key={index} style={styles.row}>
              <div style={styles.imageContainer}>
                <img 
                  src={it.imagen_url || 'https://placehold.co/80x80/000/fff?text=IMG'} 
                  alt={it.nombre} 
                  style={styles.image} 
                />
              </div>
              <div style={styles.itemDetails}>
                <div style={styles.itemName}>{it.nombre}</div>
                <div style={styles.itemMeta}>TALLE: {it.talleElegido || 'N/A'}</div>
              </div>
              <div style={styles.itemPrice}>${Number(it.precio).toLocaleString('es-AR')}</div>
            </div>
          ))
        )}
      </div>

      {carrito.length > 0 && (
        <div style={styles.stubBox}>
          <div style={styles.totalRow}>
            <div style={styles.totalLabel}>TOTAL</div>
            <div style={styles.totalValue}>${total.toLocaleString('es-AR')}</div>
          </div>
          <button onClick={onAvanzar} style={styles.checkoutButton}>
            IR A PAGAR
          </button>
        </div>
      )}
    </div>
  );
};

export default Carrito;