import BottomNav from './BottomNav';
import styles from './Layout.module.css';

const NAV_ITEMS = [
  { id: 'catalogo',   label: 'INICIO' },
  { id: 'categorias', label: 'CATEGORÍAS' },
  { id: 'marcas',     label: 'MARCAS' },
];

const Layout = ({ children, vistaActual, setVistaActual, carrito }) => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.topNav}>
        <div className={styles.logo} onClick={() => setVistaActual('catalogo')}>
          <h1 className={styles.logoTitle}>⚡ GAMBA STORE</h1>
          <span className={styles.logoSub}>1P READY // SELECT MODE</span>
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
            </button>
          ))}
        </div>

        <div className={styles.rightActions}>
          <button type="button" className={styles.cartBtn} onClick={() => setVistaActual('carrito')}>
            🛒 [{carrito.length}]
          </button>
          <button
            type="button"
            className={`${styles.accountBtn} ${vistaActual === 'cuenta' ? styles.accountBtnActive : ''}`}
            onClick={() => setVistaActual('cuenta')}
            aria-label="Cuenta"
          >
            <svg viewBox="0 0 12 12" width="18" height="18" aria-hidden="true" shapeRendering="crispEdges">
              <rect x="4" y="1" width="4" height="4" fill="currentColor" />
              <rect x="3" y="6" width="6" height="2" fill="currentColor" />
              <rect x="2" y="8" width="8" height="2" fill="currentColor" />
              <rect x="1" y="10" width="10" height="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      </nav>

      <main>{children}</main>

      <BottomNav
        vistaActual={vistaActual}
        setVistaActual={setVistaActual}
      />
    </div>
  );
};

export default Layout;
