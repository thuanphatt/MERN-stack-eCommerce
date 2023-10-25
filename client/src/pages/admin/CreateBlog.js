import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { getBase64 } from "utils/helpers";
import { Button, InputForm, Loading } from "components";
import { apiCreateBlog } from "apis";
import { showModal } from "store/app/appSlice";

const CreateCategory = () => {
	const dispatch = useDispatch();
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		reset,
	} = useForm();

	const [preview, setPreview] = useState({
		image: null,
	});

	const handlePreviewThumb = async (file) => {
		if (file?.type !== "image/png" && file?.type !== "image/jpeg" && file) {
			toast.warning("File không được hỗ trợ");
			return;
		} else {
			const base64 = await getBase64(file);
			setPreview((prev) => ({ ...prev, image: base64 }));
		}
	};

	useEffect(() => {
		if (watch("image") instanceof FileList && watch("image").length > 0) handlePreviewThumb(watch("image")[0]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch("image")]);

	const handleCreateBlog = async (data) => {
		const finalPayload = { ...data };
		const formData = new FormData();
		for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
		if (finalPayload.image) formData.append("image", finalPayload.image[0]);
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiCreateBlog(formData);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			reset();
			setPreview((preview.image = ""));
		} else toast.error(response.mes);
	};
	return (
		<div className={clsx("w-full")}>
			<h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b w-full tracking-tight">
				<span>Tạo tin tức</span>
			</h1>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleCreateBlog)}>
					<InputForm
						label="Tên tin tức"
						register={register}
						errors={errors}
						id="title"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						fullWidth
						placeholder="Nhập tên của tin tức"
					/>

					<div className="w-full my-6">
						<InputForm
							label="Mô tả"
							register={register}
							errors={errors}
							id="description"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
							placeholder="Nhập tên mô tả của danh mục"
						/>
					</div>

					<div className="w-full my-6">
						<InputForm
							label="Danh mục"
							register={register}
							errors={errors}
							id="category"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
							placeholder="Nhập tên danh mục của danh mục"
						/>
					</div>

					<div className="flex flex-col gap-2 mt-6 relative">
						<label htmlFor="image" className="font-semibold">
							Tải ảnh chính của tin tức
						</label>
						<input
							type="file"
							id="image"
							{...register("image", {
								required: "Không được bỏ trống trường này",
							})}
						/>
						{errors["image"] && (
							<small className="text-sm text-red-600 absolute bottom-[-20px] w-[240px]">
								{errors["image"]?.message}
							</small>
						)}
					</div>
					{preview.image && (
						<div className="my-4">
							<img src={preview.image} alt="thumbnail" className="w-[200px] object-contain" />
						</div>
					)}

					<div className="my-6">
						<Button fullwidth type="submit">
							Tạo tin tức
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default memo(CreateCategory);
