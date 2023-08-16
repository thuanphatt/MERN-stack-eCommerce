const router = require("express").Router();
const ctrls = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
router.post("/", [verifyAccessToken, isAdmin], ctrls.createProduct);

router.put("/:pid", [verifyAccessToken, isAdmin], ctrls.updateProduct);
router.delete("/:pid", [verifyAccessToken, isAdmin], ctrls.deleteProduct);

router.get("/", ctrls.getAllProduct);
router.get("/:pid", ctrls.getProduct);

module.exports = router;

// CREATE (POST) + PUT - body
// GET + DELETE - query
