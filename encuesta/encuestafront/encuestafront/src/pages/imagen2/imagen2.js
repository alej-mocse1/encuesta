import React from "react";
import styles from './imagen2.module.css'

import IMG1 from './assets/encuesta1.png';
import IMG2 from './assets/encuesta2.png';
import IMG3 from './assets/encuesta3.png';


import { Link } from "react-router-dom";


const Img2 = () => {


    return(
        <div className={styles.DivPadre}>
             <h2 className={styles.h2}>Paso #4: Observa estas imágenes</h2>
 
            <div className={styles.imagenes}>
                <img src={IMG1}></img>  
                <img src={IMG2}></img>  
                <img src={IMG3}></img>
            </div>

        <Link to='/preguntas2' style={{textDecoration:'none'}}>
            <button className={styles.btn}>SIGUIENTE</button>
        </Link>
        </div>
    )
}



export default Img2