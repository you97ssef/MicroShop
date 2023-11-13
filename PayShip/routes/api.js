const express = require("express");
const router = express.Router();

const testController = require("../controllers/testController.js");

router.get("/test", testController.get);
router.get("/test/:id", testController.getId);
router.post("/test", testController.post);

const paymentController = require("../controllers/paymentController.js");

router.post("/payment", paymentController.makePayment);

const shippingController = require("../controllers/shippingController.js");

router.get("/shipping/:id", shippingController.checkStatus);
router.put("/shipping/:id", shippingController.changeStatus);

module.exports = router;
