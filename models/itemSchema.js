const mongoose = require("mongoose");

// one to many with items so url can dynamic
const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

// Seed Data / Initial Data
const item1 = new Item({ name: "Tugas BNCC" });
const item2 = new Item({ name: "Ngoding Bu Eva" });
const item3 = new Item({ name: "Internnet mentee" });

const defaultItems = [item1, item2, item3];

module.exports = { itemsSchema, Item, defaultItems };