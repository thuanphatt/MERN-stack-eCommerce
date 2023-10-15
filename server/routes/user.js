const router = require("express").Router();
const ctrls = require("../controllers/user");
const fileUploader = require("../config/cloudinary.config");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
router.post("/register", ctrls.register);
router.post("/mockData", ctrls.createUsers);
router.put("/registerfinal/:token", ctrls.registerFinal);
router.post("/login", ctrls.login);
router.post("/refreshtoken", ctrls.refreshAccessToken);

router.get("/current", verifyAccessToken, ctrls.getCurrent);
router.get("/logout", ctrls.logout);
router.post("/forgotpassword", ctrls.forgotPassword);
router.get("/", [verifyAccessToken, isAdmin], ctrls.getUsers);

router.put("/resetpassword", ctrls.resetPassword);
router.put("/current", verifyAccessToken, fileUploader.single("avatar"), ctrls.updateUser);
router.put("/address", [verifyAccessToken], ctrls.updateUserAddress);
router.put("/cart", [verifyAccessToken], ctrls.addToCart);
router.delete("/removecart/:pid/:color", [verifyAccessToken], ctrls.removeProductInCart);
router.put("/:uid", [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin);

router.delete("/:uid", [verifyAccessToken, isAdmin], ctrls.deleteUser);
module.exports = router;

// CREATE (POST) + PUT - body
// GET + DELETE - query
