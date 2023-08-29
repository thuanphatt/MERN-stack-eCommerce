const router = require("express").Router();
const ctrls = require("../controllers/product");
const fileUploader = require("../config/cloudinary.config");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createProduct);
router.get("/", ctrls.getAllProduct);
router.put("/ratings", verifyAccessToken, ctrls.ratings);

router.put(
  "/uploadimage/:pid",
  [verifyAccessToken, isAdmin],
  fileUploader.single("images"),
  ctrls.uploadImagesProduct
);
router.put("/:pid", [verifyAccessToken, isAdmin], ctrls.updateProduct);
router.delete("/:pid", [verifyAccessToken, isAdmin], ctrls.deleteProduct);
router.get("/:pid", ctrls.getProduct);

module.exports = router;

// CREATE (POST) + PUT - body
// GET + DELETE - query
