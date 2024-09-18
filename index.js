const express = require("express")
const mongoose= require("mongoose")
const cors = require("cors")
const userRoutes = require("./routes/user.routes")
const animalRoutes = require("./routes/animals.routes")

require("dotenv").config();
const app = express()

const port = process.env.PORT || 3000;
const host = process.env.HOST || process.env.FRONT_URL_VERCEL;

var corsOptions = {
  //config. para cors abra conexion a la ruta elegida
  origin: host,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json())

app.set("secretKey", process.env.JWTSECRET)


mongoose.connect(process.env.conectStream)
.then(() =>{
    console.log('Conexión con base de datos exitosa')
})
.catch((err)=>{
    console.log(err,"Error al conectar con base de datos")
})


app.use("/api/users", userRoutes)
app.use("/api/animals", animalRoutes)

app.listen(port, () =>{
    console.log(`API funcionando en puerto ${port}`)
})