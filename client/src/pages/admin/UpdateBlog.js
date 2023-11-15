import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoReturnDownBack } from "react-icons/io5";
import { toast } from "react-toastify";

import { apiGetBlogCategories, apiUpdateBlog } from "apis";
import { Button, InputForm, Loading, Select } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import { showModal } from "store/app/appSlice";
import { getBase64 } from "utils/helpers";
import clsx from "clsx";

const UpdateBlog = ({ editBlog, setEditBlog, render, dispatch }) => {
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
	const [blogCategories, setBlogCategories] = useState(null);
	useEffect(() => {
		reset({
			title: editBlog?.title || "",
			image: editBlog?.image || "",
			description: editBlog?.description || "",
			category: editBlog?.category || "",
		});

		setPreview({ image: editBlog?.image || "" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editBlog]);
	const handlePreviewThumb = async (file) => {
		const base64Thumb = await getBase64(file);
		setPreview((prev) => ({ ...prev, image: base64Thumb }));
	};
	const fetchBlogCategories = async () => {
		const response = await apiGetBlogCategories();
		if (response.success) setBlogCategories(response.blogCategories);
	};
	const handleUpdateBlog = async (data) => {
		const finalPayload = { ...data };
		finalPayload.image = data?.image?.length === 0 ? preview.image : data.image[0];
		const formData = new FormData();
		for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiUpdateBlog(formData, editBlog?._id);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			setEditBlog(null);
			render();
		} else toast.error(response.mes);
	};

	useEffect(() => {
		if (watch("image") instanceof FileList && watch("image").length > 0) handlePreviewThumb(watch("image")[0]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch("image")]);
	useEffect(() => {
		fetchBlogCategories();
	}, []);
	return (
		<div className="w-full flex flex-col gap-4 relative bg-gray-100 h-full">
			<div className="flex items-center justify-betweend p-4 border-b w-full">
				<h1 className="text-3xl font-bold tracking-tight ">
					<span>Cập nhật tin tức</span>
				</h1>
				<span
					className="ml-auto cursor-pointer hover:underline"
					onClick={() => {
						setEditBlog(null);
					}}
				>
					<IoReturnDownBack size={24} />
				</span>
			</div>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleUpdateBlog)}>
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
						<Select
							label="Danh mục"
							register={register}
							errors={errors}
							id="category"
							style={clsx("flex-1")}
							validate={{ required: "Không được để trống trường này" }}
							options={blogCategories?.map((el) => ({
								code: el.title,
								value: el.title,
							}))}
						/>
					</div>

					<div className="flex flex-col gap-2 mt-6 relative">
						<label htmlFor="image" className="font-semibold">
							Tải ảnh của danh mục
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
							Cập nhật tin tức
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(UpdateBlog));
