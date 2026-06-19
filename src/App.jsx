import { useEffect, useState } from 'react';
import api from './services/api';
import PRODUCTOS_MOCK from './services/productos.mock';
import WelcomeScreen from './components/WelcomeScreen';
import Layout from './components/Layout';
import Catalogo from './pages/Catalogo';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import Exito from './pages/Exito';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [timerListo, setTimerListo] = useState(false);
  const [vistaActual, setVistaActual] = useState('catalogo');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setTimerListo(true), 1800);

    api.get('/api/api/productos')
      .then((response) => {
        setProductos(response.data?.data ?? PRODUCTOS_MOCK);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setProductos(PRODUCTOS_MOCK);
        setCargando(false);
      });

    return () => clearTimeout(timer);
  }, []);

  const agregarAlCarrito = (producto) => setCarrito([...carrito, producto]);

  const mostrarWelcome = cargando || !timerListo;

  return (
    <>
      {mostrarWelcome && <WelcomeScreen fuerzaSalida={!mostrarWelcome} />}

      {!mostrarWelcome && (
        <Layout vistaActual={vistaActual} setVistaActual={setVistaActual} carrito={carrito}>
          {vistaActual === 'catalogo' && (
            <Catalogo
              productos={productos}
              onVerProducto={(prod) => { setProductoSeleccionado(prod); setVistaActual('detalle'); }}
            />
          )}
          {vistaActual === 'detalle' && (
            <DetalleProducto
              product={productoSeleccionado}
              onBack={() => setVistaActual('catalogo')}
              onAddToCart={(p) => { agregarAlCarrito(p); setVistaActual('carrito'); }}
            />
          )}
          {vistaActual === 'carrito' && (
            <Carrito
              carrito={carrito}
              onAvanzar={() => setVistaActual('checkout')}
              onVolver={() => setVistaActual('catalogo')}
            />
          )}
          {vistaActual === 'checkout' && (
            <Checkout
              onConfirm={() => { setVistaActual('exito'); setCarrito([]); }}
              onVolver={() => setVistaActual('carrito')}
            />
          )}
          {vistaActual === 'exito' && (
            <Exito onBack={() => { setVistaActual('catalogo'); window.scrollTo(0, 0); }} />
          )}
        </Layout>
      )}
    </>
  );
}

export default App;
