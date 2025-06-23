const express = require("express");
const router = express.Router();
const visitorController = require("../controllers/visitorController");

router.post("/track", visitorController.trackVisitor);
router.get("/visitors", visitorController.getVisitors);
router.get("/visitor/:id", visitorController.getVisitorById);
router.delete("/visitor/:id", visitorController.deleteVisitor);

module.exports = router;
