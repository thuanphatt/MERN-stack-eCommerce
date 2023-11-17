/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoReturnDownBack } from "react-icons/io5";
import { toast } from "react-toastify";

import { apiGetProducts, apiUpdateSale } from "apis";
import { Button, InputForm, Loading, Select } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import { showModal } from "store/app/appSlice";
import clsx from "clsx";
import { useSelector } from "react-redux";

const UpdateSale = ({ editSale, setEditSale, render, dispatch }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
		watch,
	} = useForm();
	const [products, setProducts] = useState(null);
	const { categories } = useSelector((state) => state.app);
	useEffect(() => {
		reset({
			name: editSale?.name || "",
			discount: editSale?.discount || "",
			type: editSale?.products[0]?.category[0] || "",
			products: editSale?.products[0]?.title || "",
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editSale]);
	const category = watch("type");
	const fetchProducts = async () => {
		const response = await apiGetProducts({ category });
		if (response.success) setProducts(response.products);
	};

	useEffect(() => {
		fetchProducts();
	}, [category]);
	const handleUpdateSale = async (data) => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiUpdateSale(data, editSale?._id);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			setEditSale(null);
			render();
		} else toast.error(response.mes);
	};
	return (
		<div className="w-full flex flex-col gap-4 relative bg-gray-100 h-full">
			<div className="flex items-center justify-betweend p-4 border-b w-full">
				<h1 className="text-3xl font-bold tracking-tight">
					<span>Cập nhật sự kiện</span>
				</h1>
				<span
					className="ml-auto cursor-pointer hover:underline"
					onClick={() => {
						setEditSale(null);
					}}
				>
					<IoReturnDownBack size={24} />
				</span>
			</div>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleUpdateSale)}>
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
							options={products?.map((el) => ({
								code: el._id,
								value: el.title,
							}))}
						/>
					</div>

					<div className="my-6">
						<Button fullwidth type="submit">
							Cập nhật
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(UpdateSale));
