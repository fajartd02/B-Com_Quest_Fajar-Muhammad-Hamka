const express = require("express");
const Router = express.Router;
const { addItemToDo, readAndCreateDefault, deleteItemToDo, readDynamicURL } = require("../controllers/toDoController");

const router = Router();

// CREATE
router.post("/", addItemToDo);

// READ Items and Create default if list url done have items
router.get("/", readAndCreateDefault);

// DELETE
router.post("/delete", deleteItemToDo);

// Read Dynamic URL
router.get("/:customListName", readDynamicURL);

module.exports = router;