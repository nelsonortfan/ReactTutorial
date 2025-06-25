import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() 
{
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/users/Pedro/details') // Ajusta la URL a tu endpoint
      .then(response => setDatos(response.data))
      .catch(error => console.error('Error al obtener datos:', error));
  }, []);

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
        </>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default App;
