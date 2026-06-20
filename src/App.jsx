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
import Marcas from './pages/Marcas';       
import Categorias from './pages/Categorias'; 
import Cuenta from './pages/Cuenta';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [timerListo, setTimerListo] = useState(false);
  const [vistaActual, setVistaActual] = useState('catalogo');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [filtroActual, setFiltroActual] = useState({ tipo: 'todos', valor: '' });

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

  // Interceptamos los productos y los filtramos según lo que eligió el usuario
  const productosFiltrados = productos.filter(prod => {
    if (filtroActual.tipo === 'todos') return true;
    
    // Ajustá 'prod.marca' o 'prod.tipo' según cómo se llamen exactamente en el JSON de tu backend
    if (filtroActual.tipo === 'marca') {
      return prod.nombre.toLowerCase().includes(filtroActual.valor.toLowerCase()) || 
             (prod.marca && prod.marca.toLowerCase() === filtroActual.valor.toLowerCase());
    }
    
    if (filtroActual.tipo === 'categoria') {
      return prod.tipo && prod.tipo.toLowerCase() === filtroActual.valor.toLowerCase();
    }
    
    return true;
  });

  return (
    <>
      {mostrarWelcome && <WelcomeScreen fuerzaSalida={!mostrarWelcome} />}

      {!mostrarWelcome && (
        <Layout vistaActual={vistaActual} setVistaActual={setVistaActual} carrito={carrito}>
          
          {vistaActual === 'catalogo' && (
            <Catalogo
              productos={productosFiltrados}
              filtroActual={filtroActual} /* 👈 NUEVO: Le pasamos el filtro activo */
              onLimpiarFiltro={() => setFiltroActual({ tipo: 'todos', valor: '' })} /* 👈 NUEVO: Función para resetear */
              onVerProducto={(prod) => { setProductoSeleccionado(prod); setVistaActual('detalle'); }}
            />
          )}

          {/* VISTAS NUEVAS PARA LOS FILTROS */}
          {vistaActual === 'marcas' && (
            <Marcas 
              onSeleccionar={(marca) => {
                setFiltroActual({ tipo: marca === 'TODAS' ? 'todos' : 'marca', valor: marca });
                setVistaActual('catalogo');
              }} 
            />
          )}

          {vistaActual === 'categorias' && (
            <Categorias 
              onSeleccionar={(categoria) => {
                setFiltroActual({ tipo: categoria === 'TODAS' ? 'todos' : 'categoria', valor: categoria });
                setVistaActual('catalogo');
              }} 
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
              carrito={carrito}
              onVolver={() => setVistaActual('carrito')}
            />
          )}
          {vistaActual === 'cuenta' && (
            <Cuenta 
              onVolver={() => setVistaActual('catalogo')}
            />
          )}

          {vistaActual === 'exito' && (
            <Exito onBack={() => { 
              setVistaActual('catalogo'); 
              setFiltroActual({ tipo: 'todos', valor: '' }); // Reseteamos filtro al comprar
              window.scrollTo(0, 0); 
            }} />
          )}

        </Layout>
      )}
    </>
  );
}

export default App;