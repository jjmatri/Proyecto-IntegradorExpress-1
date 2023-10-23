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




function Tareas2(id,estado,description){
    this.id=id;
    this.estado=estado;
    this.description=description;


}

// ruta raiz - tipo post - modulo libros
router.post('/', (req, res) => {
    res.status(200).send('Hola desde ruta para creacion de libros')
})
var  ta=[];
var  ta2=[];

router.get('/', (req, res) => {

    for (let i = 0; i < tareas.length; i++) {
        //console.log(tareas[i]);

        if (tareas[i].id == tareas[i].id && tareas[i].estado == true ) {
            
           
            var myFather = new Tareas2(tareas[i].id,tareas[i].estado,tareas[i].description);
            ta.push(myFather);
        } 
          
     
        
    }
    res.status(200).send(ta)
    
})
/*en postman se pone asi http://localhost:1000/books/9,10
router.get('/:id,:id2', (req, res) => {
    const clientId = req.params.id;
    const clientId2 = req.params.id2;
    
    res.status(200).send('Hola de un unico libros'+clientId+''+clientId2)
})*/

router.get('/:id', (req, res) => {
    for (let i = 0; i < tareas.length; i++) {
        //console.log(tareas[i]);

        if (tareas[i].id == tareas[i].id && tareas[i].estado == false) {
            
           
            var myFather = new Tareas2(tareas[i].id,tareas[i].estado,tareas[i].description);
            ta2.push(myFather);
        } 
          
     
        
    }
    res.status(200).send(ta2)
    })
router.put('/', (req, res) => {
    res.status(200).send('Hola desde ruta para edicion de libros')
})

router.delete('/', (req, res) => {
    res.status(200).send('Hola desde ruta para eliminacion de libros')
})

module.exports = router; 
