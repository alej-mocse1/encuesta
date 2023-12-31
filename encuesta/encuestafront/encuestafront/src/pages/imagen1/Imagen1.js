import React from "react";
import styles from './Imagen1.module.css'

import IMG1 from './assets/encuesta1.png';
import IMG2 from './assets/encuesta2.png';
import IMG3 from './assets/encuesta3.png';


import { Link } from "react-router-dom";


const Img1 = () => {


    return(
        <div className={styles.DivPadre}>
             <h2 className={styles.h2}>Paso #2: Observa estas imágenes</h2>
 
            <div className={styles.imagenes}>
                <img src={IMG1}></img>  
                <img src={IMG2}></img>  
                <img src={IMG3}></img>
            </div>

        <Link to='/preguntas' style={{textDecoration:'none'}}>
            <button className={styles.btn}>SIGUIENTE</button>
        </Link>
        </div>
    )
}



export default Img1