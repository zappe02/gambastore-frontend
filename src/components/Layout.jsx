import BottomNav from './BottomNav';
import styles from './Layout.module.css';

const NAV_ITEMS = [
  { id: 'catalogo',   label: 'INICIO' },
  { id: 'categorias', label: 'CATEGORÍAS' },
  { id: 'carrito',    label: 'CARRITO' },
  { id: 'cuenta',     label: 'CUENTA' },
];

const Layout = ({ children, vistaActual, setVistaActual, carrito }) => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.topNav}>
        <div className={styles.logo} onClick={() => setVistaActual('catalogo')}>
          <h1 className={styles.logoTitle}>⚡ GAMBA STORE</h1>
          <span className={styles.logoSub}>CLIENTE // API DEV</span>
        </div>

        <div className={styles.desktopNav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setVistaActual(item.id)}
              className={`${styles.desktopNavItem} ${vistaActual === item.id ? styles.desktopNavItemActive : ''}`}
            >
              {item.label}
              {item.id === 'carrito' && carrito.length > 0 && ` [${carrito.length}]`}
            </button>
          ))}
        </div>

        <button type="button" className={styles.cartBtn} onClick={() => setVistaActual('carrito')}>
          🛒 [{carrito.length}]
        </button>
      </nav>

      <main>{children}</main>

      <BottomNav
        vistaActual={vistaActual}
        setVistaActual={setVistaActual}
        carritoCount={carrito.length}
      />
    </div>
  );
};

export default Layout;
