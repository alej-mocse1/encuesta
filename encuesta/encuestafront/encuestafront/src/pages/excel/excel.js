import React, { useState } from "react";
import styles from "./excel.module.css";
import * as XLSX from "xlsx";

const Excel = () => {
  const [encuestaData, setEncuestaData] = useState([]);
  const [ganadores, setGanadores] = useState({});

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
    const cadenas = [
      "PLAZA VEA",
      "WONG",
      "METRO",
      "TOTTUS",
      "MAKRO",
      "OXXO",
      "TAMBO",
      "VIVANDA",
      "OTRO AASS",
    ];
    const ganadores = {};
    const ganadoresIds = new Set();

    cadenas.forEach((cadena) => {
      const participantes = data.filter(
        (participante) =>
          participante.cadena === cadena &&
          !ganadoresIds.has(participante.super)
      );
      if (participantes.length > 0) {
        const ganadorIndex = Math.floor(Math.random() * participantes.length);
        const ganador = participantes[ganadorIndex];
        ganadores[cadena] = ganador;
        ganadoresIds.add(ganador.id);
      }
    });

    return ganadores;
  };

  const descargarExcel = () => {
    const ganadoresPorSupermercado = {};

    encuestaData.forEach((ganador) => {
      const supermercado = ganador.super;
      if (!ganadoresPorSupermercado[supermercado]) {
        ganadoresPorSupermercado[supermercado] = [];
      }
      ganadoresPorSupermercado[supermercado].push(ganador);
    });

    // Seleccionar un ganador al azar de cada supermercado y guardarlos en un array
    const ganadoresFinales = [];
    Object.values(ganadoresPorSupermercado).forEach((ganadoresSupermercado) => {
      const ganadorIndex = Math.floor(
        Math.random() * ganadoresSupermercado.length
      );
      ganadoresFinales.push(ganadoresSupermercado[ganadorIndex]);
    });

    // Imprimir los ganadores finales
    console.log(ganadoresFinales);

    console.log("ganadores", ganadores);
    console.log("ganadoresFinales", ganadoresFinales);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(ganadoresFinales);
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
      {Object.keys(ganadores).length > 0 && (
        <div>
          <h2>Ganadores</h2>
          <ul>
            {Object.entries(ganadores).map(([cadena, ganador]) => (
              <li key={cadena}>
                {cadena}: {ganador.nombre} (ID: {ganador.id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Excel;
