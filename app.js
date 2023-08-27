const express = require('express');
/*module.exports = app;*/


const app = express();
const port = 1000;

			

app.get('/', (req, res) => {
    res.send('Hola mundo'.objeto)
    //res.send('Hola mundo')

    const datos = {
        "id":"123456",
        "isCompleted":false,
         "description":"Walk the dog",
    }
    //const objeto = JSON.stringify(datos);
    //console.log(objeto.id);
    console.log(JSON.stringify(datos));
    
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
