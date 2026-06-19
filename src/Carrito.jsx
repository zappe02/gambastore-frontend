const Carrito = ({ onAvanzar, onVolver }) => {
  const items = [
    { id: 1, name: 'ZAPATILLAS RETRO', brand: 'GAMBA', qty: 1, price: 79.99 },
    { id: 2, name: 'CAMISETA LOGO', brand: 'GAMBA', qty: 2, price: 19.5 },
    { id: 3, name: 'CALCETINES OG', brand: 'GAMBA', qty: 3, price: 4.99 }
  ]

  const total = items.reduce((s, it) => s + it.price * it.qty, 0)

  const styles = {
    wrapper: {
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
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      boxSizing: 'border-box'
    },
    title: { fontSize: 20, fontWeight: 900 },
    ticket: {
      display: 'flex',
      gap: 24,
      boxSizing: 'border-box'
    },
    list: {
      flex: 1,
      borderRight: '4px solid #000',
      paddingRight: 16,
      boxSizing: 'border-box'
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '2px dashed #000'
    },
    itemName: { fontSize: 14, fontWeight: 900 },
    itemMeta: { fontSize: 12, fontWeight: 700 },
    stub: {
      flexBasis: '30%',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      paddingLeft: 16,
      boxSizing: 'border-box'
    },
    stubBox: {
      background: '#fff',
      border: '4px solid #000',
      padding: 16,
      boxShadow: '8px 8px 0px #000',
      boxSizing: 'border-box'
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8
    },
    totalLabel: { fontSize: 18, fontWeight: 900 },
    totalValue: { fontSize: 24, fontWeight: 900, color: '#ffde00' },
    checkoutButton: {
      marginTop: 12,
      padding: '14px 18px',
      background: '#ffde00',
      border: '4px solid #000',
      boxShadow: '8px 8px 0px #000',
      fontWeight: 900,
      cursor: 'pointer',
      boxSizing: 'border-box'
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div style={styles.title}>CARRITO DE COMPRA</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onVolver && onVolver()} style={{ border: '3px solid #000', padding: '6px 10px', cursor: 'pointer' }}>VOLVER</button>
          <div style={{ fontWeight: 900 }}>TICKET</div>
        </div>
      </div>

      <div style={styles.ticket}>
        <div style={styles.list}>
          {items.map((it) => (
            <div key={it.id} style={styles.row}>
              <div>
                <div style={styles.itemName}>{it.name}</div>
                <div style={styles.itemMeta}>{it.brand} · x{it.qty}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={styles.itemName}>{(it.price * it.qty).toFixed(2)}€</div>
                <div style={styles.itemMeta}>{it.price.toFixed(2)}€ c/u</div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.stub}>
          <div style={styles.stubBox}>
            <div style={styles.totalRow}>
              <div style={styles.totalLabel}>TOTAL</div>
              <div style={styles.totalValue}>{total.toFixed(2)}€</div>
            </div>

            <button onClick={() => onAvanzar && onAvanzar()} style={styles.checkoutButton} type="button">
              PAGAR
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carrito
