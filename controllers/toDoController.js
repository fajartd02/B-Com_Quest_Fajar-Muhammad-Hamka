const { Item, defaultItems } = require("../models/itemSchema");
const { List } = require("../models/listSchema");
const _ = require("lodash");

// CREATE Items
function addItemToDo(req, res) { 
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
};

// READ Items and Create default if list url done have items
function readAndCreateDefault(req, res) {
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
};

// DELETE TO DO
function deleteItemToDo(req, res) {
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
}

// Read Dynamic URL
function readDynamicURL(req, res) {
    const customListName = _.capitalize(req.params.customListName);
    
    /*  Check name in database for URL, 
        if it wasn't exist, it will create database default 
    */
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
                res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
            }
        }
    });
}

module.exports = { addItemToDo, readAndCreateDefault, deleteItemToDo, readDynamicURL };