import { CustomSelect, InputForm, Loading } from "components";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { apiGetProducts, apiDeleteProduct } from "apis/product";
import { Pagination, CustomizeVariants } from "components";
import UpdateProduct from "./UpdateProduct";
import { formatPrice, formatMoney, convertArrFilter } from "utils/helpers";
import useDebounce from "hooks/useDebounce";
import { AiFillDelete, AiFillEdit, AiFillFilter } from "react-icons/ai";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { BiCustomize } from "react-icons/bi";
import path from "utils/path";
import { cateLabel } from "utils/contants";
import withBaseComponent from "hocs/withBaseComponent";
import { showModal } from "store/app/appSlice";
const ManageProduct = ({ dispatch }) => {
	const {
		register,
		watch,
		formState: { errors },
	} = useForm();
	const category = watch("category");
	const color = watch("color");
	const brand = watch("brand");
	const navigate = useNavigate();
	const location = useLocation();
	const [params] = useSearchParams();
	const [products, setProducts] = useState(null);
	const [productsNolimit, setProductsNolimit] = useState(null);
	const [counts, setCounts] = useState(0);
	const [editProduct, setEditProduct] = useState(null);
	const [update, setUpdate] = useState(false);
	const [customizeVariant, setCustomizeVariant] = useState(null);
	const [isFilterPrice, setIsFilterPrice] = useState(null);

	const fetchProducts = async (params) => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiGetProducts({
			...params,
			limit: +process.env.REACT_APP_LIMIT,
			sort: isFilterPrice ? "price" : "-price",
		});
		dispatch(showModal({ isShowModal: false, modalChildren: null }));

		if (response.success) {
			setProducts(response.products);
			setCounts(response.counts);
		}
	};
	const fetchProductsNolimit = async () => {
		const response = await apiGetProducts({ limit: 50 });
		if (response.success) {
			setProductsNolimit(response.products);
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
				dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
				const response = await apiDeleteProduct(pid);
				dispatch(showModal({ isShowModal: false, modalChildren: null }));
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
	const handleSearchCate = ({ value }) => {
		navigate({
			pathname: location?.pathname,
			search: createSearchParams({ category: value }).toString(),
		});
	};
	const handleSearchBrand = ({ value }) => {
		navigate({
			pathname: location?.pathname,
			search: createSearchParams({ brand: value }).toString(),
		});
	};
	const handleSearchColor = ({ value }) => {
		navigate({
			pathname: location?.pathname,
			search: createSearchParams({ color: value }).toString(),
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params, update, isFilterPrice]);
	useEffect(() => {
		fetchProductsNolimit();
	}, []);
	const colors = convertArrFilter(productsNolimit?.map((el) => el.color));
	const brands = convertArrFilter(productsNolimit?.map((el) => el.brand));

	return (
		<div className="w-full flex flex-col gap-4 relative">
			{editProduct && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					<UpdateProduct editProduct={editProduct} render={render} setEditProduct={setEditProduct} />
				</div>
			)}
			{customizeVariant && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					<CustomizeVariants
						customizeVariant={customizeVariant}
						render={render}
						setCustomizeVariant={setCustomizeVariant}
					/>
				</div>
			)}
			<div className="w-full h-[69px]"></div>
			<div className="flex items-center justify-betweend p-4 border-b w-full fixed top-0 bg-gray-100">
				<h1 className="text-3xl font-bold tracking-tight ">
					<span>Quản lý sản phẩm</span>
				</h1>
			</div>
			<div className="flex justify-end items-center mr-[27px]">
				<div className="flex justify-end items-center my-6">
					<form className="grid grid-cols-4 gap-2 w-full">
						<div className="col-span-1">
							<InputForm
								id="q"
								register={register}
								errors={errors}
								fullWidth
								placeholder="Tìm kiếm theo tên sản phẩm..."
							/>
						</div>
						<div className="col-span-1 flex items-center md:max-w-[210px]">
							<CustomSelect
								placeholder="Danh mục"
								options={cateLabel}
								value={category}
								onChange={(val) => {
									if (!val) {
										navigate(`/${path.ADMIN}/${path.MANAGE_PRODUCT}`);
									}
									val && handleSearchCate(val);
								}}
								wrapClassName="w-full"
							/>
						</div>
						<div className="col-span-1 flex items-center">
							<CustomSelect
								placeholder="Thương hiệu"
								options={brands}
								value={brand}
								onChange={(val) => {
									if (!val) {
										navigate(`/${path.ADMIN}/${path.MANAGE_PRODUCT}`);
									}
									val && handleSearchBrand(val);
								}}
								wrapClassName="w-full"
							/>
						</div>
						<div className="col-span-1 flex items-center">
							<CustomSelect
								placeholder="Màu sắc"
								options={colors}
								value={color}
								onChange={(val) => {
									if (!val) {
										navigate(`/${path.ADMIN}/${path.MANAGE_PRODUCT}`);
									}
									val && handleSearchColor(val);
								}}
								wrapClassName="w-full"
							/>
						</div>
					</form>
				</div>
			</div>
			<table className="table-auto mb-6 text-center text-sm w-main mx-auto">
				<thead className="font-bold bg-main text-white">
					<tr className="text-center">
						<th className="py-3 px-1 ">STT</th>
						<th className="py-3 px-1 ">Hình ảnh</th>
						<th className="py-3 px-1 ">Tên</th>
						<th className="py-3 px-1 ">Thương hiệu</th>
						<th className="py-3 px-1 ">Danh mục</th>
						<th className="py-3 px-1 border-gray-800 min-w-[120px] flex gap-2 justify-center items-center pt-5">
							<span>Giá</span>
							<span
								className="cursor-pointer"
								onClick={() => {
									setIsFilterPrice(!isFilterPrice);
								}}
							>
								<AiFillFilter size={16} />
							</span>
						</th>
						<th className="py-3 px-1  min-w-[120px]">Giá nhập</th>
						<th className="py-3 px-1 ">Số lượng</th>
						<th className="py-3 px-1 ">Đã bán</th>
						<th className="py-3 px-1 ">Màu sắc</th>
						<th className="py-3 px-1 ">Đánh giá</th>
						<th className="py-3 px-1 ">Biến thể</th>
						<th className="py-3 px-1 ">Ngày tạo</th>
						<th className="py-3 px-1 ">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{products?.map((el, index) => (
						<tr key={index} className="border-b border-r border-l border-[#ccc]">
							<td className="py-2 px-1 ">
								{(+params.get("page") > 1 ? +params.get("page") - 1 : 0) * process.env.REACT_APP_LIMIT + index + 1}
							</td>
							<td className="py-2 px-1 flex items-center justify-center">
								<img src={el.thumb} alt="thumb" className="w-12 h-12 object-cover" />
							</td>
							<td className="py-2 px-1 truncate max-w-[150px]">{el.title}</td>
							<td className="py-2 px-1">{el.brand}</td>
							<td className="py-2 px-1">{el.category[0]}</td>
							<td className="py-2 px-1">{`${formatMoney(formatPrice(el?.price))} VND`}</td>
							<td className="py-2 px-1">{`${formatMoney(formatPrice(el?.inputPrice))} VND`}</td>
							<td className="py-2 px-1">{el.quantity}</td>
							<td className="py-2 px-1">{el.sold}</td>
							<td className="py-2 px-1">{el.color}</td>
							<td className="py-2 px-1">{el.totalRatings}</td>
							<td className="py-2 px-1">{el?.varriants?.length || 0}</td>
							<td className="py-2 px-1">{moment(el.createdAt)?.format("DD/MM/YYYY")}</td>
							<td className="py-2 px-1">
								<div className="flex items-center gap-4 justify-center">
									<span
										className="cursor-pointer hover:text-gray-800 text-blue-500"
										onClick={() => {
											setEditProduct(el);
										}}
									>
										<AiFillEdit size={18} />
									</span>
									<span
										className="cursor-pointer hover:text-gray-800 text-red-500"
										onClick={() => {
											handleDeleteProduct(el._id);
										}}
									>
										<AiFillDelete size={18} />
									</span>
									<span
										className="cursor-pointer hover:text-gray-800 text-main"
										onClick={() => {
											setCustomizeVariant(el);
										}}
									>
										<BiCustomize size={18} />
									</span>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex justify-end mb-6 px-4 mx-6">
				<Pagination totalCount={counts} />
			</div>
		</div>
	);
};

export default withBaseComponent(memo(ManageProduct));
