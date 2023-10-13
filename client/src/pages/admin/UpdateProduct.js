import clsx from "clsx";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoReturnDownBack } from "react-icons/io5";
import { toast } from "react-toastify";

import { Button, InputForm, Loading, MarkdownEditor, Select } from "components";
import { getBase64, validate } from "utils/helpers";
import { showModal } from "store/app/appSlice";
import { apiUpdateProduct } from "apis";

const UpdateProduct = ({ editProduct, render, setEditProduct }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		reset,
	} = useForm();
	const { categories } = useSelector((state) => state.app);
	const [payload, setPayload] = useState({
		description: "",
	});
	const dispatch = useDispatch();
	const [preview, setPreview] = useState({
		thumb: null,
		images: [],
	});
	const [invalidFields, setInvalidFields] = useState([]);
	const changeValue = useCallback(
		(e) => {
			setPayload(e);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[payload]
	);

	useEffect(() => {
		reset({
			title: editProduct?.title || "",
			color: editProduct?.color || "",
			quantity: editProduct?.quantity || "",
			price: editProduct?.price || "",
			brand: editProduct?.brand?.toLowerCase() || "",
			category: editProduct?.category[0] || "",
		});
		setPayload({
			description:
				typeof editProduct?.description === "object" ? editProduct?.description?.join(", ") : editProduct?.description,
		});
		setPreview({ thumb: editProduct?.thumb || "", images: editProduct?.images || [] });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editProduct]);
	const handlePreviewThumb = async (file) => {
		const base64Thumb = await getBase64(file);
		setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
	};
	const handlePreviewImages = async (files) => {
		const imagesPreview = [];
		if (!files) {
			return;
		}
		for (let file of files) {
			if (file.type !== "image/png" && file.type !== "image/jpeg") {
				toast.warning("File không được hỗ trợ");
				return;
			}
			const base64 = await getBase64(file);
			imagesPreview.push(base64);
		}
		setPreview((prev) => ({ ...prev, images: imagesPreview }));
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
	const handleUpdateProduct = async (data) => {
		const invalids = validate(payload, setInvalidFields);
		if (invalids === 0) {
			if (data.category) data.category = categories?.find((el) => el.title === data.category)?.title;
			const finalPayload = { ...data, ...payload };
			finalPayload.thumb = data?.thumb?.length === 0 ? preview.thumb : data.thumb[0];
			const formData = new FormData();
			for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
			finalPayload.images = data?.images?.length === 0 ? preview.images : data.images;
			for (let image of finalPayload.images) formData.append("images", image);
			dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
			const response = await apiUpdateProduct(formData, editProduct?._id);
			dispatch(showModal({ isShowModal: false, modalChildren: null }));
			if (response.success) {
				toast.success(response.mes);
				render();
				setEditProduct(null);
			} else toast.error(response.mes);
		}
	};
	return (
		<div className="w-full flex flex-col gap-4 relative bg-gray-100">
			<div className="flex items-center justify-betweend p-4 border-b w-full">
				<h1 className="text-3xl font-bold tracking-tight ">
					<span>Cập nhật sản phẩm</span>
				</h1>
				<span
					className="ml-auto cursor-pointer hover:underline"
					onClick={() => {
						setEditProduct(null);
					}}
				>
					<IoReturnDownBack size={24} />
				</span>
			</div>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleUpdateProduct)}>
					<InputForm
						label="Tên sản phẩm"
						register={register}
						errors={errors}
						id="title"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						fullWidth
						placeholder="Nhập tên của sản phẩm"
					/>
					<div className="w-full flex gap-4 my-6 items-center">
						<InputForm
							type="number"
							label="Giá"
							register={register}
							errors={errors}
							id="price"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							style={clsx("flex-1")}
							placeholder="Nhập giá của sản phẩm"
						/>
						<InputForm
							type="number"
							label="Số lượng"
							register={register}
							errors={errors}
							id="quantity"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							style={clsx("flex-1")}
							placeholder="Nhập số lượng của sản phẩm"
						/>
						<InputForm
							label="Màu sắc"
							register={register}
							errors={errors}
							id="color"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							style={clsx("flex-1")}
							placeholder="Nhập màu sắc của sản phẩm"
						/>
					</div>
					<div className="w-full flex gap-4 my-6 items-center">
						<Select
							label="Danh mục"
							register={register}
							errors={errors}
							id="category"
							style={clsx("flex-1")}
							validate={{ required: "Không được để trống trường này" }}
							options={categories?.map((el) => ({
								code: el.title,
								value: el.title,
							}))}
						/>
						<Select
							label="Thương hiệu (Không bắt buộc)"
							register={register}
							errors={errors}
							id="brand"
							style={clsx("flex-1")}
							options={categories
								?.find((el) => el.title === watch("category"))
								?.brand?.map((item) => ({ code: item.toLowerCase(), value: item }))}
						/>
					</div>
					<MarkdownEditor
						value={payload?.description}
						name="description"
						changeValue={changeValue}
						label="Mô tả"
						invalidFields={invalidFields}
						setInvalidFields={setInvalidFields}
					/>
					<div className="flex flex-col gap-2 mt-6 relative">
						<label htmlFor="thumb" className="font-semibold">
							Tải ảnh chính của sản phẩm
						</label>
						<input type="file" id="thumb" {...register("thumb")} />
						{errors["thumb"] && (
							<small className="text-sm text-red-600 absolute bottom-[-20px] w-[240px]">
								{errors["thumb"]?.message}
							</small>
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
						<input type="file" id="products" multiple {...register("images")} />
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
									<img src={el} alt="thumbnail" className="w-[200px] object-contain" />
								</div>
							))}
						</div>
					)}
					<div className="my-6">
						<Button fullwidth type="submit">
							Cập nhật sản phẩm
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default memo(UpdateProduct);
