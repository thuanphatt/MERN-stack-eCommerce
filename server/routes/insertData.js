const router = require("express").Router();
const ctrls = require("../controllers/insertData");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
router.post("/", ctrls.insertData);
router.post("/cate", ctrls.insertCateData);

module.exports = router;
