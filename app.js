const express = require('express');
const booksRouter = require('./list-view-router')
const ordersRouter = require('./list-edit-router')

/*module.exports = app;*/


const app = express();
const port = 1000;

app.use('/books', booksRouter)
app.use('/orders', ordersRouter)
			


app.get('/', (req, res) => {
    res.send('Hola mundo')
    //res.send('Hola mundo')

    const tareas =[ {
        "id":"123456",
        "isCompleted":false,
         "description":"Walk the dog"
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
