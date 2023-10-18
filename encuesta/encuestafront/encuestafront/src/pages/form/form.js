import React, { useState } from "react";
import styles from "./form.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Formulario = ({ idPerona, id }) => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState(false);
  const [formData, setFormData] = useState({
    edad: "",
    tieneHijos: "",
    cantidadHijos: "",
    edadHijo1: "",
    edadHijo2: "",
    edadHijo3: "",
    edadHijo4: "",
    edadHijo5: "",
    edadHijo6: "",
    edadHijo7: "",
    edadHijo8: "",
    edadHijo9: "",
    edadHijo10: "",
    profesion: "",
  });

  
 const verificarInputHijos = () => {
  const cantidadDeHijos = parseInt(formData.cantidadHijos);

  for (let i = 1; i <= cantidadDeHijos; i++) {
    const name = `edadHijo${i}`;
    if (formData[name] === "") {

      return false;
    }
    console.log(formData[name]);
  }

  return true;

}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmpezarClick = async () => {
    setAlert(true)
    const data = {
      hijos: formData.tieneHijos,
      cantidad: formData.cantidadHijos,
      profesion: formData.profesion,
      edad: formData.edad,
      edadHijo: formData.edadHijo1,
      edadHijo2: formData.edadHijo2,
      edadHijo3: formData.edadHijo3,
      edadHijo4: formData.edadHijo4,
      edadHijo5: formData.edadHijo5,
      edadHijo6: formData.edadHijo6,
      edadHijo7: formData.edadHijo7,
      edadHijo8: formData.edadHijo8,
      edadHijo9: formData.edadHijo9,
      edadHijo10: formData.edadHijo10,
    };
 

    try {

       if( formData.edad  &&   formData.tieneHijos   && formData.profesion ){
        if(formData.tieneHijos == "si"){
          const validarCamposHijos = verificarInputHijos()
         
          if(validarCamposHijos ==!  false){
            const response = await axios.post(
              "https://encuesta-production-1a3c.up.railway.app/encuesta",
              data
            );      
            setAlert(false)
            idPerona(response.data.resp.id);
            navigate("/img1");
          } 

        }

        if(formData.tieneHijos == "no"){
     
            const response = await axios.post(
              "https://encuesta-production-1a3c.up.railway.app/encuesta",
              data
            );      
            setAlert(false)
            idPerona(response.data.resp.id);
            navigate("/img1");
          } 

        }
      
     }catch (error) {
      // Manejar errores de la petición
      console.error("Error al hacer la petición POST:", error);
    }
  };

  const handleInputNumber= (e) => {
  
    const inputValue = e.target.value;
    const { name } = e.target;

    // Verifica si el valor es numérico
    if (!isNaN(inputValue)) {
      // Actualiza el estado solo si es un valor numérico
   
      setFormData({
          ...formData ,
          [name]: inputValue,
        });  
    
    }
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.h2}>
        ¡Gracias por ayudarnos con nuestra encuesta!
      </h2>

      <h3 className={styles.h3}>Paso #1: Completa tus datos:</h3>

      {alert && <h4 className={styles.h4}>Por favor: completa los datos</h4>}

      <input
        type="text"
        className={styles.input}
        placeholder="¿Cuál es tu edad?"
        name="edad"
        value={formData.edad}
        onChange={handleInputNumber}
        style={{ border: (formData.edad === "" &&  alert == true) ? '2px solid red' : '2px solid black' , marginBottom: "10px" }}
      ></input>

      <div className={styles.input3}>
        <select
          name="tieneHijos"
          value={formData.tieneHijos}
          onChange={handleInputChange}
          style={{ border: (formData.tieneHijos === "" &&  alert == true) ? '2px solid red' : '2px solid black'  }}
        >
          <option className={styles.op} value="¿Tienes hijos?">
            ¿Tienes hijos?
          </option>
          <option className={styles.op} value="si">
            Sí
          </option>
          <option className={styles.op} value="no">
            No
          </option>
        </select>

        { formData.tieneHijos == "si"&& (
          <input
          type="text"
          className={styles.input}
          placeholder="¿Cuantos?"
          name="cantidadHijos"
          value={formData.cantidadHijos}
          onChange={handleInputNumber}
          style={{ border: (formData.cantidadHijos === "" &&  alert == true) ? '2px solid red' : '2px solid black'  }}
        ></input>
        )}

        {parseInt(formData.cantidadHijos) > 0 && (
          <input
            type="text"
            className={styles.input}
            placeholder="Edad hijo 1"
            name="edadHijo1"
            value={formData.edadHijo1}
            onChange={handleInputNumber}
            style={{ border: (formData.edadHijo1 === "" &&  alert == true) ? '2px solid red' : '2px solid black'}}
          ></input>
        )}
      </div>

      <div className={styles.input3}>
        {parseInt(formData.cantidadHijos) > 1 && (
        
          <input
            type="text"
            className={styles.input}
            placeholder="Edad hijo 2"
            name="edadHijo2"
            value={formData.edadHijo2}
            onChange={handleInputNumber}
            style={{ border: (formData.edadHijo2 === "" &&  alert == true) ? '2px solid red' : '2px solid black'}}
          ></input>
        
          
        )}

        {parseInt(formData.cantidadHijos) > 2 && (
          <input
            type="text"
            className={styles.input}
            placeholder="Edad hijo 3"
            name="edadHijo3"
            value={formData.edadHijo3}
            onChange={handleInputNumber} 
            style={{ border: (formData.edadHijo3 === "" &&  alert == true) ? '2px solid red' : '2px solid black'}}
          ></input>
        )}

        {parseInt(formData.cantidadHijos) > 3 && (
          <input
            type="text"
            className={styles.input}
            placeholder="Edad hijo 4"
            name="edadHijo4"
            value={formData.edadHijo4}
            onChange={handleInputNumber}
            style={{ border: (formData.edadHijo4 === "" &&  alert == true) ? '2px solid red' : '2px solid black'}}
          ></input>
        )}

      </div>

      <div className={styles.input3}>
        {parseInt(formData.cantidadHijos) > 4 && (
          <input
            type="text"
            className={styles.input}
            placeholder="Edad hijo 5"
            name="edadHijo5"
            value={formData.edadHijo5}
            onChange={handleInputNumber}
            style={{ border: (formData.edadHijo5 === "" &&  alert == true) ? '2px solid red' : '2px solid black'}}
          ></input>
        )}

        {parseInt(formData.cantidadHijos) > 5 && (
          <input
            type="text"
            className={styles.input}
            placeholder="Edad hijo 6"
            name="edadHijo6"
            value={formData.edadHijo6}
            onChange={handleInputNumber}
            style={{ border: (formData.edadHijo6 === "" &&  alert == true) ? '2px solid red' : '2px solid black'}}
          ></input>
        )}

        {parseInt(formData.cantidadHijos) > 6 && (
          <input
            type="text"
            className={styles.input}
            placeholder="Edad hijo 7"
            name="edadHijo7"
            value={formData.edadHijo7}
            onChange={handleInputNumber}
            style={{ border: (formData.edadHijo7 === "" &&  alert == true) ? '2px solid red' : '2px solid black'}}
          ></input>
        )}
      </div>

      <div className={styles.input3} style={{ marginBottom: "10px" }}>
        {parseInt(formData.cantidadHijos) > 7 && (
          <input
            type="text"
            className={styles.input}
            placeholder="Edad hijo 8"
            name="edadHijo8"
            value={formData.edadHijo8}
            onChange={handleInputNumber}
            style={{ border: (formData.edadHijo8 === "" &&  alert == true) ? '2px solid red' : '2px solid black'}}
          ></input>
        )}

        {parseInt(formData.cantidadHijos) > 8 && (
          <input
            type="text"
            className={styles.input}
            placeholder="Edad hijo 9"
            name="edadHijo9"
            value={formData.edadHijo9}
            onChange={handleInputNumber}
            style={{ border: (formData.edadHijo9 === "" &&  alert == true) ? '2px solid red' : '2px solid black'}}
          ></input>
        )}
        {parseInt(formData.cantidadHijos) > 9 && (
          <input
            type="text"
            className={styles.input}
            placeholder="Edad hijo 10"
            name="edadHijo10"
            value={formData.edadHijo10}
            onChange={handleInputNumber}
            style={{ border: (formData.edadHijo10 === "" &&  alert == true) ? '2px solid red' : '2px solid black'}}
          ></input>
        )}
      </div>

      <input
        type="text"
        className={styles.input}
        placeholder="¿A qué te dedicas?"
        name="profesion"
        value={formData.profesion}
        onChange={handleInputChange}
        style={{ border: (formData.profesion === "" &&  alert == true) ? '2px solid red' : '2px solid black'}}
      ></input>

      <button className={styles.btn} onClick={handleEmpezarClick}>
        EMPEZAR
      </button>
    </div>
  );
};

export default Formulario;
