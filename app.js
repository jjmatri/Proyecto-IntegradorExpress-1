const express = require('express');
/*module.exports = app;*/


const app = express();
const port = 1000;

			

app.get('/', (req, res) => {
    res.send('Hola mundo')
    //res.send('Hola mundo')

    const tareas =[ {
        "id":"123456",
        "isCompleted":false,
         "description":"Walk the dog",
    },
    {
        "id":"1234",
        "isCompleted":true,
        "description":"Walk the cat"
        
    }]
    //const objeto = JSON.stringify(datos);
    //console.log(objeto.id);
    console.log(JSON.stringify(tareas));
   
    
}) 


app.listen(port, () => {
    console.log(`Example ap listening on port ${port}`)
})
