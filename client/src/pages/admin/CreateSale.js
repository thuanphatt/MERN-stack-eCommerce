/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button, InputForm, Loading, Select } from "components";
import { apiCreateSale, apiGetProducts } from "apis";
import { showModal } from "store/app/appSlice";
import withBaseComponent from "hocs/withBaseComponent";
import { useSelector } from "react-redux";
import moment from "moment";

const CreateSale = ({ dispatch }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
		watch,
	} = useForm();
	const [products, setProducts] = useState(null);

	const category = watch("type");
	const { categories } = useSelector((state) => state.app);

	const handleCreateSale = async (data) => {
		if (data.startDate < moment(Date.now()).format("YYYY-MM-DD")) {
			toast.warning("Ngày bắt đầu không hợp lệ");
			return;
		}
		if (data.endDate < data.startDate) {
			toast.warning("Ngày kết thúc không hợp lệ");
			return;
		}
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));

		const response = await apiCreateSale(data);

		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			reset();
		} else toast.error(response.mes);
	};
	const fetchProducts = async () => {
		const response = await apiGetProducts({ category });
		if (response.success) setProducts(response.products);
	};

	useEffect(() => {
		fetchProducts();
	}, [category]);
	return (
		<div className={clsx("w-full")}>
			<h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b w-full tracking-tight">
				<span>Tạo sự kiện</span>
			</h1>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleCreateSale)}>
					<InputForm
						label="Tên sự kiện"
						register={register}
						errors={errors}
						id="name"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						fullWidth
						placeholder="Nhập tên của sự kiện"
					/>
					<div className="w-full my-6">
						<InputForm
							label="Phần trăm giảm giá"
							register={register}
							errors={errors}
							id="discount"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
							placeholder="Nhập % giảm giá của sự kiện"
						/>
					</div>
					<div className="w-full my-6">
						<Select
							label="Danh mục sản phẩm"
							register={register}
							errors={errors}
							id="type"
							style={clsx("flex-1")}
							validate={{ required: "Không được để trống trường này" }}
							options={categories
								?.filter((cate) => cate.title)
								.map((el) => ({
									code: el.title,
									value: el.title,
								}))}
						/>
					</div>

					<div className="w-full my-6">
						<Select
							label="Danh sách sản phẩm"
							register={register}
							errors={errors}
							id="products"
							style={clsx("flex-1")}
							validate={{ required: "Không được để trống trường này" }}
							options={products
								?.filter((product) => product.quantity > 0)
								.map((el) => ({
									code: el._id,
									value: el.title,
								}))}
						/>
					</div>
					<div className="w-full my-6">
						<InputForm
							type="date"
							label="Ngày bắt đầu"
							register={register}
							errors={errors}
							id="startDate"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
							placeholder="Nhập ngày bắt đầu của sự kiện"
						/>
					</div>
					<div className="w-full my-6">
						<InputForm
							type="date"
							label="Ngày kết thúc"
							register={register}
							errors={errors}
							id="endDate"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
							placeholder="Nhập ngày kết thúc của sự kiện"
						/>
					</div>

					<div className="my-6">
						<Button fullwidth type="submit">
							Tạo sự kiện
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(CreateSale));
