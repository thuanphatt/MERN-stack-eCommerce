const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const makeSKU = require("uniqid");
const createProduct = asyncHandler(async (req, res) => {
	const { title, description, brand, price, category, color, inputPrice } = req.body;
	const thumb = req?.files?.thumb[0]?.path;
	const images = req.files?.images?.map((el) => el.path);
	if (!(title && description && brand && price && category && color && inputPrice))
		throw new Error("Thông tin đầu vào bị thiếu");
	req.body.slug = slugify(title);
	if (req.body.thumb) req.body.thumb = thumb;
	if (req.body.images) req.body.images = images;
	const newProduct = await Product.create(req.body);
	return res.status(200).json({
		success: newProduct ? true : false,
		mes: newProduct ? "Tạo sản phẩm thành công" : "Không tạo được sản phẩm",
	});
});
const getProduct = asyncHandler(async (req, res) => {
	const { pid } = req.params;
	const product = await Product.findById(pid).populate({
		path: "ratings",
		populate: {
			path: "postedBy",
			select: "firstName lastName avatar",
		},
	});
	return res.status(200).json({
		success: product ? true : false,
		productData: product ? product : "Cannot get product",
	});
});
// Filter, sort and pagination product
const getAllProduct = asyncHandler(async (req, res) => {
	const queries = { ...req.query };
	// Exclude special fields out of query
	const excludeFields = ["limit", "sort", "page", "fields"];
	excludeFields.forEach((el) => delete queries[el]);
	// Format operators for right syntax of MongoDB
	let queryString = JSON.stringify(queries);
	queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
	const formatedQueries = JSON.parse(queryString);
	let colorQueryObject = {};
	// Filtering
	if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: "i" };
	if (queries?.category) formatedQueries.category = { $regex: queries.category, $options: "i" };
	if (queries?.color) {
		delete formatedQueries.color;
		const colorArr = queries.color?.split(",");
		const colorQuery = colorArr.map((el) => ({
			color: { $regex: el, $options: "i" },
		}));
		colorQueryObject = { $or: colorQuery };
	}
	let queryObject = {};
	if (queries?.q) {
		delete formatedQueries.q;
		queryObject = {
			$or: [
				{ title: { $regex: queries.q, $options: "i" } },
				{ color: { $regex: queries.q, $options: "i" } },
				{ category: { $regex: queries.q, $options: "i" } },
				{ brand: { $regex: queries.q, $options: "i" } },
				// { description: { $regex: queries.q, $options: "i" } },
			],
		};
	}
	const qr = { ...colorQueryObject, ...formatedQueries, ...queryObject };
	let queryCommand = Product.find(qr);
	// Sorting
	// abc,efg => [abc,efg] => abc efg
	if (req.query.sort) {
		const sortBy = req.query.sort?.split(",").join(" ");
		queryCommand = queryCommand.sort(sortBy);
	}
	// Fields limiting
	if (req.query.fields) {
		const fields = req.query.fields?.split(",").join(" ");
		queryCommand = queryCommand.select(fields);
	}
	// Panagation

	const page = +req.query.page || 1; // + mean: convert string to number
	const limit = +req.query.limit || process.env.LIMIT_PRODUCTS; // number of object after call API
	const skip = (page - 1) * limit;
	queryCommand.skip(skip).limit(limit);
	// Execute the query
	// Số lượng sp thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
	queryCommand
		.exec()
		.then(async (response) => {
			const counts = await Product.find(qr).countDocuments();

			return res.status(200).json({
				success: response ? true : false,
				counts,
				products: response ? response : "Cannot get products",
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
});
const updateProduct = asyncHandler(async (req, res) => {
	const { pid } = req.params;
	const files = req?.files;
	if (files?.thumb) req.body.thumb = files?.thumb[0]?.path;
	if (files?.images) req.body.images = files?.images?.map((el) => el.path);
	if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
	const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
		new: true,
	});
	return res.status(200).json({
		success: updatedProduct ? true : false,
		mes: updatedProduct ? "Cập nhật sản phẩm thành công" : "Không thể cập nhật sản phẩm",
	});
});
const deleteProduct = asyncHandler(async (req, res) => {
	const { pid } = req.params;

	const deleteProduct = await Product.findByIdAndDelete(pid, req.body, {
		new: true,
	});
	return res.status(200).json({
		success: deleteProduct ? true : false,
		mes: deleteProduct ? "Đã xóa sản phẩm thành công" : "Không thể xóa sản phẩm",
	});
});
const ratings = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { star, comment, pid, updatedAt } = req.body;

	if (!star || !pid) throw new Error("Thông tin đầu vào bị thiếu");
	const ratingProduct = await Product.findById(pid);
	const isRating = ratingProduct?.ratings?.find((el) => el.postedBy.toString() === _id);
	if (isRating) {
		// update star & comment
		await Product.updateOne(
			{ ratings: { $elemMatch: isRating } },
			{
				$set: { "ratings.$.star": star, "ratings.$.comment": comment, "ratings.$.updatedAt": updatedAt },
			},
			{ new: true }
		);
	} else {
		// add star & comment
		const response = await Product.findByIdAndUpdate(
			pid,
			{
				$push: {
					ratings: {
						star,
						comment,
						postedBy: _id,
						updatedAt,
					},
				},
			},
			{ new: true }
		);
	}
	// sum total rating
	const updatedProduct = await Product.findById(pid);
	const ratingCount = updatedProduct.ratings.length;
	const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0);
	updatedProduct.totalRatings = Math.round((sumRatings * 10) / ratingCount) / 10;
	await updatedProduct.save();
	return res.status(200).json({
		success: true,
		updatedProduct,
	});
});
const uploadImagesProduct = asyncHandler(async (req, res) => {
	const { pid } = req.params;
	const imagesPath = req.files.map((el) => el.path);
	if (!req.files) throw new Error("Thông tin đầu vào bị thiếu");
	const response = await Product.findByIdAndUpdate(pid, { $push: { images: { $each: imagesPath } } }, { new: true });
	return res.status(200).json({
		success: response ? true : false,
		updatedProduct: response ? response : "Cannot upload images product",
	});
});
const addVarriant = asyncHandler(async (req, res) => {
	const { pid } = req.params;
	const { title, price, color } = req.body;
	const thumb = req?.files?.thumb[0]?.path;
	const images = req.files?.images?.map((el) => el.path);
	if (!(title && price && color)) throw new Error("Thông tin đầu vào bị thiếu");
	const response = await Product.findByIdAndUpdate(
		pid,
		{ $push: { varriants: { title, price, color, thumb, images, sku: makeSKU().toUpperCase() } } },
		{ new: true }
	);
	return res.status(200).json({
		success: response ? true : false,
		mes: response ? "Đã thêm biến thể thành công" : "Không thể thêm biến thể",
	});
});

module.exports = {
	createProduct,
	getProduct,
	getAllProduct,
	updateProduct,
	deleteProduct,
	ratings,
	uploadImagesProduct,
	addVarriant,
};
