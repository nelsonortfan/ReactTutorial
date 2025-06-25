import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() 
{
  const [datos, setDatos] = useState(null);
  const [nuevaImagen, setNuevaImagen] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/users/Pedro/details') // Ajusta la URL a tu endpoint
      .then(response => setDatos(response.data))
      .catch(error => console.error('Error al obtener datos:', error));
  }, []);

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

    axios.put('http://localhost:8080/api/users/api/usuario/imagen', {
      nombre: datos.name,
      imagenBase64: nuevaImagen
    })
    .then(() => alert('Imagen actualizada correctamente'))
    .catch(err => console.error('Error al actualizar imagen:', err));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      {datos ? (
        <>
          <h1>{datos.name}</h1>
          <img
            src={`data:image/jpeg;base64,${datos.pictureBase64}`}
            alt="Imagen del usuario"
            style={{ width: '300px', borderRadius: '8px' }}
          />
          <div style={{ marginTop: '1rem' }}>
            <input type="file" accept="image/*" onChange={handleImagenChange} />
            <button onClick={actualizarImagen} style={{ marginLeft: '1rem' }}>
              Actualizar imagen
            </button>
          </div>
        </>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default App;
