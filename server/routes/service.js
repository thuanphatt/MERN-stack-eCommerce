const router = require("express").Router();
const ctrls = require("../controllers/service");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/admin", [verifyAccessToken, isAdmin], ctrls.getServices);
router.post("/", verifyAccessToken, ctrls.createNewService);
router.get("/:sid", [verifyAccessToken], ctrls.getService);
router.put("/:sid", [verifyAccessToken, isAdmin], ctrls.updatedSerice);
router.delete("/:sid", [verifyAccessToken, isAdmin], ctrls.deletedSerice);

module.exports = router;
