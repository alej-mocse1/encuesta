const express = require('express');
const { Users } = require('../db.js');


const router = express.Router();




router.post('/encuesta', async(req, res) => {
    try {
      // Acceder a los datos del cuerpo de la solicitud
      const  codesBody = req.body;

      const respuesta = await Users.create(codesBody);

      res.status(201).json({ message: 'Código guardado con éxito', resp: respuesta });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Hubo un error en el servidor  ee ');
    }
});  


  
router.put('/preguntas', async(req, res) => {
  
  try {
    const {
      pregunta1,
      pregunta2,
      pregunta3,
      pregunta4,
      pregunta5,
      pregunta6, 
      pregunta7,
      pregunta8,
      pregunta9,
      pregunta10,
      id
    } = req.body;

 

    const participante = await Users.findOne({
      where: { id }
    });


    const updatedFields = {
      pregunta1,
      pregunta2,
      pregunta3,
      pregunta4,
      pregunta5,
      pregunta6,
      pregunta7,
      pregunta8,
      pregunta9,
      pregunta10
    };


    const preguntasActualizadas = {};
    Object.entries(updatedFields).forEach(([key, value]) => {
      if (value !== undefined) {
        preguntasActualizadas[key] = value;
      }
    });

    console.log(preguntasActualizadas)

     await participante.update(preguntasActualizadas);
  
  
    res.status(200).send(participante)
  } catch (error) {
    // console.error('Error:', error);
    res.status(500).send(error);
  }
});



router.get('/dataEncuesta', async(req, res) => {
  try {
     const participantes = await Users.findAll();  

     res.status(200).send(participantes)
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Hubo un error en el servidor');
  }
});


// router.delete('/dataEncuesta', async(req, res) => {
//   try {
//     await Users.destroy({
//       where: {},
//       truncate: true
//     });

//     res.status(200).send('Todos los datos han sido eliminados correctamente.');
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Hubo un error en el servidor');
//   }
// });





  module.exports = router