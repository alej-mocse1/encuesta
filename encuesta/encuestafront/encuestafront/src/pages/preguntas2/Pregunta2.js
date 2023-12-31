import React, { useState } from "react";
import styles from './preguntas2.module.css';
import {  useNavigate } from "react-router-dom";
import axios from "axios";


const Preguntas2 = ({id}) => {


    const navigate = useNavigate();

    const [alert, setAlert] = useState(false);
    const [respuestas, setRespuestas] = useState({
        pregunta6: '',
        pregunta7: '',
        pregunta8: '',
        pregunta9: '',
        pregunta10: ''
      });
    
      const handleInputChange = (e, pregunta) => {
        const { value } = e.target;
        setRespuestas(prevRespuestas => ({
          ...prevRespuestas,
          [pregunta]: value
        }));
      };


      
    const handleclickData= async () => {
         setAlert(true)
        const data = {
                ...respuestas,
                id:id
          };

        try {
            // Hacer la petición POST utilizando Axios
            if(respuestas.pregunta6 && respuestas.pregunta7 && respuestas.pregunta8 && respuestas.pregunta9 && respuestas.pregunta10  ){
              const response = await axios.put('https://encuesta-production-1a3c.up.railway.app/preguntas', data);
        
              // Manejar la respuesta del servidor si es necesario
              console.log('Respuesta del servidor:', response.data);
          
              // Llamada a la función idPerona
              setAlert(true)
              navigate("/gracias");
            }

          } catch (error) {
            // Manejar errores de la petición
            console.error('Error al hacer la petición POST:', error);
          }
      
    }

    return(
        <div className={styles.DivPadre}>
           <h2>Paso #5: Responde las siguientes preguntas</h2>
           {alert && <h4 className={styles.h4}>Por favor: completa los datos</h4>}

           <div className={styles.DivInputs}>
     <input
        type="text"
        className={styles.input1}
        placeholder="¿Qué sentiste con lo que te acaba de mostrar Pomarola?"
        value={respuestas.pregunta6}
        onChange={(e) => handleInputChange(e, 'pregunta6')}
        style={{ border: (respuestas.pregunta6 === "" &&  alert == true) ? '2px solid red' : '2px solid black'  }}
      />
      <input
        type="text"
        className={styles.input2}
        placeholder="¿Qué te quiere decir Pomarola?"
        value={respuestas.pregunta7}
        onChange={(e) => handleInputChange(e, 'pregunta7')}
        style={{ border: (respuestas.pregunta7 === "" &&  alert == true) ? '2px solid red' : '2px solid black'  }}
      />
      <input
        type="text"
        className={styles.input3}
        placeholder="¿Qué te parece eso que te dijo? ¿Y por qué?"
        value={respuestas.pregunta8}
        onChange={(e) => handleInputChange(e, 'pregunta8')}
        style={{ border: (respuestas.pregunta8 === "" &&  alert == true) ? '2px solid red' : '2px solid black'  }}
      />
      <input
        type="text"
        className={styles.input4}
        placeholder="¿Si fueras dueña de esta marca, publicarías esto en rr.ss? ¿por qué?"
        value={respuestas.pregunta9}
        onChange={(e) => handleInputChange(e, 'pregunta9')}
        style={{ border: (respuestas.pregunta9 === "" &&  alert == true) ? '2px solid red' : '2px solid black'  }}
      />
      <input
        type="text"
        className={styles.input5}
        placeholder={`¿Qué sentiste con la frase "Estamos bien del tomate"?`}
        value={respuestas.pregunta10}
        onChange={(e) => handleInputChange(e, 'pregunta10')}
        style={{ border: (respuestas.pregunta10 === "" &&  alert == true) ? '2px solid red' : '2px solid black'  }}
      />

</div>


       <button  onClick={handleclickData} className={styles.btn}>SIGUIENTE</button>
        </div>
    )
}



export default Preguntas2