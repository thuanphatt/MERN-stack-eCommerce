const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const ctrls = require("../controllers/blog");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
router.get("/getBlogs", ctrls.getBlogs);
router.get("/getBlog/:bid", ctrls.getBlog);

router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBlog);

router.put("/dislike/:bid", [verifyAccessToken], ctrls.dislikeBlog);
router.put("/like/:bid", [verifyAccessToken], ctrls.likeBlog);
router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updatedBlog);

router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deletedBlog);
router.put(
  "/uploadavatar/:bid",
  [verifyAccessToken, isAdmin],
  fileUploader.single("image"),
  ctrls.uploadImagesBlog
);

module.exports = router;
