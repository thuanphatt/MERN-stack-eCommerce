const router = require("express").Router();
const ctrls = require("../controllers/vnpay");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/vnpay", verifyAccessToken, ctrls.createPaymentVNP);
router.get("/vnpay-return", verifyAccessToken, ctrls.handleVnpayReturn);
module.exports = router;
