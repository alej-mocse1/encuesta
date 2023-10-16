import React, { useState } from "react";
import styles from './form.module.css';
import axios from 'axios';
import {  useNavigate } from "react-router-dom";




const Formulario = ({idPerona,id}) => {
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        edad: '',
        tieneHijos: '',
        cantidadHijos: '',
        edadHijo1: '',
        profesion: ''
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };




    const handleEmpezarClick = async () => {
        const data = {
          hijos: formData.tieneHijos,
          cantidad: formData.cantidadHijos,
          profesion: formData.profesion,
          edad: formData.edad,
          edadHijo: formData.edadHijo1
        };
      
        try {
          // Hacer la petición POST utilizando Axios
          const response = await axios.post('https://encuesta-production-1a3c.up.railway.app/encuesta', data);
      
          // Manejar la respuesta del servidor si es necesario
          console.log('Respuesta del servidor:', response.data);
      
          // Llamada a la función idPerona
          console.log(id)
          idPerona(response.data.resp.id);
          navigate("/img1");
        } catch (error) {
          // Manejar errores de la petición
          console.error('Error al hacer la petición POST:', error);
        }

    }
      
      
      
      

    return(
        <div className={styles.form}>

            <h2 className={styles.h2}>¡Gracias por ayudarnos con nuestra encuesta!</h2>

            <h3 className={styles.h3}>Paso #1: Completa tus datos:</h3>


            <input 
                type="text" 
                className={styles.input} 
                placeholder="¿Cuál es tu edad?"
                name="edad"
                value={formData.edad}
                onChange={handleInputChange}
            ></input>


            <div className={styles.input3}>

               <input 
                    type="text" 
                    className={styles.input} 
                    placeholder="¿Tienes hijos?"
                    name="tieneHijos"
                    value={formData.tieneHijos}
                    onChange={handleInputChange}
                ></input>
                <input 
                    type="number" 
                    className={styles.input} 
                    placeholder="¿Cuantos?"
                    name="cantidadHijos"
                    value={formData.cantidadHijos}
                    onChange={handleInputChange}
                ></input>
                <input 
                    type="text" 
                    className={styles.input} 
                    placeholder="Edad hijo 1"
                    name="edadHijo1"
                    value={formData.edadHijo1}
                    onChange={handleInputChange}
                ></input>

            </div>

            <input 
                type="text" 
                className={styles.input} 
                placeholder="¿A qué te dedicas?"
                name="profesion"
                value={formData.profesion}
                onChange={handleInputChange}
            ></input>



   <button className={styles.btn} onClick={handleEmpezarClick}>EMPEZAR</button>
        </div>
    )
}



export default Formulario