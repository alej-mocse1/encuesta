import React, { useState } from "react";
import styles from "./excel.module.css";
import * as XLSX from "xlsx";

const Excel = () => {
  const [encuestaData, setEncuestaData] = useState([]);
  const [ganadores, setGanadores] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setEncuestaData(jsonData);

        // Procesar datos y seleccionar ganadores
        const ganadoresSeleccionados = seleccionarGanadores(jsonData);
        setGanadores(ganadoresSeleccionados);
        console.log(ganadoresSeleccionados);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const seleccionarGanadores = (data) => {
    const supermercados = [...new Set(data.map(item => item.supermercado))];
    const ganadoresSeleccionados = [];
    const participantesPorSupermercado = {};

    // Inicializar el diccionario de participantes por supermercado
    supermercados.forEach(supermercado => {
      participantesPorSupermercado[supermercado] = data.filter(
        item => item.supermercado === supermercado
      );
    });

    let totalGanadores = 0;
    let indexSupermercado = 0;

    while (totalGanadores < 14) {
      const supermercadoActual = supermercados[indexSupermercado];
      const participantes = participantesPorSupermercado[supermercadoActual];

      if (participantes.length > 0) {
        const ganadorIndex = Math.floor(Math.random() * participantes.length);
        const ganador = participantes.splice(ganadorIndex, 1)[0];
        ganadoresSeleccionados.push(ganador);
        totalGanadores++;
      }

      // Pasar al siguiente supermercado
      indexSupermercado = (indexSupermercado + 1) % supermercados.length;
    }

    return ganadoresSeleccionados;
  };

  const descargarExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(ganadores);
    XLSX.utils.book_append_sheet(wb, ws, "Ganadores");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    const fileName = "ganadores.xlsx";
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  return (
    <div className={styles.divAdmin}>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button onClick={descargarExcel}>Descargar Excel</button>
      {ganadores.length > 0 && (
        <div>
          <h2>Ganadores</h2>
          <ul>
            {ganadores.map((ganador, index) => (
              <li key={index}>
                {ganador.supermercado}: {ganador.nombre} (ID: {ganador.id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Excel;
