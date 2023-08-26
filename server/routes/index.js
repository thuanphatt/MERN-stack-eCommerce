const userRouter = require("./user");
const productRouter = require("./product");
const productCategoryRouter = require("./productCategory");
const blogCategoryRouter = require("./blogCategory");
const blog = require("./blog");
const { notFound, errorHandler } = require("../middlewares/errorHandler");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/prodcategory", productCategoryRouter);
  app.use("/api/blogcategory", blogCategoryRouter);
  app.use("/api/blog", blog);

  app.use(notFound);
  app.use(errorHandler);
};
module.exports = initRoutes;
