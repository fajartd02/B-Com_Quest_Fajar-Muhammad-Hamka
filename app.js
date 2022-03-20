const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const _ = require("lodash");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

// supaya bisa pake folder public
app.use(express.static("public"));
dotenv.config();

// URL end point: mongodb://localhost:27017
// URL DB: todolistDB (Auto kebuat klo gk ada) 
mongoose.connect(process.env.MONGO_URL);

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

// Seed Data / Initial Data
const item1 = new Item({ name: "Tugas BNCC" });
const item2 = new Item({ name: "Ngoding Bu Eva" });
const item3 = new Item({ name: "Internnet mentee" });

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);
app.set('view engine', 'ejs');

// CREATE DEFAULT AND DIRECT
app.get("/", function(req, res) {
    Item.find({}, function(err, foundItems) {
        if(foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Sucessfully saved default items to DB.");
                }
            });
            res.redirect("/");
        } else {
            res.render("list", {listTitle: "Today", newListItems: foundItems});
        }
    });
});

// CREATE
app.post("/", function(req, res) { 
    const item = req.body.newItem;
    const listName = req.body.list;

    const itemDocument = new Item({ name: item });

    if(listName === "Today") {
        itemDocument.save();
        res.redirect("/");
    } else {
        List.findOne({name: listName}, function(err, foundList) {
            foundList.items.push(itemDocument);
            foundList.save();
            res.redirect("/" + listName);
        });
    }
});

app.post("/delete", function(req, res) {
    let checkItemId = req.body.checkbox;
    let listName = req.body.listName;
    console.log(listName);
    if(listName === "Today") {
        Item.findByIdAndRemove(checkItemId, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("delete sucess");
            }
        });
        res.redirect("/");
    } else {
        List.findOneAndUpdate({ name: listName }, {$pull: {items: {_id: checkItemId}}}, function(err, foundList) {
            if(!err) {
                res.redirect("/" + listName);
            }
        });
    }
    
});

app.get("/:customListName", function(req, res) {
    const customListName = _.capitalize(req.params.customListName);
    
    List.findOne({name: customListName}, function(err, foundList) { 
        if(!err) {
            if(!foundList) {
                console.log("Doesn't exist");
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + customListName);
            } else {
                res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
            }
        }
    });
});

app.post("/work", function(req, res) {
    let item = req.body.newItem;
    workItems.push(item);

    res.redirect("/work")
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.listen(port, function() {
    console.log("Server running success");
});