const Service = require("../models/service");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

const createNewService = asyncHandler(async (req, res) => {
	const { name, description, type, products } = req.body;
	const _products = req.body.products.split(",");

	const image = req?.files?.image[0]?.path;
	if (req.body.image) req.body.image = image;
	if (!(name && description && type && products)) {
		return res.status(400).json({ success: false, mes: "Thông tin đầu vào bị thiếu" });
	}

	// Truy vấn các sản phẩm với các id trong mảng productIds
	const productList = await Product.find({ _id: { $in: _products } });

	if (!productList || productList.length === 0) {
		return res.status(400).json({ success: false, mes: "Không tìm thấy sản phẩm nào" });
	}

	// Tạo dịch vụ với danh sách sản phẩm tương ứng
	const newService = await Service.create({ name, description, image, type, products: productList });

	return res.status(200).json({
		success: true,
		mes: "Tạo dịch vụ thành công",
		newService,
	});
});

const getServices = asyncHandler(async (req, res) => {
	const queries = { ...req.query };
	const excludeFields = ["limit", "sort", "page", "fields"];
	excludeFields.forEach((el) => delete queries[el]);
	let queryString = JSON.stringify(queries);
	queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
	const formatedQueries = JSON.parse(queryString);

	let queryObject = {};
	// Filtering
	if (queries?.type) formatedQueries.type = { $regex: queries.type, $options: "i" };

	if (queries?.q) {
		delete formatedQueries.q;
		queryObject = {
			$or: [{ name: { $regex: queries.q, $options: "i" } }],
		};
	}
	const qr = { ...formatedQueries, ...queryObject };
	let queryCommand = Service.find(qr);

	if (req.query.sort) {
		const sortBy = req.query.sort?.split(",").join(" ");
		queryCommand = queryCommand.sort(sortBy);
	}

	if (req.query.fields) {
		const fields = req.query.fields?.split(",").join(" ");
		queryCommand = queryCommand.select(fields);
	}

	const page = +req.query.page || 1;
	const limit = +req.query.limit;
	// const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
	const skip = (page - 1) * limit;

	queryCommand.skip(skip).limit(limit);

	queryCommand
		.exec()
		.then(async (response) => {
			const counts = await Service.find({
				$and: [queries, queryObject], // Combine the queries
			}).countDocuments();

			return res.status(200).json({
				success: response ? true : false,
				counts,
				services: response ? response : "Không thể lấy tất cả dịch vụ",
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
});

const getService = asyncHandler(async (req, res) => {
	const { sid } = req.params;
	const service = await Service.findById(sid);
	return res.json({
		success: service ? true : false,
		service: service ? service : "Không thể lấy dịch vụ",
	});
});

const updatedSerice = asyncHandler(async (req, res) => {
	const { sid } = req.params;
	const { name, description, type, products, price } = req.body;
	const productList = await Product.find({ _id: { $in: products } });
	if (!productList || productList.length === 0) {
		return res.status(400).json({ success: false, mes: "Không tìm thấy sản phẩm nào" });
	}
	const updatedSerice = await Service.findByIdAndUpdate(
		sid,
		{ name, description, type, price, products: productList },
		{
			new: true,
		}
	);
	return res.status(200).json({
		success: updatedSerice ? true : false,
		mes: updatedSerice ? "Cập nhật dịch vụ thành công" : "Không thể cập nhật dịch vụ",
	});
});
const deletedSerice = asyncHandler(async (req, res) => {
	const { sid } = req.params;
	const response = await Service.findByIdAndDelete(sid);
	return res.json({
		success: response ? true : false,
		mes: response ? "Đã xóa dịch vụ thành công" : "Không thể xóa dịch vụ",
	});
});

module.exports = {
	createNewService,
	getService,
	getServices,
	updatedSerice,
	deletedSerice,
};
