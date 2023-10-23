const express = require('express');

// Crear el router que va a encapsular las rutas - Books
const router = express.Router();

const tareas =
[
     {
    "id":12,
    "estado":false,
     "description":"Walk the dog"
},
{
    "id":13,
    "estado":true,
    "description":"Walk the cat"
    
},
{
    "id":14,
    "estado":true,
    "description":"Walk the pes"
    
},

]
// crear
router.post('/:id,:estado,:description', (req, res) => {

    const id = req.params.id;
    const estado = req.params.estado;
    const description = req.params.description;

    let tarea = {
        "id": id,
        "descripcion": description,
        "estado": estado,

    }
    tareas.push(tarea);
    
    //res.status(200).send('Hola desde editar libro'+clientId+''+clientId2)
    res.status(200).send(tareas)
    
})

router.get('/', (req, res) => {
    res.status(200).send('Hola desde ruta para obtencion de libros')
})
//actualizar
router.put('/:id,:estado,:description', (req, res) => {
    const id = req.params.id;
    const estado = req.params.estado;
    const description = req.params.description;

    for (let i = 0; i < tareas.length; i++) {
        

        if (tareas[i].id == id) {
            tareas[i].estado = estado;
            tareas[i].description = description;
          
        
        }

    }

    res.status(200).send(tareas)
})
//eliminar
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    for (const key in tareas) {
        if (tareas[key].id == id) {
            //console.log('contacto ${carros[key].nombre} ${xxx[key].apellido} eliminado');
            console.log("eliminado " + tareas[key].description);

            tareas.splice(key, 1);
        }
        //carros.pop();
    }

    res.status(200).send(tareas)
})

module.exports = router; 
