const router = require("express").Router();
const ctrls = require("../controllers/service");
const fileUploader = require("../config/cloudinary.config");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", [verifyAccessToken], ctrls.getServices);
router.post(
	"/",
	[verifyAccessToken, isAdmin],
	fileUploader.fields([
		{
			name: "image",
			maxCount: 1,
		},
	]),
	ctrls.createNewService
);
router.get("/:sid", [verifyAccessToken], ctrls.getService);
router.put("/:sid", [verifyAccessToken, isAdmin], ctrls.updatedSerice);
router.delete("/:sid", [verifyAccessToken, isAdmin], ctrls.deletedSerice);

module.exports = router;
