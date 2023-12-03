const router = require("express").Router();
const ctrls = require("../controllers/product");
const fileUploader = require("../config/cloudinary.config");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post(
	"/",

	fileUploader.fields([
		{
			name: "images",
			maxCount: 10,
		},
		{
			name: "thumb",
			maxCount: 1,
		},
	]),
	ctrls.createProduct
);
router.get("/", ctrls.getAllProduct);
router.put("/ratings", verifyAccessToken, ctrls.ratings);
router.put(
	"/varriant/:pid",
	verifyAccessToken,
	isAdmin,
	fileUploader.fields([
		{
			name: "images",
			maxCount: 10,
		},
		{
			name: "thumb",
			maxCount: 1,
		},
	]),
	ctrls.addVarriant
);
router.put(
	"/:pid",
	verifyAccessToken,
	isAdmin,
	fileUploader.fields([
		{
			name: "images",
			maxCount: 10,
		},
		{
			name: "thumb",
			maxCount: 1,
		},
	]),
	ctrls.updateProduct
);

router.delete("/:pid", [verifyAccessToken, isAdmin], ctrls.deleteProduct);
router.get("/:pid", ctrls.getProduct);

module.exports = router;

// CREATE (POST) + PUT - body
// GET + DELETE - query
