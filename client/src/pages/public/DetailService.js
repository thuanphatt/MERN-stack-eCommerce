/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button, InputForm, Loading, MarkdownEditor, Select } from "components";
import { apiCreateService, apiGetProducts } from "apis";
import { showModal } from "store/app/appSlice";
import withBaseComponent from "hocs/withBaseComponent";
import { useSelector } from "react-redux";

const DetailService = ({ dispatch }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
		watch,
	} = useForm();
	const [products, setProducts] = useState(null);
	const [invalidFields, setInvalidFields] = useState([]);
	const [payload, setPayload] = useState({
		description: "",
	});
	const category = watch("type");
	const { categories } = useSelector((state) => state.app);
	const handleCreateService = async (data) => {
		const finalPayload = { ...data, ...payload };
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiCreateService(finalPayload);
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
	const changeValue = useCallback(
		(e) => {
			setPayload(e);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[payload]
	);
	useEffect(() => {
		fetchProducts();
	}, [category]);
	return (
		<div className={clsx("w-full")}>
			<h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b w-full tracking-tight">
				<span>Tạo dịch vụ</span>
			</h1>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleCreateService)}>
					<InputForm
						label="Tên dịch vụ"
						register={register}
						errors={errors}
						id="name"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						fullWidth
						placeholder="Nhập tên của dịch vụ"
					/>

					<MarkdownEditor
						name="description"
						changeValue={changeValue}
						label="Mô tả"
						invalidFields={invalidFields}
						setInvalidFields={setInvalidFields}
					/>

					<div className="w-full my-6">
						<InputForm
							label="Phí của dịch vụ"
							register={register}
							errors={errors}
							id="price"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
							placeholder="Nhập tên phí của dịch vụ"
						/>
					</div>
					<div className="w-full my-6">
						<Select
							label="Loại dịch vụ"
							register={register}
							errors={errors}
							id="type"
							style={clsx("flex-1")}
							validate={{ required: "Không được để trống trường này" }}
							options={categories
								?.filter((cate) => cate.title.includes("HỆ THỐNG"))
								.map((el) => ({
									code: el.title,
									value: el.title,
								}))}
						/>
					</div>
					<div className="w-full my-6">
						<Select
							multiple
							label="Danh sách sản phẩm"
							register={register}
							errors={errors}
							id="products"
							style={clsx("flex-1")}
							styleSelect={clsx("py-[100px]")}
							validate={{ required: "Không được để trống trường này" }}
							options={products?.map((el) => ({
								code: el._id,
								value: el.title,
							}))}
						/>
					</div>

					<div className="my-6">
						<Button fullwidth type="submit">
							Tạo dịch vụ
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(DetailService));
