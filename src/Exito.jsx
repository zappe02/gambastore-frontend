

const Exito = ({ onBack }) => {
  const styles = {
    container: {
      maxWidth: 720,
      margin: '80px auto',
      padding: 36,
      background: '#fff',
      border: '4px solid #000',
      boxShadow: '8px 8px 0px #000',
      fontFamily: 'Arial Black, Impact, sans-serif',
      textTransform: 'uppercase',
      textAlign: 'center',
      color: '#000'
      
    },
    title: {
      fontSize: 32,
      fontWeight: 900,
      margin: 0,
      color: '#000'
    },
    subtitle: {
      fontSize: 16,
      fontWeight: 700,
      marginTop: 12
    },
    button: {
      marginTop: 28,
      padding: '16px 28px',
      background: '#ffde00',
      border: '4px solid #000',
      boxShadow: '8px 8px 0px #000',
      fontSize: 18,
      fontWeight: 900,
      cursor: 'pointer'
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>GRACIAS POR TU COMPRA</h1>
      <div style={styles.subtitle}>Tu pedido está en proceso</div>
      <button onClick={() => onBack && onBack()} style={styles.button} type="button">VOLVER</button>
    </div>
  )
}

export default Exito
