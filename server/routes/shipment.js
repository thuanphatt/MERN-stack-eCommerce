const router = require("express").Router();
const ctrls = require("../controllers/shipment");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createShipment);
router.get("/", ctrls.getShipment);
router.put("/:sid", [verifyAccessToken, isAdmin], ctrls.updatedShipment);
router.delete("/:sid", [verifyAccessToken, isAdmin], ctrls.deletedShipment);

module.exports = router;

// CREATE (POST) + PUT - body
// GET + DELETE - query
