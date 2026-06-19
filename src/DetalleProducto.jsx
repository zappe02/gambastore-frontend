import { useState } from 'react';

const DetalleProducto = ({ product, onBack, onAddToCart }) => {
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);

  if (!product) return null;

  // Extraemos todos los datos útiles de la API
  const nombre = product.nombre || 'PRODUCTO';
  const modelo = product.modelo || 'No especificado'; 
  const tipo = product.tipo || 'Multiterreno';
  const descripcion = product.descripcion || 'Este producto no cuenta con una descripción detallada en este momento.';
  const precio = typeof product.precio === 'number' ? `$${product.precio.toLocaleString('es-AR')}` : product.precio;
  const imagen = product.imagen_url || 'https://placehold.co/600x600/f0f0f0/000000?text=SIN+IMAGEN';
  const talles = product.talles || [];

  const handleAñadir = () => {
    if (!talleSeleccionado) return;
    onAddToCart({ ...product, talleElegido: talleSeleccionado });
    onBack(); 
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', 
      gap: '20px',
      background: '#fff',
      border: '4px solid #000',
      boxShadow: '8px 8px 0px #000',
      padding: '20px',
      boxSizing: 'border-box',
      width: '100%',
      position: 'relative'
    }}>
      
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <button 
          onClick={onBack} 
          style={{ 
            border: '3px solid #000', 
            padding: '6px 12px', 
            background: '#fff', 
            cursor: 'pointer',
            fontWeight: '900',
            boxShadow: '3px 3px 0px #000',
            textTransform: 'uppercase',
            color: '#000'
          }}
        >
          ← VOLVER
        </button>
      </div>

      <div style={{
        width: '100%',
        border: '4px solid #000',
        background: '#e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <img
          alt={nombre}
          src={imagen}
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', margin: '0 0 10px 0', textTransform: 'uppercase', lineHeight: '1.1', color: '#000' }}>
            {nombre}
          </h1>
        </div>

        {/* 🌟 NUEVA FICHA TÉCNICA ORDENADA */}
        <div style={{ 
          background: '#f8f8f8', 
          border: '3px solid #000', 
          padding: '15px' 
        }}>
          <h4 style={{ margin: '0 0 10px 0', textTransform: 'uppercase', color: '#000', borderBottom: '2px solid #000', paddingBottom: '5px', fontSize: '1.1rem' }}>
            FICHA TÉCNICA
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#000', fontSize: '0.9rem', lineHeight: '1.6', fontFamily: 'sans-serif' }}>
            <li><strong style={{ fontFamily: "'Arial Black', Impact, sans-serif", textTransform: 'uppercase' }}>MODELO:</strong> {modelo}</li>
            <li><strong style={{ fontFamily: "'Arial Black', Impact, sans-serif", textTransform: 'uppercase' }}>SUPERFICIE:</strong> {tipo}</li>
            <li><strong style={{ fontFamily: "'Arial Black', Impact, sans-serif", textTransform: 'uppercase' }}>DETALLE:</strong> {descripcion}</li>
          </ul>
        </div>

        <div>
          <h3 style={{ margin: '10px 0', fontSize: '1rem', textTransform: 'uppercase', color: '#000' }}>SELECCIONÁ TU TALLE:</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {talles.map((item) => {
              const isSelected = talleSeleccionado === item.talle;
              const hasStock = item.stock > 0;

              return (
                <button 
                  type="button"
                  key={item.talle} 
                  onClick={() => hasStock && setTalleSeleccionado(item.talle)}
                  disabled={!hasStock}
                  style={{ 
                    border: '3px solid #000', 
                    padding: '10px 15px', 
                    background: isSelected ? '#000' : (hasStock ? '#fff' : '#ccc'), 
                    color: isSelected ? '#ffde00' : (hasStock ? '#000' : '#666'),
                    boxShadow: isSelected ? 'inset 3px 3px 0px rgba(255,255,255,0.2)' : '4px 4px 0px #000', 
                    fontWeight: '900', 
                    cursor: hasStock ? 'pointer' : 'not-allowed',
                    transition: 'all 0.1s'
                  }}
                >
                  {item.talle}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '15px', 
          marginTop: '10px',
          borderTop: '4px solid #000',
          paddingTop: '20px'
        }}>
          <div style={{ fontSize: '2.2rem', fontWeight: '900', textAlign: 'center', color: '#000' }}>
            {precio}
          </div>
          <button 
            type="button"
            onClick={handleAñadir}
            disabled={!talleSeleccionado}
            style={{ 
              background: talleSeleccionado ? '#ffde00' : '#e0e0e0', 
              border: '4px solid #000', 
              boxShadow: talleSeleccionado ? '6px 6px 0px #000' : 'none', 
              padding: '15px', 
              fontSize: '1.2rem', 
              fontWeight: '900', 
              cursor: talleSeleccionado ? 'pointer' : 'not-allowed',
              textTransform: 'uppercase',
              width: '100%',
              color: '#000'
            }}
          >
            {talleSeleccionado ? 'AÑADIR AL CARRITO' : 'ELEGÍ UN TALLE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;