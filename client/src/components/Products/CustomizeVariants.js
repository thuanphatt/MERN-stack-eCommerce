import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoReturnDownBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Button, InputForm, Loading } from "components";
import { getBase64 } from "utils/helpers";
import Swal from "sweetalert2";
import { apiAddVarriant } from "apis";
import { showModal } from "store/app/appSlice";

const CustomizeVariants = ({ render, customizeVariant, setCustomizeVariant }) => {
	const dispatch = useDispatch();
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		reset,
	} = useForm();
	const [preview, setPreview] = useState({
		thumb: null,
		images: [],
	});
	const handlePreviewThumb = async (file) => {
		if (file?.type !== "image/png" && file?.type !== "image/jpeg" && file) {
			toast.warning("File không được hỗ trợ");
			return;
		} else {
			const base64 = await getBase64(file);
			setPreview((prev) => ({ ...prev, thumb: base64 }));
		}
	};
	const handlePreviewImages = async (files) => {
		const imagesPreview = [];
		for (let file of files) {
			if (file.type !== "image/png" && file.type !== "image/jpeg" && file) {
				toast.warning("File không được hỗ trợ");
				return;
			}
			const base64 = await getBase64(file);
			imagesPreview.push({ name: file.name, path: base64 });
		}
		setPreview((prev) => ({ ...prev, images: imagesPreview }));
	};
	const handleVarriant = async (data) => {
		if (data.color === customizeVariant.color) Swal.fire("Opps!", "Màu chưa vẫn thay đổi", "info");
		else {
			const formData = new FormData();
			for (let i of Object.entries(data)) formData.append(i[0], i[1]);
			if (data.thumb) formData.append("thumb", data.thumb[0]);
			if (data.images) {
				for (let image of data.images) formData.append("images", image);
			}
			dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
			const response = await apiAddVarriant(formData, customizeVariant._id);
			dispatch(showModal({ isShowModal: false, modalChildren: null }));
			if (response.success) {
				toast.success(response.mes);
				render();
				reset();
				setPreview({
					thumb: null,
					images: [],
				});
			} else toast.error(response.mes);
		}
	};

	useEffect(() => {
		if (watch("thumb") instanceof FileList && watch("thumb").length > 0) handlePreviewThumb(watch("thumb")[0]);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch("thumb")]);
	useEffect(() => {
		if (watch("images") instanceof FileList && watch("images").length > 0);
		handlePreviewImages(watch("images"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch("images")]);
	useEffect(() => {
		reset({
			title: customizeVariant.title,
			price: customizeVariant.price,
			color: customizeVariant.color,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [customizeVariant]);
	return (
		<div className="w-full flex flex-col gap-4 relative bg-gray-100">
			<div className="flex items-center justify-betweend p-4 border-b w-full">
				<h1 className="text-3xl font-bold tracking-tight ">
					<span>Tạo biến thể sản phẩm</span>
				</h1>
				<span
					className="ml-auto cursor-pointer hover:underline"
					onClick={() => {
						setCustomizeVariant(null);
					}}
				>
					<IoReturnDownBack size={24} />
				</span>
			</div>
			<form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit(handleVarriant)}>
				<div className="flex items-center gap-2">
					<InputForm
						label="Tên ban đầu của sản phẩm"
						register={register}
						errors={errors}
						id="title"
						fullWidth
						style={clsx("flex-1")}
					/>
				</div>
				<div className="w-full flex gap-4 my-6 flex-col">
					<InputForm
						type="number"
						label="Giá của biến thể"
						register={register}
						errors={errors}
						id="price"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						style={clsx("flex-1")}
						placeholder="Nhập giá của biến thể"
					/>
					<InputForm
						label="Màu sắc của biến thể"
						register={register}
						errors={errors}
						id="color"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						style={clsx("flex-1")}
						placeholder="Nhập màu sắc của biến thể"
					/>
				</div>
				<div className="flex flex-col gap-2 mt-6 relative">
					<label htmlFor="thumb" className="font-semibold">
						Tải ảnh chính của sản phẩm
					</label>
					<input
						type="file"
						id="thumb"
						{...register("thumb", {
							required: "Không được bỏ trống trường này",
						})}
					/>
					{errors["thumb"] && (
						<small className="text-sm text-red-600 absolute bottom-[-20px] w-[240px]">{errors["thumb"]?.message}</small>
					)}
				</div>
				{preview.thumb && (
					<div className="my-4">
						<img src={preview.thumb} alt="thumbnail" className="w-[200px] object-contain" />
					</div>
				)}
				<div className="flex flex-col gap-2 mt-6 relative">
					<label htmlFor="products" className="font-semibold">
						Tải các ảnh còn lại của sản phẩm
					</label>
					<input
						type="file"
						id="products"
						multiple
						{...register("images", {
							required: "Không được bỏ trống trường này",
						})}
					/>
					{errors["images"] && (
						<small className="text-sm text-red-600 absolute bottom-[-20px] w-[240px]">
							{errors["images"]?.message}
						</small>
					)}
				</div>
				{preview.images && (
					<div className="my-4 flex flex-wrap gap-2">
						{preview.images?.map((el) => (
							<div className="relative w-fit" key={el.name}>
								<img src={el.path} alt="thumbnail" className="w-[200px] object-contain" />
							</div>
						))}
					</div>
				)}
				<div className="my-6">
					<Button fullwidth type="submit">
						Tạo biến thể
					</Button>
				</div>
			</form>
		</div>
	);
};

export default memo(CustomizeVariants);
