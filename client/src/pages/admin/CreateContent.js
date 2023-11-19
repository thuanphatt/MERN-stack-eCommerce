import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { getBase64 } from "utils/helpers";
import { Button, Loading } from "components";
import { apiCreateContent } from "apis";
import { showModal } from "store/app/appSlice";

const CreateContent = () => {
	const dispatch = useDispatch();
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
		for (let file of files) {
			if (file.type !== "image/png" && file.type !== "image/jpeg" && file) {
				toast.warning("File không được hỗ trợ");
				return;
			}
			const base64 = await getBase64(file);
			imagesPreview.push({ name: file.name, path: base64 });
		}
		setPreview((prev) => ({ ...prev, banners: imagesPreview }));
	};
	const handlePreviewBannerSub = async (files) => {
		const imagesPreview = [];
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
	const handleCreateContent = async (data) => {
		const finalPayload = { ...data };
		const formData = new FormData();
		for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
		if (finalPayload.logo) formData.append("logo", finalPayload.logo[0]);
		if (finalPayload.banners) {
			for (let banner of finalPayload.banners) formData.append("banners", banner);
		}
		if (finalPayload.bannerSub) {
			for (let bannerSu of finalPayload.bannerSub) formData.append("bannerSub", bannerSu);
		}
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiCreateContent(formData);
		console.log(response);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			reset();
			setPreview({
				logo: null,
				banners: [],
				bannerSub: [],
			});
		} else toast.error(response.mes);
	};
	return (
		<div className={clsx("w-full")}>
			<h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b w-full tracking-tight">
				<span>Tạo banner</span>
			</h1>
			<div className="p-4 flex items-center justify-center">
				<form onSubmit={handleSubmit(handleCreateContent)}>
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
								<div className="relative w-fit" key={el.name}>
									<img src={el.path} alt="thumbnail" className="w-[200px] object-contain" />
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
								<div className="relative w-fit" key={el.name}>
									<img src={el.path} alt="thumbnail" className="w-[200px] object-contain" />
								</div>
							))}
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

export default memo(CreateContent);
