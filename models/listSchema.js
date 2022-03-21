const { itemsSchema } = require("./itemSchema");

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

module.exports = {listSchema, List};