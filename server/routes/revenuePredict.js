const router = require("express").Router();
const ctrls = require("../controllers/revenuePredict");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewRevenue);
router.get("/", ctrls.getRevenues);
// router.get("/current/:cid", ctrls.geresultArraytCoupon);
// router.put("/:cid", [verifyAccessToken, isAdmin], ctrls.updatedCoupon);
// router.delete("/:cid", [verifyAccessToken, isAdmin], ctrls.deletedCoupon);

module.exports = router;

// CREATE (POST) + PUT - body
// GET + DELETE - query
