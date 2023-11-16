const router = require("express").Router();
const ctrls = require("../controllers/sale");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
router.get("/", ctrls.getSales);
router.get("/getDetail/:sid", ctrls.getSale);
router.post(
	"/",
	[verifyAccessToken, isAdmin],

	ctrls.createSale
);
router.put(
	"/:sid",
	verifyAccessToken,
	isAdmin,

	ctrls.updatedSale
);
router.delete("/:sid", [verifyAccessToken, isAdmin], ctrls.deletedSale);

module.exports = router;
