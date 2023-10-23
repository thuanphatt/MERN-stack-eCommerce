const router = require("express").Router();
const ctrls = require("../controllers/order");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", verifyAccessToken, ctrls.createNewOrder);
router.put("/status/:oid", [verifyAccessToken], ctrls.updateStatus);
router.get("/", [verifyAccessToken], ctrls.getUserOrder);
router.get("/admin", [verifyAccessToken, isAdmin], ctrls.getAdminOrder);
router.delete("/:oid", [verifyAccessToken, isAdmin], ctrls.deleteOrder);
router.get("/:oid", [verifyAccessToken], ctrls.getDetailOrder);

module.exports = router;
