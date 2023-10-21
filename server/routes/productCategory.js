const router = require("express").Router();
const ctrls = require("../controllers/productCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const fileUploader = require("../config/cloudinary.config");

router.post(
	"/",
	[verifyAccessToken, isAdmin],
	fileUploader.fields([
		{
			name: "image",
			maxCount: 1,
		},
	]),
	ctrls.createCategory
);
router.get("/", ctrls.getCategories);
router.put(
	"/:pcid",
	verifyAccessToken,
	isAdmin,
	fileUploader.fields([
		{
			name: "image",
			maxCount: 1,
		},
	]),
	ctrls.updatedCategory
);
router.delete("/:pcid", [verifyAccessToken, isAdmin], ctrls.deletedCategory);

module.exports = router;

// CREATE (POST) + PUT - body
// GET + DELETE - query
