const router = require("express").Router();
const ctrls = require("../controllers/brand");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBrand);
router.get("/", ctrls.getBrands);
router.put("/:brid", [verifyAccessToken, isAdmin], ctrls.updatedBrand);
router.delete("/:brid", [verifyAccessToken, isAdmin], ctrls.deletedBrand);

module.exports = router;

// CREATE (POST) + PUT - body
// GET + DELETE - query
