const mongoose = require("mongoose")

const animalSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    img: {type: String, required: true},
    raza: {type: String, required: false},
    sexo: {type: String, required: false},
    edad: {type: Number, required: true}, 
})

module.exports = mongoose.model("animales", animalSchema)