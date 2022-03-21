const express = require("express");
const app = express();
const _ = require("lodash");
const { addItemToDo, readAndCreateDefault } = require("../controllers/toDoController");

// CREATE
app.post("/", addItemToDo);

// READ Items and Create default if list url done have items
app.get("/", readAndCreateDefault);

// DELETE
app.post("/delete", deleteItemToDo);

// Read Dynamic URL
app.get("/:customListName", readDynamicURL);
