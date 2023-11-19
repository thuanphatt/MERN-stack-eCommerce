import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoReturnDownBack } from "react-icons/io5";
import { toast } from "react-toastify";

import { apiUpdateContent } from "apis";
import { Button, Loading } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import { showModal } from "store/app/appSlice";
import { getBase64 } from "utils/helpers";

const UpdateContent = ({ editContent, setEditContent, render, dispatch }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		reset,
	} = useForm();

	const [preview, setPreview] = useState({
		logo: null,
		banners: [],
		bannerSub: [],
	});
	useEffect(() => {
		reset({
			logo: editContent?.logo || "",
		});
		setPreview({
			logo: editContent?.logo || "",
			banners: editContent?.banners || [],
			bannerSub: editContent?.bannerSub || [],
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editContent]);
	const handlePreviewThumb = async (file) => {
		if (file?.type !== "image/png" && file?.type !== "image/jpeg" && file) {
			toast.warning("File không được hỗ trợ");
			return;
		} else {
			const base64 = await getBase64(file);
			setPreview((prev) => ({ ...prev, logo: base64 }));
		}
	};
	const handlePreviewBanners = async (files) => {
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
		setPreview((prev) => ({ ...prev, banners: imagesPreview }));
	};
	const handlePreviewBannerSub = async (files) => {
		const imagesPreview = [];
		if (!files) {
			return;
		}
		for (let file of files) {
			if (file.type !== "image/png" && file.type !== "image/jpeg" && file) {
				toast.warning("File không được hỗ trợ");
				return;
			}
			const base64 = await getBase64(file);
			imagesPreview.push({ name: file.name, path: base64 });
		}
		setPreview((prev) => ({ ...prev, bannerSub: imagesPreview }));
	};
	useEffect(() => {
		if (watch("logo") instanceof FileList && watch("logo").length > 0) handlePreviewThumb(watch("logo")[0]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch("logo")]);
	useEffect(() => {
		if (watch("banners") instanceof FileList && watch("banners").length > 0);
		handlePreviewBanners(watch("banners"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch("banners")]);
	useEffect(() => {
		if (watch("bannerSub") instanceof FileList && watch("bannerSub").length > 0);
		handlePreviewBannerSub(watch("bannerSub"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch("bannerSub")]);
	const handleUpdateContent = async (data) => {
		const finalPayload = { ...data };
		const formData = new FormData();
		finalPayload.logo = data?.logo?.length === 0 ? preview.logo : data.logo[0];
		for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
		finalPayload.banners = data?.banners?.length === 0 ? preview.banners : data.banners;
		for (let banner of finalPayload.banners) formData.append("banners", banner);
		finalPayload.bannerSub = data?.bannerSub?.length === 0 ? preview.bannerSub : data.bannerSub;
		for (let banner of finalPayload.bannerSub) formData.append("bannerSub", banner);
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiUpdateContent(formData, editContent?._id);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			setEditContent(null);
			render();
		} else toast.error(response.mes);
	};
	return (
		<div className="w-full flex flex-col gap-4 relative bg-gray-100 h-full">
			<div className="flex items-center justify-betweend p-4 border-b w-full">
				<h1 className="text-3xl font-bold tracking-tight ">
					<span>Cập nhật nội dung</span>
				</h1>
				<span
					className="ml-auto cursor-pointer hover:underline"
					onClick={() => {
						setEditContent(null);
					}}
				>
					<IoReturnDownBack size={24} />
				</span>
			</div>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleUpdateContent)}>
					<div className="flex flex-col gap-2 mt-6 relative">
						<label htmlFor="logo" className="font-semibold">
							Tải ảnh logo lên
						</label>
						<input
							type="file"
							id="logo"
							{...register("logo", {
								required: "Không được bỏ trống trường này",
							})}
						/>
						{errors["logo"] && (
							<small className="text-sm text-red-600 absolute bottom-[-20px] w-[240px]">
								{errors["logo"]?.message}
							</small>
						)}
					</div>
					{preview.logo && (
						<div className="my-4">
							<img src={preview.logo} alt="thumbnail" className="w-[200px] object-contain" />
						</div>
					)}
					<div className="flex flex-col gap-2 mt-6 relative">
						<label htmlFor="banners" className="font-semibold">
							Tải các ảnh banner của hệ thống
						</label>
						<input
							type="file"
							id="banners"
							multiple
							{...register("banners", {
								required: "Không được bỏ trống trường này",
							})}
						/>
						{errors["banners"] && (
							<small className="text-sm text-red-600 absolute bottom-[-20px] w-[240px]">
								{errors["banners"]?.message}
							</small>
						)}
					</div>
					{preview.banners && (
						<div className="my-4 flex flex-wrap gap-2">
							{preview.banners?.map((el) => (
								<div className="relative w-fit" key={el}>
									<img src={el} alt="thumbnail" className="w-[200px] object-contain" />
								</div>
							))}
						</div>
					)}
					<div className="flex flex-col gap-2 mt-6 relative">
						<label htmlFor="bannerSub" className="font-semibold">
							Tải các ảnh banner phụ của hệ thống
						</label>
						<input
							type="file"
							id="bannerSub"
							multiple
							{...register("bannerSub", {
								required: "Không được bỏ trống trường này",
							})}
						/>
						{errors["bannerSub"] && (
							<small className="text-sm text-red-600 absolute bottom-[-20px] w-[240px]">
								{errors["bannerSub"]?.message}
							</small>
						)}
					</div>
					{preview.bannerSub && (
						<div className="my-4 flex flex-wrap gap-2">
							{preview.bannerSub?.map((el) => (
								<div className="relative w-fit" key={el}>
									<img src={el} alt="thumbnail" className="w-[200px] object-contain" />
								</div>
							))}
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

export default withBaseComponent(memo(UpdateContent));
