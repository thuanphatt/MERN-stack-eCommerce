const router = require("express").Router();
const ctrls = require("../controllers/blogCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createCategory);
router.get("/", ctrls.getCategories);
router.put("/:bcid", [verifyAccessToken, isAdmin], ctrls.updatedCategory);
router.delete("/:bcid", [verifyAccessToken, isAdmin], ctrls.deletedCategory);

module.exports = router;

// CREATE (POST) + PUT - body
// GET + DELETE - query
