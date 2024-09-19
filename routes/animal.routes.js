const express = require("express");
const router = express.Router();
const {
  buscarAnimalesPorAtributo,
  buscarAnimalPorId,
  crearAnimal,
  borrarAnimalPorId,
  cambiarAnimal,
} = require("../controllers/animal.controller");
const { estaAutenticado, esAdmin} = require("../middleware/auth.middleware");

/**
 * Ruta para buscar todas las animales, las que corresponden a una provinciaId o las que correspondan a la query "?comunidad="
 */
router.get("/", estaAutenticado, async (req, res) => {
  try {
    const animalesEncontrados = await buscarAnimalesPorAtributo(req.query.tipo, req.query.raza, req.query.sexo, req.query.edad);
    return res.json({msg: "animales encontrados:", animalesEncontrados});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "error en la busqueda de los animales" });
  }
});

/**
 * Ruta pa buscar una animal en concreto por su id
 */
router.get("/:id", estaAutenticado, async (req, res) => {
  try {
    const animalEncontrado = await buscarAnimalPorId(req.params.id);
    return res.json({msg:"animal encontrado", animalEncontrado})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "error en la busqueda del animal con dicho ID" });
  }
});

/**
 * Ruta para crear una nueva animal
 */
router.post("/", esAdmin, async (req, res) => {
  try {
    const nuevoAnimal = await crearAnimal(req.body);
    return res.json({msg: "animal creada con éxito", nuevoAnimal})
  } catch(error) {
      console.log(error);
      return res.status(500).json({ msg: "error al guardar al animal" });
    }
});

/**
 * Ruta para borrar la animal a la que corresponde es id
 */
router.delete("/:id", esAdmin, async (req, res) => {
  try{
  const animalBorrado = await borrarAnimalPorId(req.params.id)
  return res.json({msg: "animal elminada: ", animalBorrado })
} catch(error){
    console.log(error)
    return res.status(500).json({msg: "error al borrar el animal"})
  }});

  /**
   * Ruta para modificar la animal con dicho id de parámetro
   */
router.put("/:id", esAdmin, async (req, res) => {
  try {
    const animalModificado = await cambiarAnimal(req.params.id, req.body);
    return res
      .json({ msg: "el animal ha sido modificado con exito", animalModificado});
  } catch (error) {
    res.status(500).json({ msg: "error interno del servidor" });
  }
})

module.exports = router;
