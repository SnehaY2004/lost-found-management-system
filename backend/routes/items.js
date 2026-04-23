const express = require("express");
const Item = require("../models/Item");
const auth = require("../middleware/auth");

const router = express.Router();

// Add item
router.post("/", auth, async (req, res) => {
  const { itemName, description, type, location, date, contactInfo } = req.body;
  try {
    const item = new Item({
      itemName,
      description,
      type,
      location,
      date,
      contactInfo,
      user: req.user,
    });
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// View all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().populate("user", "name email");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Search items
router.get("/search", async (req, res) => {
  console.log("ggegeg");
  const { name } = req.query;
  console.log("Searching for:", name);
  try {
    const items = await Item.find({
      itemName: { $regex: name || "", $options: "i" },
    });
    console.log("Found items:", items.length);
    res.json(items);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// View item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "user",
      "name email",
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update item
router.put("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (item.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const { itemName, description, type, location, date, contactInfo } =
      req.body;
    item.itemName = itemName || item.itemName;
    item.description = description || item.description;
    item.type = type || item.type;
    item.location = location || item.location;
    item.date = date || item.date;
    item.contactInfo = contactInfo || item.contactInfo;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete item
router.delete("/:id", auth, async (req, res) => {
  console.log("Delete request for item:", req.params.id, "by user:", req.user);
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      console.log("Item not found");
      return res.status(404).json({ message: "Item not found" });
    }
    if (item.user.toString() !== req.user) {
      console.log("Not authorized", item.user, req.user);
      return res.status(401).json({ message: "Not authorized" });
    }
    await item.deleteOne();
    console.log("Item deleted");
    res.json({ message: "Item removed" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
