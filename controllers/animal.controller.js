const Animal = require("../models/animal.model");

async function buscarAnimalesPorTipoProvinciaOComunidad(raza, sexo, edad) {
	const filtro = {};

	raza && raza !== "" ? filtro.raza = raza : false;
	sexo && sexo !== "" ? filtro.sexo = sexo : false;
	edad && edad !== "" ? filtro.edad = edad : false;

	const todosLasAnimales = await Animal.find(filtro);
	return todosLasAnimales;
}


/**
 *
 * @param {*} id
 * @returns devuelve el animal que corresponde a ese id
 */
async function buscarAnimalPorId(id) {
	const animal = await Animal.findById(id);
	return animal;
}

/**
 *
 * @param {*} animal
 * @returns devuelve el nuevo Animal
 */
async function crearAnimal(animal) {
	const nuevoAnimal = new Animal({
		nombre: animal.nombre,
		img: animal.img,
		raza: animal.raza,
		sexo: animal.sexo,
		edad: animal.edad,
	});
	await nuevoAnimal.save();
	return nuevoAnimal;
}

/**
 *
 * @param {*} id
 * @returns deveulve la animal borrada que tenía ese id
 */
async function borrarAnimalPorId(id) {
	const animalBorrado = await Animal.findByIdAndDelete(id);
	return animalBorrado;
}

/**
 *
 * @param {*} id
 * @param {*} animal
 * @returns devuelve la animal de dicho id con las modificaciones
 */
async function cambiarAnimal(id, animal) {
	const modificacionAnimal = {
		nombre: animal.nombre,
		img: animal.img,
		raza: animal.raza,
		sexo: animal.sexo,
		edad: animal.edad,
	};
	const animalModificado = await Animal.findByIdAndUpdate(id, modificacionAnimal);
	return animalModificado;
}

module.exports = {
	buscarAnimalesPorTipoProvinciaOComunidad,
	buscarAnimalPorId,
	crearAnimal,
	borrarAnimalPorId,
	cambiarAnimal,
};
