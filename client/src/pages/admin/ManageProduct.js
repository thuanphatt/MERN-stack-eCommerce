import { InputForm } from "components";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { apiGetProducts, apiDeleteProduct } from "apis/product";
import { Pagination } from "components";
import UpdateProduct from "./UpdateProduct";
import { formatPrice, formatMoney } from "utils/helpers";
import useDebounce from "hooks/useDebounce";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const ManageProduct = () => {
	const {
		register,
		watch,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const location = useLocation();
	const [params] = useSearchParams();
	const [products, setProducts] = useState(null);
	const [counts, setCounts] = useState(0);
	const [editProduct, setEditProduct] = useState(null);
	const [update, setUpdate] = useState(false);

	const fetchProducts = async (params) => {
		const response = await apiGetProducts({ ...params, limit: +process.env.REACT_APP_LIMIT });

		if (response.success) {
			setProducts(response.products);
			setCounts(response.counts);
		}
	};
	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const queryDebounce = useDebounce(watch("q"), 800);
	const handleDeleteProduct = async (pid) => {
		Swal.fire({
			title: "Bạn có chắc chắn không ?",
			text: "Sau khi bạn xóa sản phẩm này sẽ không thể khôi phục lại",
			cancelButtonText: "Không",
			confirmButtonText: "Có",
			showCancelButton: true,
			icon: "warning",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await apiDeleteProduct(pid);
				if (response.success) {
					render();
					toast.success(response.mes);
				} else {
					toast.error(response.mes);
				}
			} else {
			}
		});
	};
	useEffect(() => {
		if (queryDebounce) {
			navigate({
				pathname: location.pathname,
				search: createSearchParams({ q: queryDebounce }).toString(),
			});
		} else {
			navigate({
				pathname: location.pathname,
			});
		}
	}, [location.pathname, navigate, queryDebounce]);
	useEffect(() => {
		const searchParams = Object.fromEntries([...params]);
		fetchProducts(searchParams);
	}, [params, update]);
	return (
		<div className="w-full flex flex-col gap-4 relative">
			{editProduct && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					<UpdateProduct editProduct={editProduct} render={render} setEditProduct={setEditProduct} />
				</div>
			)}
			<div className="w-full h-[69px]"></div>
			<div className="flex items-center justify-betweend p-4 border-b w-full fixed top-0 bg-gray-100">
				<h1 className="text-3xl font-bold tracking-tight ">
					<span>Quản lý sản phẩm</span>
				</h1>
			</div>
			<div className="flex justify-end items-center pr-4">
				<form className="w-[45%]">
					<InputForm id="q" register={register} errors={errors} fullWidth placeholder="Tìm kiểm sản phẩm ..." />
				</form>
			</div>
			<table className="table-auto mb-6 text-center text-sm mx-4">
				<thead className="font-bold bg-gray-600 text-white">
					<tr className="border border-gray-800">
						<th className="py-3 px-1 border border-gray-800">STT</th>
						<th className="py-3 px-1 border border-gray-800">Hình ảnh</th>
						<th className="py-3 px-1 border border-gray-800">Tên</th>
						<th className="py-3 px-1 border border-gray-800">Thương hiệu</th>
						<th className="py-3 px-1 border border-gray-800">Danh mục</th>
						<th className="py-3 px-1 border border-gray-800 min-w-[120px]">Giá</th>
						<th className="py-3 px-1 border border-gray-800">Số lượng</th>
						<th className="py-3 px-1 border border-gray-800">Đã bán</th>
						<th className="py-3 px-1 border border-gray-800">Màu sắc</th>
						<th className="py-3 px-1 border border-gray-800">Đánh giá</th>
						<th className="py-3 px-1 border border-gray-800">Ngày tạo</th>
						<th className="py-3 px-1 border border-gray-800">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{products?.map((el, index) => (
						<tr key={index}>
							<td className="py-2 px-1 border border-gray-800">
								{(+params.get("page") > 1 ? +params.get("page") - 1 : 0) * process.env.REACT_APP_LIMIT + index + 1}
							</td>
							<td className="py-2 px-1 border-b border-r border-gray-800 flex items-center justify-center">
								<img src={el.thumb} alt="thumb" className="w-12 h-12 object-cover" />
							</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">{el.title}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">{el.brand}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">{el.category[0]}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">{`${formatMoney(
								formatPrice(el?.price)
							)} VND`}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">{el.quantity}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">{el.sold}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">{el.color}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">{el.totalRatings}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">
								{moment(el.createdAt)?.format("DD/MM/YYYY")}
							</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">
								<div className="flex items-center gap-4 justify-center">
									<span
										className="cursor-pointer"
										onClick={() => {
											setEditProduct(el);
										}}
									>
										<AiFillEdit color="blue" size={18} />
									</span>
									<span
										className="cursor-pointer"
										onClick={() => {
											handleDeleteProduct(el._id);
										}}
									>
										<AiFillDelete color="red" size={18} />
									</span>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex justify-end my-6 px-4">
				<Pagination totalCount={counts} />
			</div>
		</div>
	);
};

export default memo(ManageProduct);
