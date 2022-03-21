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
}

module.export = { addItemToDo };