const userRouter = require("./user");
const productRouter = require("./product");
const productCategoryRouter = require("./productCategory");
const blogCategoryRouter = require("./blogCategory");
const blog = require("./blog");
const brand = require("./brand");
const coupon = require("./coupon");
const order = require("./order");
const shipment = require("./shipment");
const insertData = require("./insertData");
const payment = require("./vnpay");
const { notFound, errorHandler } = require("../middlewares/errorHandler");
const initRoutes = (app) => {
	app.use("/api/user", userRouter);
	app.use("/api/product", productRouter);
	app.use("/api/prodcategory", productCategoryRouter);
	app.use("/api/blogcategory", blogCategoryRouter);
	app.use("/api/brand", brand);
	app.use("/api/blog", blog);
	app.use("/api/coupon", coupon);
	app.use("/api/order", order);
	app.use("/api/insert", insertData);
	app.use("/api/shipment", shipment);
	app.use("/api/payment", payment);

	app.use(notFound);
	app.use(errorHandler);
};
module.exports = initRoutes;
