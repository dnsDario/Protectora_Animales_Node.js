const mongoose = require("mongoose")

const animalSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    img: {type: String, required: true},
    tipo: {type: String, required: false},
    raza: {type: String, required: false},
    sexo: {type: String, required: true},
    edad: {type: String, required: false}, 
})

module.exports = mongoose.model("animales", animalSchema)