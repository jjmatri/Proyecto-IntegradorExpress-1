const express = require('express');
const { midd} = require('./middlewares')


const booksRouter = require('./list-view-router')
const ordersRouter = require('./list-edit-router')

require('dotenv').config();


const jwt = require('jsonwebtoken');


const PORT = process.env.PORT;
const LLAVE_SECRETA = process.env.LLAVE_SECRETA;



const app = express();
const port = 1000;

app.use(express.json())


app.use('/completed-tasks', booksRouter)
app.use('/tasks', ordersRouter)
app.use(midd)
			
//DataBase Simulation
const userDb = [{ userName: 'user123',password: 'elMasGuapoDelMundo', rol: "admin"},
                {userName: 'user456',password: 'jaja', rol: "user"
}]

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    /**
     * 1. Token exista
     * 2. Token sea valido
     */

    if(!token) {
        res.status(401).send('Debes porporcionar un token')
    }

   /* try {
        const tokenDecrypted = jwt.verify(token, LLAVE_SECRETA)
        req.data = tokenDecrypted;
        next();
    } catch (error) {
        res.status(401).send('No autorizado: debes proveer un token valido')
    }
     */
         console.log(token);
         console.log(LLAVE_SECRETA);
            // Verificar el token
    jwt.verify(token, 'secret key', (err, decoded) => {
        /*if (err) {
            return res.status(403).json({ error: 'Token verification failed' });
        }*/

        // Verificar el rol en el token decodificado
        const { rol } = decoded;
        if (rol == "admin" || rol == "user") {
            req.rol = rol; // Añadir el rol al request
            next();
        } else {

            return res.status(403).json({ error: 'Access not allowed' });
           //res.json({ error });
        }
    });



}

app.post('/login', (req, res) => {
    
    const user = req.body.user;
    const pass = req.body.password;

    
    /*if(user === userDb.userName && pass === userDb.password){
        // I can create the JWT
        const payload = {
            rol: userDb.rol
        }

        const token = jwt.sign(payload, LLAVE_SECRETA,{algorithm: "HS256"})

        res.status(200).send({
            message: 'Bienvenido',
            token
        })
    } else {
        res.status(401).send('Contraseña o Usuario incorrecto')
    }*/

    const index = userDb.findIndex(userDb => userDb.password === pass, userDb.user === user);
    if (index === -1){
        res.status(401).send({error:"Invalid user name or password"});
      }else{
        const payload =userDb[index];
    
        const token = jwt.sign(payload,LLAVE_SECRETA,{algorithm: "HS256"});
    
        res.json({ token });
        //res.status(200).header("Authorization",token).json({token});
  
      }
  

})
app.get('/books', authMiddleware, (req, res) => {
    //res.status(200).send('Esta es una lista de libros')


    if (req.role == "user" || req.role == "admin") {

        res.json({ message: "Acceso concedido" });
    
      } else {
    
        res.status(200).json({ error: "Access not allowed" });
    
      }

})


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
