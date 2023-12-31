import clsx from "clsx";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { validate, getBase64 } from "utils/helpers";
import { Button, InputForm, Select, MarkdownEditor, Loading } from "components";
import { apiCreateProduct } from "apis";
import { showModal } from "store/app/appSlice";
import { colorArr } from "utils/contants";

const CreateProduct = () => {
	const dispatch = useDispatch();
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

	const [invalidFields, setInvalidFields] = useState([]);
	const [preview, setPreview] = useState({
		thumb: null,
	});
	const changeValue = useCallback(
		(e) => {
			setPayload(e);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[payload]
	);
	const handlePreviewThumb = async (file) => {
		if (file?.type !== "image/png" && file?.type !== "image/jpeg" && file) {
			toast.warning("File không được hỗ trợ");
			return;
		} else {
			const base64 = await getBase64(file);
			setPreview((prev) => ({ ...prev, thumb: base64 }));
		}
	};

	useEffect(() => {
		if (watch("thumb") instanceof FileList && watch("thumb").length > 0) handlePreviewThumb(watch("thumb")[0]);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch("thumb")]);

	const handleCreateProduct = async (data) => {
		const invalids = validate(payload, setInvalidFields);
		if (invalids === 0) {
			if (data.category) data.category = categories?.find((el) => el._id === data.category).title;
			const finalPayload = { ...data, ...payload };
			const formData = new FormData();
			for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
			if (finalPayload.thumb) formData.append("thumb", finalPayload?.thumb[0]);
			dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
			const response = await apiCreateProduct(formData);
			dispatch(showModal({ isShowModal: false, modalChildren: null }));
			if (response.success) {
				toast.success(response.mes);
				reset();
				setPayload({
					thumb: null,
				});
				setPreview({
					thumb: null,
				});
			} else toast.error(response.mes);
		}
	};
	return (
		<div className={clsx("w-full")}>
			<h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b w-full tracking-tight">
				<span>Tạo sản phẩm</span>
			</h1>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleCreateProduct)}>
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
						<Select
							label="Màu sắc"
							register={register}
							errors={errors}
							id="color"
							style={clsx("flex-1")}
							validate={{ required: "Không được để trống trường này" }}
							options={colorArr?.map((el) => ({
								value: el.value,
								code: el.value,
							}))}
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
								code: el._id,
								value: el.title,
							}))}
						/>
						<Select
							label="Thương hiệu (Không bắt buộc)"
							register={register}
							errors={errors}
							id="brand"
							style={clsx("flex-1 md:block hidden")}
							options={categories
								?.find((el) => el._id === watch("category"))
								?.brand?.map((item) => ({ code: item, value: item }))}
						/>
					</div>
					<div className="w-full my-6">
						<InputForm
							fullWidth
							label="Video mô tả"
							register={register}
							errors={errors}
							id="video"
							style={clsx("flex-1")}
							placeholder="Nhập url video mô tả của sản phẩm"
						/>
					</div>
					<MarkdownEditor
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
						<input
							type="file"
							id="thumb"
							{...register("thumb", {
								required: "Không được bỏ trống trường này",
							})}
						/>
						{errors["thumb"] && (
							<small className="text-sm text-red-600 absolute bottom-[-20px] w-[240px]">
								{errors["thumb"]?.message}
							</small>
						)}
					</div>
					{preview.thumb && (
						<div className="my-4">
							<img src={preview.thumb} alt="thumbnail" className="w-[200px] h-[200px] object-contain" />
						</div>
					)}

					<div className="my-6">
						<Button fullwidth type="submit">
							Tạo sản phẩm
						</Button>
					</div>
				</form>
				<div className="md:hidden block h-[50px]"></div>
			</div>
		</div>
	);
};

export default memo(CreateProduct);
