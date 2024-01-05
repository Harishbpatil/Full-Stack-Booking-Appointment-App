const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.index);
router.post("/save-user", homeController.saveUser);

module.exports = router;
