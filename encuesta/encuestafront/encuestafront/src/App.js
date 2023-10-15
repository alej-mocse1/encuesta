import { Route,Routes } from 'react-router-dom';


import Formulario from './pages/form/form.js';
import Img1 from './pages/imagen1/Imagen1.js'


function App() {
  return (
    <div >
      <Routes>
         <Route path="/" element={<Formulario />} />  
         <Route path="/img1" element={<Img1 />} />  
      </Routes>  
    </div>
  );
}

export default App;
