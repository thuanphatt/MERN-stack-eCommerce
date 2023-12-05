const Receipt = require("../models/receipt");
const Product = require("../models/product");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const createNewReceipt = asyncHandler(async (req, res) => {
	const { inputPrice, inputQuantity, products, inputName } = req.body;
	if (!(inputPrice && inputQuantity && products && inputName)) throw new Error("Thông tin đầu vào bị thiếu");
	const productInit = await Product.findById(products);
	const user = await User.findById(inputName);
	const newReceipt = await Receipt.create({ inputPrice, inputQuantity, products: productInit, inputName: user });
	return res.status(200).json({
		success: newReceipt ? true : false,
		mes: newReceipt ? "Tạo phiếu nhập thành công" : "Không tạo được phiếu nhập",
	});
});
const getReceipts = asyncHandler(async (req, res) => {
	const queries = { ...req.query };
	const excludeFields = ["limit", "sort", "page", "fields"];
	excludeFields.forEach((el) => delete queries[el]);
	let queryString = JSON.stringify(queries);
	queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
	const formatedQueries = JSON.parse(queryString);

	// Filtering
	if (queries?.inputName && queries.inputName.lastName) {
		formatedQueries.inputName = formatedQueries.inputName || {};
		formatedQueries.inputName.lastName = { $regex: queries.inputName.lastName, $options: "i" };
	}

	let queryObject = {};
	if (queries?.q) {
		delete formatedQueries.q;
		queryObject = {
			$or: [{ "inputName.lastName": { $regex: queries.q, $options: "i" } }],
		};
	}
	const qr = { ...formatedQueries, ...queryObject };
	let queryCommand = Receipt.find(qr);
	if (req.query.sort) {
		const sortBy = req.query.sort?.split(",").join(" ");
		queryCommand = queryCommand.sort(sortBy);
	}

	if (req.query.fields) {
		const fields = req.query.fields?.split(",").join(" ");
		queryCommand = queryCommand.select(fields);
	}

	const page = +req.query.page || 1;
	const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
	const skip = (page - 1) * limit;
	queryCommand.skip(skip).limit(limit);
	queryCommand
		.exec()
		.then(async (response) => {
			const counts = await Receipt.find(qr).countDocuments();
			return res.status(200).json({
				success: response ? true : false,
				receipts: response ? response : "Không thể lấy phiếu nhập",
				counts,
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
});

const getReceipt = asyncHandler(async (req, res) => {
	const { rid } = req.params;
	const receipt = await Receipt.findById(rid);

	return res.json({
		success: receipt ? true : false,
		receipt: receipt ? receipt : "Không thể lấy phiếu nhập",
	});
});
const deleteReceipt = asyncHandler(async (req, res) => {
	const { rid } = req.params;
	const receipt = await Receipt.findByIdAndDelete(rid);

	return res.json({
		success: receipt ? true : false,
		mes: receipt ? "Xóa phiếu nhập thành công" : "Không thể xóa phiếu nhập",
	});
});

const updatedReceipt = asyncHandler(async (req, res) => {
	const { rid } = req.params;
	const updatedReceipt = await Receipt.findByIdAndUpdate(rid, req.body, {
		new: true,
	});
	return res.status(200).json({
		success: updatedReceipt ? true : false,
		mes: updatedReceipt ? "Cập nhật phiếu nhập thành công" : "Không thể cập nhật phiếu nhập",
	});
});

module.exports = {
	createNewReceipt,
	getReceipt,
	getReceipts,
	updatedReceipt,
	deleteReceipt,
};
