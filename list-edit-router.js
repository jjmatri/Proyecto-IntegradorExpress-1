const express = require('express');

// Crear el router que va a encapsular las rutas - Books
const router = express.Router();

router.use(express.json())
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
router.use( (req,res,next) => {
    if(req.method!="GET" &&  req.method!="POST" && req.method!="DELETE" && req.method!="PUT" ){
  
   
   return res.status(400).send("Invalid http request method");
  
  }

  next();
  });
  
  
  const validateBodyParams= (req,res,next)=> {

        
    if (req.method == 'POST' || req.method === 'PUT') {
        console.log(3)
        const id = req.params.id;
        const estado = req.params.estado;
        const description = req.params.description;
        
        if (!req.body || Object.keys(req.body).length === 0) {
            
            return res.status(400).json({ error: 'Cuerpo de solicitud vacío' });
          }

          
              if (req.method === 'POST' && (!req.body.id || !req.body.description || !req.body.estado)) {
      // Solicitudes PUT con información no válida o atributos faltantes
      return res.status(400).json({ error: 'Información no válida o atributos faltantes para actualizar tareas' });
    }
    if (req.method === 'PUT' && (!req.body.id || !req.body.description || !req.body.estado )) {
        // Solicitudes PUT con información no válida o atributos faltantes
        return res.status(400).json({ error: 'Información no válida o atributos faltantes para actualizar tareas' });
      }     
     
    }  


    next();
      
    };
  
 // crear asi se pone postman http://localhost:1000/orders/14,false,jaja
//router.post('/:id,:estado,:description',validateBodyParams, (req, res) => {
    router.post('/',validateBodyParams, (req, res) => {

      
    const id = req.body.id;
    const estado = req.body.estado;
    const description = req.body.description;


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
router.put('/',validateBodyParams, (req, res) => {
    
    const id = req.body.id
    const estado = req.body.estado;
    const description = req.body.description;

    /*const estado = req.params.estado;
    const description = req.params.description;
     */
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
