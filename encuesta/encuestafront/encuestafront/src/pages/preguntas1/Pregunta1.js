import React, { useState } from "react";
import styles from './preguntas.module.css';
import {  useNavigate } from "react-router-dom";
import axios from "axios";


const Preguntas = ({id}) => {


    const navigate = useNavigate();


    const [respuestas, setRespuestas] = useState({
        pregunta1: '',
        pregunta2: '',
        pregunta3: '',
        pregunta4: '',
        pregunta5: ''
      });
    
      const handleInputChange = (e, pregunta) => {
        const { value } = e.target;
        setRespuestas(prevRespuestas => ({
          ...prevRespuestas,
          [pregunta]: value
        }));
      };


      
    const handleclickData= async () => {

        const data = {
                ...respuestas,
                id:id
          };

        try {
            // Hacer la petición POST utilizando Axios
            const response = await axios.put('https://encuesta-production-1a3c.up.railway.app/preguntas', data);
        
            // Manejar la respuesta del servidor si es necesario
            console.log('Respuesta del servidor:', response.data);
        
            // Llamada a la función idPerona
           
            navigate("/img2");
          } catch (error) {
            // Manejar errores de la petición
            console.error('Error al hacer la petición POST:', error);
          }
    }

    return(
        <div className={styles.DivPadre}>
           <h2>Paso #3: Responde las siguientes preguntas</h2>
      

      <div className={styles.DivInputs}>
     <input
        type="text"
        className={styles.input1}
        placeholder="¿Qué sentiste con lo que te acaba de mostrar Pomarola?"
        value={respuestas.pregunta1}
        onChange={(e) => handleInputChange(e, 'pregunta1')}
      />
      <input
        type="text"
        className={styles.input2}
        placeholder="¿Qué te quiere decir Pomarola?"
        value={respuestas.pregunta2}
        onChange={(e) => handleInputChange(e, 'pregunta2')}
      />
      <input
        type="text"
        className={styles.input3}
        placeholder="¿Qué te parece eso que te dijo? ¿Y por qué?"
        value={respuestas.pregunta3}
        onChange={(e) => handleInputChange(e, 'pregunta3')}
      />
      <input
        type="text"
        className={styles.input4}
        placeholder="¿Si fueras dueña de esta marca, publicarías esto en redes sociales? ¿por qué?"
        value={respuestas.pregunta4}
        onChange={(e) => handleInputChange(e, 'pregunta4')}
      />
      <input
        type="text"
        className={styles.input5}
        placeholder={`¿Qué sentiste con la frase "Estamos bien del tomate"?`}
        value={respuestas.pregunta5}
        onChange={(e) => handleInputChange(e, 'pregunta5')}
      />
</div>



       <button  onClick={handleclickData} className={styles.btn}>SIGUIENTE</button>
        </div>
    )
}



export default Preguntas