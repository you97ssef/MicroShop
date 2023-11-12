const express = require("express");
const router = express.Router();

const testController = require("../controllers/testController.js");

router.get("/test", testController.get);
router.get("/test/:id", testController.getId);
router.post("/test", testController.post);

module.exports = router;
