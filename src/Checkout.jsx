const Checkout = ({ onConfirm }) => {
  const styles = {
    container: {
      width: 'calc(100% - 12px)',
      margin: '24px auto',
      padding: 24,
      boxSizing: 'border-box',
      background: '#fff',
      border: '4px solid #000',
      boxShadow: '8px 8px 0px #000',
      fontFamily: 'Arial Black, Impact, sans-serif',
      textTransform: 'uppercase',
      color: '#000'
    },
    section: {
      marginBottom: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      boxSizing: 'border-box'
    },
    label: { fontSize: 12, fontWeight: 900 },
    input: {
      padding: '12px 10px',
      border: '4px solid #000',
      boxShadow: '8px 8px 0px #000',
      fontSize: 14,
      outline: 'none',
      boxSizing: 'border-box'
    },
    row: { display: 'flex', gap: 12, flexDirection: 'column', boxSizing: 'border-box' },
    half: { flex: 1 },
    payButton: {
      marginTop: 12,
      padding: '16px 20px',
      background: '#ffde00',
      border: '4px solid #000',
      boxShadow: '8px 8px 0px #000',
      fontWeight: 900,
      cursor: 'pointer',
      boxSizing: 'border-box'
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={{ margin: '0 0 12px 0', fontSize: 18 }}>CHECKOUT</h2>

      <div style={styles.section}>
        <div style={styles.label}>DATOS DE ENVÍO</div>
        <input style={styles.input} placeholder="Nombre completo" />
        <input style={styles.input} placeholder="Email" />
        <input style={styles.input} placeholder="Dirección (calle, número)" />
        <div style={{ ...styles.row }}>
          <input style={{ ...styles.input, ...styles.half }} placeholder="Ciudad" />
          <input style={{ ...styles.input, ...styles.half }} placeholder="Código postal" />
        </div>
        <input style={styles.input} placeholder="País" />
      </div>

      <div style={styles.section}>
        <div style={styles.label}>PAGO</div>
        <input style={styles.input} placeholder="Nombre en la tarjeta" />
        <input style={styles.input} placeholder="Número de tarjeta" />
        <div style={styles.row}>
          <input style={{ ...styles.input, ...styles.half }} placeholder="MM/AA" />
          <input style={{ ...styles.input, ...styles.half }} placeholder="CVV" />
        </div>
        <button onClick={() => onConfirm && onConfirm()} style={styles.payButton} type="button">CONFIRMAR PAGO</button>
      </div>
    </div>
  )
}

export default Checkout
