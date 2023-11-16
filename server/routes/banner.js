const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const ctrls = require("../controllers/banner");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
router.get("/", [verifyAccessToken, isAdmin], ctrls.getBanners);
router.get("/getDetail/:bid", [verifyAccessToken, isAdmin], ctrls.getBanner);

router.post(
	"/",
	[verifyAccessToken, isAdmin],
	fileUploader.fields([
		{
			name: "image",
			maxCount: 1,
		},
	]),
	ctrls.createNewBanner
);
router.put(
	"/:bid",
	verifyAccessToken,
	isAdmin,
	fileUploader.fields([
		{
			name: "image",
			maxCount: 1,
		},
	]),
	ctrls.updatedBanner
);
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deletedBanner);

module.exports = router;
