import { useEffect, useState } from 'react';
import api from './api'; 
import WelcomeScreen from './WelcomeScreen';

const PRODUCTOS_MOCK = [
  { id: '1', name: 'Botines Nike Mercurial', description: 'Ideales para velocidad en césped sintético.', price: 189900 },
  { id: '2', name: 'Botines Adidas Predator', description: 'Máximo control del balón y golpeo preciso.', price: 175000 }
];

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [timerListo, setTimerListo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerListo(true);
    }, 1800);

    api.get('/productos')
      .then((response) => {
        if (response.data && response.data.data) {
          setProductos(response.data.data);
        } else {
          setProductos(PRODUCTOS_MOCK);
        }
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setProductos(PRODUCTOS_MOCK);
        setCargando(false);
      });

    return () => clearTimeout(timer);
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const mostrarWelcome = cargando || !timerListo;

  return (
    <>
      <WelcomeScreen fuerzaSalida={!mostrarWelcome} />
      
      {!mostrarWelcome && (
        <div style={{ 
          maxWidth: '450px', 
          margin: '0 auto', 
          padding: '20px', 
          fontFamily: "'Arial Black', Gadget, sans-serif",
          backgroundColor: '#f0f0f0',
          minHeight: '100vh',
          boxSizing: 'border-box',
          borderLeft: '4px solid #000',
          borderRight: '4px solid #000'
        }}>
          <header style={{ 
            background: '#fff',
            border: '4px solid #000',
            boxShadow: '6px 6px 0px #000',
            padding: '15px',
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '-1px' }}>
                ⚡ GAMBA STORE
              </h1>
              <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', display: 'block', marginTop: '4px' }}>
                CLIENTE // API DEV
              </span>
            </div>
            
            <div style={{
              background: '#ffde00',
              border: '3px solid #000',
              padding: '6px 12px',
              fontWeight: '900',
              boxShadow: '3px 3px 0px #000',
              fontSize: '0.9rem'
            }}>
              🛒 [{carrito.length}]
            </div>
          </header>

          <main>
            <h2 style={{ 
              fontSize: '1.2rem', 
              textTransform: 'uppercase', 
              marginBottom: '20px',
              background: '#000',
              color: '#fff',
              display: 'inline-block',
              padding: '4px 8px'
            }}>
              TEMPORADA 2026 // BOTINES
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {productos.map((prod) => (
                <div key={prod.id} style={{ 
                  background: '#fff', 
                  border: '4px solid #000', 
                  boxShadow: '8px 8px 0px #000',
                  padding: '20px',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '15px',
                    background: '#fff',
                    border: '2px solid #000',
                    padding: '2px 6px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}>
                    {prod.marca || 'PRODUCTO'}
                  </span>

                  <h3 style={{ margin: '10px 0 8px 0', fontSize: '1.2rem', textTransform: 'uppercase' }}>
                    {prod.nombre || prod.name}
                  </h3>
                  
                  <p style={{ 
                    fontFamily: 'sans-serif', 
                    color: '#333', 
                    fontSize: '0.85rem', 
                    margin: '0 0 20px 0',
                    lineHeight: '1.4'
                  }}>
                    {prod.descripcion || prod.description || 'Sin descripción disponible.'}
                  </p>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: '900' }}>
                      ${Number(prod.precio || prod.price).toLocaleString('es-AR')}
                    </span>
                    
                    <button 
                      onClick={() => agregarAlCarrito(prod)}
                      style={{ 
                        background: '#ffde00', 
                        border: '3px solid #000', 
                        padding: '8px 16px', 
                        fontWeight: '900',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        boxShadow: '3px 3px 0px #000',
                        textTransform: 'uppercase'
                      }}
                    >
                      AÑADIR +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {carrito.length > 0 && (
            <section style={{
              marginTop: '40px',
              background: '#fff',
              border: '4px solid #000',
              boxShadow: '8px 8px 0px #000',
              padding: '20px'
            }}>
              <h2 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', textTransform: 'uppercase' }}>
                DATOS DE ENVÍO
              </h2>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '5px' }}>DIRECCIÓN DE ENTREGA:</label>
                <input 
                  type="text" 
                  placeholder="Ej. Av. Fontana 123, Trelew" 
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '3px solid #000',
                    fontFamily: 'sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <button style={{
                width: '100%',
                background: '#000',
                color: '#fff',
                border: 'none',
                padding: '12px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}>
                PAGAR CON MERCADOPAGO 💳
              </button>
            </section>
          )}
        </div>
      )}
    </>
  );
}

export default App;