import { Route,Routes } from 'react-router-dom';
import React, { useState } from 'react';


import Formulario from './pages/form/form.js';
import Img1 from './pages/imagen1/Imagen1.js';
import Preguntas from './pages/preguntas1/Pregunta1.js';
import Img2 from './pages/imagen2/imagen2.js';
import Preguntas2 from './pages/preguntas2/Pregunta2.js';
import Gracias from './pages/gracias/gracias.js';


function App() {

  const [id, setID] = useState("");

  const idPerona = (param) => {
    setID(param)
  }

  return (
    <div >
      <Routes>
         <Route path="/" element={<Formulario  idPerona={idPerona}  id={id}/>} />  
         <Route path="/img1" element={<Img1 />} /> 
         <Route path="/preguntas" element={<Preguntas  id={id}/>} />  
         <Route path="/img2" element={<Img2 />} /> 
         <Route path="/preguntas2" element={<Preguntas2  id={id}/>} />  
         <Route path="/gracias" element={<Gracias/>} />  
      </Routes>  
    </div>
  );
}

export default App;
