const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const ctrls = require("../controllers/content");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
router.get("/", ctrls.getContents);
router.get("/getDetail/:cid", [verifyAccessToken, isAdmin], ctrls.getContent);

router.post(
	"/",
	[verifyAccessToken, isAdmin],
	fileUploader.fields([
		{
			name: "banners",
			maxCount: 10,
		},
		{
			name: "bannerSub",
			maxCount: 10,
		},
		{
			name: "logo",
			maxCount: 1,
		},
	]),
	ctrls.createNewContent
);
router.put(
	"/:cid",
	verifyAccessToken,
	isAdmin,
	fileUploader.fields([
		{
			name: "banners",
			maxCount: 10,
		},
		{
			name: "bannerSub",
			maxCount: 10,
		},
		{
			name: "logo",
			maxCount: 1,
		},
	]),
	ctrls.updatedContent
);
router.delete("/:cid", [verifyAccessToken, isAdmin], ctrls.deletedContent);

module.exports = router;
