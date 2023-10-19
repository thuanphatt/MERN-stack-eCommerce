import { apiUpdateCate } from "apis";
import clsx from "clsx";
import { Button, InputForm, Loading, Select } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoReturnDownBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import { getBase64, validate } from "utils/helpers";

const UpdateCate = ({ editCategory, setEditCategory, render, dispatch }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		reset,
	} = useForm();

	const [preview, setPreview] = useState({
		image: "",
	});
	const { categories } = useSelector((state) => state.app);

	useEffect(() => {
		reset({
			title: editCategory?.title || "",
			image: editCategory?.image || "",
			brand: editCategory?.brand || [],
		});

		setPreview({ image: editCategory?.image || "" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editCategory]);
	const handlePreviewThumb = async (file) => {
		const base64Thumb = await getBase64(file);
		setPreview((prev) => ({ ...prev, image: base64Thumb }));
	};
	const handleUpdateCategory = async (data) => {
		const finalPayload = { ...data };
		console.log(finalPayload);
		// finalPayload.image = data?.image?.length === 0 ? preview.image : data.image[0];
		// const formData = new FormData();
		// for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
		// console.log(formData);
		// dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		// const response = await apiUpdateCate(formData, editCategory?._id);
		// dispatch(showModal({ isShowModal: false, modalChildren: null }));
		// if (response.success) {
		// 	toast.success(response.mes);
		// 	render();
		// 	setEditCategory(null);
		// } else toast.error(response.mes);
	};

	useEffect(() => {
		if (watch("image") instanceof FileList && watch("image").length > 0) handlePreviewThumb(watch("image")[0]);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch("image")]);
	return (
		<div className="w-full flex flex-col gap-4 relative bg-gray-100">
			<div className="flex items-center justify-betweend p-4 border-b w-full">
				<h1 className="text-3xl font-bold tracking-tight ">
					<span>Cập nhật sản phẩm</span>
				</h1>
				<span
					className="ml-auto cursor-pointer hover:underline"
					onClick={() => {
						setEditCategory(null);
					}}
				>
					<IoReturnDownBack size={24} />
				</span>
			</div>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleUpdateCategory)}>
					<InputForm
						label="Tên danh mục"
						register={register}
						errors={errors}
						id="title"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						fullWidth
						placeholder="Nhập tên của danh mục"
					/>

					<div className="w-full flex gap-4 my-6 items-center">
						<InputForm
							label="Tên thương hiệu"
							register={register}
							errors={errors}
							id="brand"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
							placeholder="Nhập tên thương hiệu của danh mục"
						/>
					</div>
					{/* {editCategory.brand.map((el) => (
						<div className="flex flex-col gap-2 relative">
							<label htmlFor={el} className="font-medium">
								{el}
							</label>
							<input
								type="text"
								id={el}
								className="p-2 rounded-sm border-2 border-gray-500 w-full placeholder:text-sm outline-none my-auto max-h-[42px]"
							/>
						</div>
					))} */}

					<div className="flex flex-col gap-2 mt-6 relative">
						<label htmlFor="image" className="font-semibold">
							Tải ảnh chính của sản phẩm
						</label>
						<input type="file" id="image" {...register("image")} />
						{errors["image"] && (
							<small className="text-sm text-red-600 absolute bottom-[-20px] w-[240px]">
								{errors["image"]?.message}
							</small>
						)}
					</div>
					{preview.image && (
						<div className="my-4">
							<img src={preview.image} alt="imagee" className="w-[200px] object-contain" />
						</div>
					)}

					<div className="my-6">
						<Button fullwidth type="submit">
							Cập nhật danh mục
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(UpdateCate));
