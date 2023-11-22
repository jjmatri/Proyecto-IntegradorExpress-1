const express = require('express');

const DB=require('./DB')
// Crear el router que va a encapsular las rutas - Books
const router = express.Router();

function middError(err,req, res, next) {
 console.log(err)
  res.status(500).send('hay error')
    next()
}


/*router.use((err, req, res, next) =>{
    console.log(err)
    res.status(500).send('Something broke!');
  });
*/

function Tareas2(id,estado,description){
    this.id=id;
    this.estado=estado;
    this.description=description;


}

// ruta raiz - tipo post - modulo libros
router.post('/',middError, (req, res) => {
    res.status(200).send('Hola desde ruta para creacion de libros')
})
var  ta=[];
var  ta2=[];

//tareas completas 
router.get('/',middError, (req, res) => {

    const estado = req.body.estado;
    
    for (let i = 0; i < DB.length; i++) {
        //console.log(tareas[i]);

        if (DB[i].id == DB[i].id && DB[i].estado == estado ) {
            
           
            var mytarea = new Tareas2(DB[i].id,DB[i].estado,DB[i].description);
            ta.push(mytarea);
        } 
          
     
        
    }
    res.json(ta)    
})
/*en postman se pone asi http://localhost:1000/books/9,10
router.get('/:id,:id2', (req, res) => {
    const clientId = req.params.id;
    const clientId2 = req.params.id2;
    
    res.status(200).send('Hola de un unico libros'+clientId+''+clientId2)
})*/


//tareas  incompletas
router.get('/:estado',middError, (req, res) => {

    const estado = req.body.estado;
    
    for (let i = 0; i < DB.length; i++) {
        //console.log(tareas[i]);
        
    
        if (DB[i].id == DB[i].id && DB[i].estado == estado ) {
            
           
            var myFather = new Tareas2(DB[i].id,DB[i].estado,DB[i].description);
            ta2.push(myFather);
        } 
          
     
        
    }
    res.json(ta2)
    })
router.put('/', (req, res) => {
    res.status(200).send('Hola desde ruta para edicion de libros')
})

router.delete('/', (req, res) => {
    res.status(200).send('Hola desde ruta para eliminacion de libros')
})

module.exports = router; 
