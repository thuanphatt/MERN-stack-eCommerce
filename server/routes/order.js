const router = require("express").Router();
const ctrls = require("../controllers/order");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", verifyAccessToken, ctrls.createNewOrder);
router.put("/status/:oid", [verifyAccessToken, isAdmin], ctrls.updateStatus);
router.get("/", [verifyAccessToken], ctrls.getUserOrder);
router.get("/admin", [verifyAccessToken, isAdmin], ctrls.getAdminOrder);

module.exports = router;
