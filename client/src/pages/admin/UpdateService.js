import React, { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoReturnDownBack } from "react-icons/io5";
import { toast } from "react-toastify";

import { apiUpdateService } from "apis";
import { Button, InputForm, Loading, MarkdownEditor, Select } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import { showModal } from "store/app/appSlice";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { validate } from "utils/helpers";

const UpdateService = ({ editService, setEditService, render, dispatch, services }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();
	const [payload, setPayload] = useState({
		description: "",
	});
	const { categories } = useSelector((state) => state.app);
	useEffect(() => {
		reset({
			name: editService?.name || "",
			type: editService?.type || "",

			description: editService?.description || "",
			products: editService?.products || "",
			totalPrice: services
				.filter((el) => el._id === editService._id)[0]
				.products?.reduce((sum, product) => product.price + sum, 0),
		});
		setPayload({
			description:
				typeof editService?.description === "object" ? editService?.description?.join(", ") : editService?.description,
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editService]);
	const [invalidFields, setInvalidFields] = useState([]);
	const changeValue = useCallback(
		(e) => {
			setPayload(e);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[payload]
	);

	const handleUpdateBlog = async (data) => {
		const invalids = validate(payload, setInvalidFields);
		if (invalids === 0) {
			const finalPayload = { ...data, ...payload };
			dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
			const response = await apiUpdateService(finalPayload, editService?._id);
			dispatch(showModal({ isShowModal: false, modalChildren: null }));
			if (response.success) {
				toast.success(response.mes);
				setEditService(null);
				render();
			} else toast.error(response.mes);
		}
	};
	return (
		<div className="w-full flex flex-col gap-4 relative bg-gray-100 h-full">
			<div className="flex items-center justify-betweend p-4 border-b w-full">
				<h1 className="text-3xl font-bold tracking-tight">
					<span>Cập nhật dịch vụ</span>
				</h1>
				<span
					className="ml-auto cursor-pointer hover:underline"
					onClick={() => {
						setEditService(null);
					}}
				>
					<IoReturnDownBack size={24} />
				</span>
			</div>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleUpdateBlog)}>
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
						value={payload?.description}
						name="description"
						changeValue={changeValue}
						label="Mô tả"
						invalidFields={invalidFields}
						setInvalidFields={setInvalidFields}
					/>
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
							options={editService?.products.map((el) => ({
								code: el._id,
								value: el.title,
							}))}
						/>
					</div>
					<div className="w-full my-6">
						<InputForm
							disabled
							label="Tổng phí"
							register={register}
							errors={errors}
							id="totalPrice"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
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

export default withBaseComponent(memo(UpdateService));
