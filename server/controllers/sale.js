const Sale = require("../models/sale");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

const createSale = asyncHandler(async (req, res) => {
	const { name, products, discount } = req.body;
	const _products = req.body.products.split(",");
	if (!(name && discount && products)) {
		return res.status(400).json({ success: false, mes: "Thông tin đầu vào bị thiếu" });
	}
	// Truy vấn các sản phẩm với các id trong mảng productIds
	const productList = await Product.find({ _id: { $in: _products } });

	if (!productList || productList.length === 0) {
		return res.status(400).json({ success: false, mes: "Không tìm thấy sản phẩm nào" });
	}
	// Tạo sự kiện với danh sách sản phẩm tương ứng
	const newSale = await Sale.create({ name, products: productList, discount });
	return res.status(200).json({
		success: true,
		mes: "Tạo sự kiện thành công",
		newSale,
	});
});
const getSales = asyncHandler(async (req, res) => {
	const queries = { ...req.query };
	const excludeFields = ["limit", "sort", "page", "fields"];
	excludeFields.forEach((el) => delete queries[el]);
	let queryString = JSON.stringify(queries);
	queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
	const formatedQueries = JSON.parse(queryString);

	let queryObject = {};
	// Filtering

	const qr = { ...formatedQueries, ...queryObject };
	let queryCommand = Sale.find(qr);
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
			const counts = await Sale.find({
				$and: [queries, queryObject], // Combine the queries
			}).countDocuments();

			return res.status(200).json({
				success: response ? true : false,
				counts,
				sales: response ? response : "Không thể lấy tất cả sale",
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
});

const getSale = asyncHandler(async (req, res) => {
	const { sid } = req.params;
	const sale = await Sale.findById(sid);
	return res.json({
		success: sale ? true : false,
		sale: sale ? sale : "Không thể lấy sale",
	});
});

const updatedSale = asyncHandler(async (req, res) => {
	const { sid } = req.params;
	const updatedSale = await Sale.findByIdAndUpdate(sid, req.body, {
		new: true,
	});
	return res.status(200).json({
		success: updatedSale ? true : false,
		mes: updatedSale ? "Cập nhật sale thành công" : "Không thể cập nhật sale",
	});
});
const deletedSale = asyncHandler(async (req, res) => {
	const { sid } = req.params;
	const response = await Banner.findByIdAndDelete(sid);
	return res.json({
		success: response ? true : false,
		mes: response ? "Đã xóa sale thành công" : "Không thể xóa sale",
	});
});

module.exports = {
	createSale,
	getSale,
	getSales,
	updatedSale,
	deletedSale,
};
