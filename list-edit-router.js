const express = require('express');

// Crear el router que va a encapsular las rutas - Books
const router = express.Router();

const DB=require('./DB')

router.use(express.json())
router.use((req, res, next) => {
    if (req.method != "GET" && req.method != "POST" && req.method != "DELETE" && req.method != "PUT") {


        return res.status(400).send("Invalid http request method");

    }

    next();
});


const validateBodyParams = (req, res, next) => {


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
        if (req.method === 'PUT' && (!req.body.id || !req.body.description || !req.body.estado)) {
            // Solicitudes PUT con información no válida o atributos faltantes
            return res.status(400).json({ error: 'Información no válida o atributos faltantes para actualizar tareas' });
        }

    }


    next();

};

function Tareas2(id, estado, description) {
    this.id = id;
    this.estado = estado;
    this.description = description;


}

// crear asi se pone postman http://localhost:1000/orders/14,false,jaja
//router.post('/:id,:estado,:description',validateBodyParams, (req, res) => {
router.post('/', validateBodyParams, (req, res) => {


    const id = req.body.id;
    const estado = req.body.estado;
    const description = req.body.description;


    let tarea = {
        "id": id,
        "descripcion": description,
        "estado": estado,

    }
    DB.push(tarea);

    //res.status(200).send(tareas)
    res.json(DB)

})

//var  ta=[];
//obtener tareas

router.get('/', (req, res) => {

    var ta = [];


    for (let i = 0; i < DB.length; i++) {
        //console.log(tareas[i]);

        
        var tareabuscada = new Tareas2(DB[i].id, DB[i].estado,DB[i].description);
        ta.push(tareabuscada);


    }


        res.json(ta)

   

})



router.get('/:id', (req, res) => {

    var ta = [];

    const id = req.params.id;

    for (let i = 0; i < DB.length; i++) {
        //console.log(tareas[i]);

        if (DB[i].id == id) {


            var tareabuscada = new Tareas2(DB[i].id, DB[i].estado,DB[i].description);
            ta.push(tareabuscada);

        }



    }

    if (ta.length == 0) {

        res.json("no existe")

    } else {

        res.json(ta)

    }

})
//actualizar
router.put('/', validateBodyParams, (req, res) => {

    const id = req.body.id
    const estado = req.body.estado;
    const description = req.body.description;

    /*const estado = req.params.estado;
    const description = req.params.description;
     */
    for (let i = 0; i < DB.length; i++) {


        if (DB[i].id == id) {
            DB[i].estado = estado;
            DB[i].description = description;


        }


    }

    //res.status(200).send(tareas)
    res.json(DB)
})
//eliminar
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    for (const key in DB) {
        if (DB[key].id == id) {
            //console.log('contacto ${carros[key].nombre} ${xxx[key].apellido} eliminado');
            console.log("eliminado " + DB[key].description);

            DB.splice(key, 1);
        }
        //carros.pop();
    }

    //res.status(200).send(tareas)
    res.json(DB)

})

module.exports = router; 
