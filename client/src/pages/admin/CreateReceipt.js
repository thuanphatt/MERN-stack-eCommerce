/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button, InputForm, Loading, Select } from "components";
import { apiCreateReceipt, apiGetProducts } from "apis";
import { showModal } from "store/app/appSlice";
import withBaseComponent from "hocs/withBaseComponent";
import { useSelector } from "react-redux";

const CreateReceipt = ({ dispatch }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();
	const { current } = useSelector((state) => state.user);
	const [products, setProducts] = useState(null);
	const handleCreateReceipt = async (data) => {
		const finalPayload = {
			inputPrice: +data.inputPrice,
			inputQuantity: +data.inputQuantity,
			products: data.products,
			inputName: current?._id,
		};
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiCreateReceipt(finalPayload);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			reset();
		} else toast.error(response.mes);
	};
	const fetchProducts = async () => {
		const response = await apiGetProducts({ limit: 100 });
		if (response.success) setProducts(response.products);
	};
	useEffect(() => {
		fetchProducts();
	}, []);
	return (
		<div className={clsx("w-full")}>
			<h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b w-full tracking-tight">
				<span>Tạo phiếu nhập hàng</span>
			</h1>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleCreateReceipt)}>
					<InputForm
						label="Giá nhập hàng"
						register={register}
						errors={errors}
						type="number"
						id="inputPrice"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						fullWidth
						placeholder="Nhập giá nhập hàng"
					/>

					<div className="w-full my-6">
						<InputForm
							label="Số lượng nhập hàng"
							register={register}
							errors={errors}
							type="number"
							id="inputQuantity"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
							placeholder="Nhập số lượng nhập hàng"
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
							Tạo phiếu nhập hàng
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(CreateReceipt));
