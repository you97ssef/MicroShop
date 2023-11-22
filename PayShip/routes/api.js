const express = require("express");
const router = express.Router();

const testController = require("../controllers/testController.js");

router.get("/test", testController.get);

const paymentController = require("../controllers/paymentController.js");

router.post("/payment", paymentController.makePayment);
router.get("/payment", paymentController.payments);
router.get("/order-payment/:orderId", paymentController.order);

const shippingController = require("../controllers/shippingController.js");

router.get("/shipping/:id", shippingController.getShipment);
router.get("/check/:code", shippingController.checkStatus);
router.put("/shipping/:id", shippingController.changeStatus);
router.get("/shipping", shippingController.shipments);
router.get("/open-shipping", shippingController.openShipments);
router.get("/order-shipping/:orderId", shippingController.order);

module.exports = router;
