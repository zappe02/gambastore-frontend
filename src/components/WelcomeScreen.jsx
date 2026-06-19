import { useEffect, useState } from 'react';
import styles from './WelcomeScreen.module.css';

function WelcomeScreen({ fuerzaSalida }) {
  const [renderizar, setRenderizar] = useState(true);
  const visible = !fuerzaSalida;

  useEffect(() => {
    if (fuerzaSalida) {
      const timer = setTimeout(() => setRenderizar(false), 500);
      return () => clearTimeout(timer);
    }
  }, [fuerzaSalida]);

  if (!renderizar) return null;

  return (
    <div className={`${styles.overlay} ${visible ? styles.overlayVisible : styles.overlayHiding}`}>
      <div className={styles.card}>
        <h1 className={styles.titulo}>⚡ GAMBA STORE ⚡</h1>
        <p className={styles.subtitulo}>TEMPORADA 2026 // LOADING</p>
      </div>
    </div>
  );
}

export default WelcomeScreen;
