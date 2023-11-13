function midd(req, res, next) {
    if(req.method!="GET" &&  req.method!="POST" && req.method!="DELETE" && req.method!="PUT" ){
  
   
        return res.status(400).send("Invalid http request method");
       
       }
    next()
}

function middDos(err, req, res, next) {
 res.status(500).send(err.stack)
}

module.exports = { midd, middDos }
