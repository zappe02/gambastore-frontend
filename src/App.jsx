import { useEffect, useState } from 'react';
import api from './api'; 
import WelcomeScreen from './WelcomeScreen';
import Carrito from './Carrito';
import Checkout from './Checkout';
import Exito from './Exito';
import DetalleProducto from './DetalleProducto';

const PRODUCTOS_MOCK = [
  { id: '1', name: 'Botines Nike Mercurial', description: 'Ideales para velocidad en césped sintético.', price: 189900 },
  { id: '2', name: 'Botines Adidas Predator', description: 'Máximo control del balón y golpeo preciso.', price: 175000 }
];

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [timerListo, setTimerListo] = useState(false);
  const [vistaActual, setVistaActual] = useState('catalogo');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

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

          <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            padding: '10px',
            background: '#fff',
            border: '4px solid #000',
            boxShadow: '6px 6px 0px #000'
          }}>
            <div onClick={() => setVistaActual('catalogo')} style={{ cursor: 'pointer', fontWeight: '900' }}>
              ⚡ GAMBA STORE
            </div>
            <div>
              <button onClick={() => setVistaActual('carrito')} style={{
                background: '#ffde00',
                border: '3px solid #000',
                padding: '6px 12px',
                fontWeight: '900',
                boxShadow: '3px 3px 0px #000',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}>
                🛒 [{carrito.length}]
              </button>
            </div>
          </nav>

          <main>
            {vistaActual === 'catalogo' && (
              <>
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

                      <h3 style={{ margin: '10px 0 8px 0', fontSize: '1.2rem', textTransform: 'uppercase', cursor: 'pointer', color: '#000' }} onClick={() => { setProductoSeleccionado(prod); setVistaActual('detalle'); }}>
                        {prod.nombre || prod.name}
                      </h3>
                      
                      <p style={{ 
                        fontFamily: 'sans-serif', 
                        color: '#000', 
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
                          onClick={() => { agregarAlCarrito(prod); setVistaActual('carrito'); }}
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
              </>
            )}

            {vistaActual === 'detalle' && (
              <DetalleProducto product={productoSeleccionado} onBack={() => setVistaActual('catalogo')} />
            )}

            {vistaActual === 'carrito' && (
              <Carrito onAvanzar={() => setVistaActual('checkout')} onVolver={() => setVistaActual('catalogo')} />
            )}

            {vistaActual === 'checkout' && (
              <Checkout onConfirm={() => { setVistaActual('exito'); setCarrito([]); }} />
            )}

            {vistaActual === 'exito' && (
              <Exito onBack={() => { setVistaActual('catalogo'); setCarrito([]); window.scrollTo(0,0); }} />
            )}
          </main>

          
        </div>
      )}
    </>
  );
}

export default App;