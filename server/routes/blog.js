const router = require("express").Router();
const ctrls = require("../controllers/blog");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
router.put("/like", [verifyAccessToken], ctrls.likeBlog);
router.put("/dislike", [verifyAccessToken], ctrls.dislikeBlog);
router.get("/", ctrls.getBlogs);
router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updatedBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deletedBlog);

module.exports = router;
