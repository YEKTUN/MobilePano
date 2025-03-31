const express = require("express");
const router = express.Router();
const {
  addComponentToPano,
  getPanoWithComponents,
  removeComponentFromPano,
  createPano,
  deletePano,
  updateComponentInPano,
  getComponentById,
  getAllPanos,
  updateComponentOrder,
  duplicateComponentInPano,
} = require("../controller/panoController");

router.post("/create-pano", createPano);

router.delete("/delete-pano/:panoId", deletePano);

router.put("/add-component", addComponentToPano);

router.get("/pano-with-components/:id", getPanoWithComponents);

router.delete(
  "/remove-component/:panoId/:componentId",
  removeComponentFromPano
);

router.put("/update-component", updateComponentInPano);

router.post("/duplicate-component", duplicateComponentInPano);

router.get("/get-all-panos", getAllPanos);

router.put("/update-order", updateComponentOrder);

module.exports = router;
