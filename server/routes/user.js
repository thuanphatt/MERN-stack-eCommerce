const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyAccessToken } = require("../middlewares/verifyToken");
router.post("/register", ctrls.register);
router.post("/login", ctrls.login);
router.post("/refreshtoken", ctrls.refreshAccessToken);

router.put("/resetpassword", ctrls.resetPassword);

router.get("/current", verifyAccessToken, ctrls.getCurrent);
router.get("/logout", ctrls.logout);
router.get("/forgotpassword", ctrls.forgotPassword);
module.exports = router;

// CREATE (POST) + PUT - body
// GET + DELETE - query
