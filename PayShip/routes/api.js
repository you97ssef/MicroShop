import express from "express";
const router = express.Router();

import testController from "../controllers/testController.js";

router.get("/test", testController.get);
router.get("/test/:id", testController.getId);
router.post("/test", testController.post);

export default router;
