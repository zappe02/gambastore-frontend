import { useEffect, useState } from 'react';

function WelcomeScreen({ fuerzaSalida }) {
  const [visible, setVisible] = useState(true);
  const [renderizar, setRenderizar] = useState(true);

  useEffect(() => {
    if (fuerzaSalida) {
      setVisible(false);
      const timer = setTimeout(() => setRenderizar(false), 500);
      return () => clearTimeout(timer);
    }
  }, [fuerzaSalida]);

  if (!renderizar) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ffde00',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1)' : 'scale(1.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        background: '#fff',
        border: '6px solid #000',
        padding: '25px 40px',
        boxShadow: '10px 10px 0px #000',
        textAlign: 'center',
        transform: 'rotate(-3deg)'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '2.5rem',
          fontFamily: "'Arial Black', Gadget, sans-serif",
          textTransform: 'uppercase',
          letterSpacing: '-2px',
          animation: 'blink 1s infinite alternate'
        }}>
          ⚡ GAMBA STORE ⚡
        </h1>
        <p style={{
          margin: '10px 0 0 0',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          fontSize: '1rem',
          backgroundColor: '#000',
          color: '#fff',
          padding: '4px 8px',
          display: 'inline-block'
        }}>
          TEMPORADA 2026 // LOADING
        </p>
      </div>

      <style>{`
        @keyframes blink {
          0% { transform: scale(0.98); }
          100% { transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}

export default WelcomeScreen;