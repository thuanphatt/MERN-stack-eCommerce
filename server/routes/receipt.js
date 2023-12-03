const router = require("express").Router();
const ctrls = require("../controllers/receipt");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
router.get("/", ctrls.getReceipts);
router.post("/", ctrls.createNewReceipt);
router.get("/getReceipt/:rid", ctrls.getReceipt);
router.put("/", ctrls.updatedReceipt);
router.delete("/:rid", ctrls.deleteReceipt);

module.exports = router;
