const Checkout = ({ onConfirm, onVolver }) => {
  const styles = {
    container: {
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
    title: { 
      margin: 0, 
      fontSize: '1.5rem',
      fontWeight: 900
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxSizing: 'border-box'
    },
    label: { 
      fontSize: '1.1rem', 
      fontWeight: 900,
      background: '#000',
      color: '#fff',
      padding: '4px 8px',
      alignSelf: 'flex-start'
    },
    input: {
      width: '100%', // Clave para que no se rompa en móvil
      padding: '14px 12px',
      border: '4px solid #000',
      boxShadow: '6px 6px 0px #000',
      fontSize: '1rem',
      fontWeight: 'bold',
      outline: 'none',
      boxSizing: 'border-box',
      fontFamily: 'sans-serif',
      textTransform: 'uppercase'
    },
    row: { 
      display: 'flex', 
      gap: '15px', 
      flexDirection: 'column', // Mantenemos en columna para celulares
      boxSizing: 'border-box' 
    },
    payButton: {
      marginTop: '10px',
      padding: '18px 20px',
      background: '#ffde00',
      border: '4px solid #000',
      boxShadow: '6px 6px 0px #000',
      fontSize: '1.2rem',
      fontWeight: 900,
      cursor: 'pointer',
      boxSizing: 'border-box',
      textTransform: 'uppercase'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>CHECKOUT</h2>
        {/* Botón para no quedar atrapado en esta pantalla */}
        <button 
          onClick={onVolver} 
          style={{ border: '3px solid #000', padding: '6px 12px', background: '#fff', cursor: 'pointer', fontWeight: 900, boxShadow: '3px 3px 0px #000' }}
        >
          VOLVER
        </button>
      </div>

      <div style={styles.section}>
        <div style={styles.label}>DATOS DE ENVÍO</div>
        <input style={styles.input} placeholder="Nombre completo" />
        <input style={styles.input} type="email" placeholder="Email" />
        <input style={styles.input} placeholder="Dirección (calle, número)" />
        <div style={styles.row}>
          <input style={styles.input} placeholder="Ciudad (ej. Trelew)" />
          <input style={styles.input} placeholder="Código postal" />
        </div>
        <input style={styles.input} placeholder="País (ej. Argentina)" />
      </div>

      <div style={styles.section}>
        <div style={styles.label}>PAGO</div>
        <input style={styles.input} placeholder="Nombre en la tarjeta" />
        <input style={styles.input} placeholder="Número de tarjeta ficticio" maxLength="19" />
        <div style={styles.row}>
          <input style={styles.input} placeholder="MM/AA" maxLength="5" />
          <input style={styles.input} placeholder="CVV" maxLength="4" />
        </div>
        
        <button onClick={onConfirm} style={styles.payButton} type="button">
          CONFIRMAR PAGO
        </button>
      </div>
    </div>
  )
}

export default Checkout;