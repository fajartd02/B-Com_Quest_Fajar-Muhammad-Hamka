const mongoose = require("mongoose");

const itemsSchema = {
    name: String
}; 

console.log(itemsSchema);

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

module.exports = { listSchema, List };