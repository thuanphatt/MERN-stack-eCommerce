const router = require("express").Router();
const ctrls = require("../controllers/coupon");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewCoupon);
router.get("/", ctrls.getCoupons);
router.put("/:cid", [verifyAccessToken, isAdmin], ctrls.updatedCoupon);
router.delete("/:cid", [verifyAccessToken, isAdmin], ctrls.deletedCoupon);

module.exports = router;

// CREATE (POST) + PUT - body
// GET + DELETE - query
