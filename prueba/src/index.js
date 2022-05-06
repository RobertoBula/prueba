import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Formulario from './Formulario';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='contenedor'>
    <Formulario />
    </div>
  </React.StrictMode>
);
