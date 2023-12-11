const userRouter = require("./user");
const productRouter = require("./product");
const productCategoryRouter = require("./productCategory");
const blogCategoryRouter = require("./blogCategory");
const blog = require("./blog");
const coupon = require("./coupon");
const content = require("./content");
const order = require("./order");
const shipment = require("./shipment");
const payment = require("./vnpay");
const sale = require("./sale");
const service = require("./service");
const revenue = require("./revenuePredict");
const receipt = require("./receipt");
const { notFound, errorHandler } = require("../middlewares/errorHandler");
const initRoutes = (app) => {
	app.use("/api/user", userRouter);
	app.use("/api/product", productRouter);
	app.use("/api/prodcategory", productCategoryRouter);
	app.use("/api/blogcategory", blogCategoryRouter);

	app.use("/api/blog", blog);
	app.use("/api/coupon", coupon);
	app.use("/api/content", content);
	app.use("/api/order", order);
	app.use("/api/shipment", shipment);
	app.use("/api/sale", sale);
	app.use("/api/payment", payment);
	app.use("/api/service", service);
	app.use("/api/revenue", revenue);
	app.use("/api/receipt", receipt);

	app.use(notFound);
	app.use(errorHandler);
};
module.exports = initRoutes;
