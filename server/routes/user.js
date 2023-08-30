const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
router.post("/register", ctrls.register);
router.post("/login", ctrls.login);
router.post("/refreshtoken", ctrls.refreshAccessToken);

router.get("/current", verifyAccessToken, ctrls.getCurrent);
router.get("/logout", ctrls.logout);
router.get("/forgotpassword", ctrls.forgotPassword);
router.get("/", [verifyAccessToken, isAdmin], ctrls.getUsers);

router.put("/resetpassword", ctrls.resetPassword);
router.put("/current", [verifyAccessToken], ctrls.updateUser);
router.put("/address", [verifyAccessToken], ctrls.updateUserAddress);
router.put("/cart", [verifyAccessToken], ctrls.addToCart);
router.put("/:uid", [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin);

router.delete("/", [verifyAccessToken, isAdmin], ctrls.deleteUser);
module.exports = router;

// CREATE (POST) + PUT - body
// GET + DELETE - query
