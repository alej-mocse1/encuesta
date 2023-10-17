import React, { useState, useEffect } from "react";
import styles from './excel.module.css';
import * as XLSX from 'xlsx';
import axios from "axios";

const Excel = () => {
  const [EncuestaData, setEncuestaData] = useState([]);




  const excelGanadores = async () => {
    try {
      const response = await axios.get("https://encuesta-production-1a3c.up.railway.app/dataEncuesta");

      // Restablece el estado y los datos cargados
      setEncuestaData(response.data);
      console.log(response.data);

    } catch (error) {
      console.error("Error al subir los códigos:", error);
    }
  };


  const descargarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(EncuestaData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "EncuestaData");
    XLSX.writeFile(wb, "encuesta.xlsx");
  };




  return (
    <div className={styles.divAdmin}>

       <button onClick={excelGanadores}>Cargar excel</button>
       <button onClick={descargarExcel}>Descargar Excel</button>
                
    </div>
  );
};

export default Excel;