import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Spinner.css'

function App() 
{
  const [datos, setDatos] = useState(null);
  const [nuevaImagen, setNuevaImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagenActualizada, setImagenActualizada] = useState(false);



  useEffect(() => {
    axios.get('http://localhost:8080/api/users/Pedro/details') // Ajusta la URL a tu endpoint
      .then(response => setDatos(response.data))
      .catch(error => console.error('Error al obtener datos:', error));
  }, [imagenActualizada]);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNuevaImagen(reader.result.split(',')[1]); // solo el base64
    };
    if (file) reader.readAsDataURL(file);
  };

  const actualizarImagen = () => {
    if (!nuevaImagen) return;

    setLoading(true);
    axios.put('http://localhost:8080/api/users/api/usuario/imagen', {
      nombre: datos.name,
      imagenBase64: nuevaImagen
    })

    .then(() => {
      setTimeout(() => {
        setLoading(false);
        if (window.confirm('Imagen actualizada correctamente. ¿Deseas verla ahora?')) {
          setImagenActualizada(prev => !prev); // fuerza recarga de datos
        }
      }, 1000); // simula tiempo de carga
    })
    .catch(err => {
      setLoading(false);
      console.error('Error al actualizar imagen:', err);
    });


  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      {datos ? (
        <>
          <h1>{datos.name}</h1>
          <img
            src={`data:image/jpeg;base64,${datos.pictureBase64}`}
            alt="Imagen actual"
            style={{ width: '300px', borderRadius: '8px' }}
          />

          <div style={{ marginTop: '1rem' }}>
            <input type="file" accept="image/*" onChange={handleImagenChange} disabled={loading} />
            <button onClick={actualizarImagen} disabled={loading} style={{ marginLeft: '1rem' }}>
              Actualizar imagen
            </button>
          </div>
          {loading && <div className="spinner"></div>}
        
        </>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default App;
