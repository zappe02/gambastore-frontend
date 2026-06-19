import styles from './BottomNav.module.css';

const NAV_ITEMS = [
  { id: 'catalogo',   label: 'INICIO',      icon: '🏠' },
  { id: 'categorias', label: 'CATEGORÍAS',   icon: '🏷️' },
  { id: 'carrito',    label: 'CARRITO',      icon: '🛒' },
  { id: 'cuenta',     label: 'CUENTA',       icon: '👤' },
];

const BottomNav = ({ vistaActual, setVistaActual, carritoCount }) => {
  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map((item) => {
        const isActive = vistaActual === item.id;
        const showBadge = item.id === 'carrito' && carritoCount > 0;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setVistaActual(item.id)}
            className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            {item.label}
            {showBadge && <span className={styles.badge}>{carritoCount}</span>}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
