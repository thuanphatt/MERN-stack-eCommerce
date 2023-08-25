const router = require("express").Router();
const ctrls = require("../controllers/productCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createCategory);
router.get("/", ctrls.getCategories);
router.put("/:pcid", [verifyAccessToken, isAdmin], ctrls.updatedCategory);
router.delete("/:pcid", [verifyAccessToken, isAdmin], ctrls.deletedCategory);

module.exports = router;

// CREATE (POST) + PUT - body
// GET + DELETE - query
