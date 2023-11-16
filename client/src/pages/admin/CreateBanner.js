import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { getBase64 } from "utils/helpers";
import { Button, Loading } from "components";
import { apiCreateBanner } from "apis";
import { showModal } from "store/app/appSlice";

const CreateBanner = () => {
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
		const response = await apiCreateBanner(formData);
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
				<span>Tạo banner</span>
			</h1>
			<div className="p-4 flex items-center justify-center">
				<form onSubmit={handleSubmit(handleCreateBlog)}>
					<div className="flex flex-col gap-2 mt-6 relative">
						<label htmlFor="image" className="font-semibold">
							Tải ảnh banner lên
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
							Tạo
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default memo(CreateBanner);
