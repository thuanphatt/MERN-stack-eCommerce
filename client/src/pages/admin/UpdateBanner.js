import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoReturnDownBack } from "react-icons/io5";
import { toast } from "react-toastify";

import { apiUpdateBanner } from "apis";
import { Button, Loading } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import { showModal } from "store/app/appSlice";
import { getBase64 } from "utils/helpers";

const UpdateBlog = ({ editBanner, setEditBanner, render, dispatch }) => {
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
	useEffect(() => {
		reset({
			image: editBanner?.image || "",
		});

		setPreview({ image: editBanner?.image || "" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editBanner]);
	const handlePreviewThumb = async (file) => {
		const base64Thumb = await getBase64(file);
		setPreview((prev) => ({ ...prev, image: base64Thumb }));
	};
	const handleUpdateBlog = async (data) => {
		const finalPayload = { ...data };
		finalPayload.image = data?.image?.length === 0 ? preview.image : data.image[0];
		const formData = new FormData();
		for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiUpdateBanner(formData, editBanner?._id);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			setEditBanner(null);
			render();
		} else toast.error(response.mes);
	};

	useEffect(() => {
		if (watch("image") instanceof FileList && watch("image").length > 0) handlePreviewThumb(watch("image")[0]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch("image")]);

	return (
		<div className="w-full flex flex-col gap-4 relative bg-gray-100 h-full">
			<div className="flex items-center justify-betweend p-4 border-b w-full">
				<h1 className="text-3xl font-bold tracking-tight ">
					<span>Cập nhật banner</span>
				</h1>
				<span
					className="ml-auto cursor-pointer hover:underline"
					onClick={() => {
						setEditBanner(null);
					}}
				>
					<IoReturnDownBack size={24} />
				</span>
			</div>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleUpdateBlog)}>
					<div className="flex flex-col gap-2 mt-6 relative">
						<label htmlFor="image" className="font-semibold">
							Tải ảnh của banner
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
							<img src={preview.image} alt="imagee" className="w-[500px] object-contain" />
						</div>
					)}

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

export default withBaseComponent(memo(UpdateBlog));
