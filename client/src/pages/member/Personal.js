import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Button, InputForm } from "components";
import avatarDefault from "assets/avatarDefault.jpg";
import clsx from "clsx";
import { apiUpdateCurrent } from "apis";
import { getCurrent } from "store/user/asyncActions";
import { toast } from "react-toastify";
import { getBase64 } from "utils/helpers";
const Personal = () => {
	const {
		register,
		formState: { errors, isDirty },
		reset,
		handleSubmit,
		watch,
	} = useForm();
	const dispatch = useDispatch();
	const { current } = useSelector((state) => state.user);
	const [preview, setPreview] = useState({
		avatar: "",
	});
	console.log(current);
	useEffect(() => {
		reset({
			email: current?.email,
			firstName: current?.firstName,
			lastName: current?.lastName,
			mobile: current?.mobile,
			avatar: current?.avatar,
			address: current?.address,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [current]);
	const handlePreviewThumb = async (file) => {
		console.log(file);
		if (file?.type !== "image/png" && file?.type !== "image/jpeg" && file) {
			toast.warning("File không được hỗ trợ");
			return;
		} else {
			const base64 = await getBase64(file);
			setPreview((prev) => ({ ...prev, avatar: base64 }));
		}
	};
	useEffect(() => {
		if (watch("avatar") instanceof FileList && watch("avatar").length > 0) handlePreviewThumb(watch("avatar")[0]);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch("avatar")]);
	const handleSubmitInfo = async (data) => {
		const formData = new FormData();
		if (data?.avatar.length > 0) formData.append("avatar", data?.avatar[0]);

		delete data.avatar;

		for (let i of Object.entries(data)) formData.append(i[0], i[1]);
		console.log(formData);
		const response = await apiUpdateCurrent(formData);
		if (response.success) {
			dispatch(getCurrent());
			setPreview({ avatar: "" });
			toast.success(response.mes);
		} else {
			toast.error(response.mes);
		}
	};
	return (
		<div className="w-full relative px-4">
			<header className="text-3xl font-semibold py-4 border-b border-main">Thông tin cá nhân</header>
			<form className="flex w-3/5 mx-auto flex-col gap-4 py-8" onSubmit={handleSubmit(handleSubmitInfo)}>
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-4">
						<span className="font-medium">Ảnh đại diện:</span>
						<label htmlFor="file">
							<img
								src={current?.avatar || avatarDefault}
								alt="avatar"
								className="w-20 h-20 object-cover rounded-full mx-auto"
							/>
						</label>
						<input type="file" id="file" hidden {...register("avatar")} />
					</div>
					{preview.avatar && (
						<div className="flex flex-col gap-4">
							<span className="font-medium text-sm">Ảnh xem trước:</span>
							<img src={preview.avatar} alt="avatar" className="w-40 h-40 object-cover" />
						</div>
					)}
				</div>

				<div className="flex items-center gap-2">
					<span className="font-medium ">Trạng thái:</span>
					<span className={clsx("text-green-500", current?.isBlocked && "text-red-50")}>
						{current?.isBlocked ? "Đã bị khóa" : "Đang hoạt động"}
					</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="font-medium">Vai trò:</span>
					<span>{+current?.role === 2001 ? "Admin" : "Người dùng"}</span>
				</div>
				<InputForm
					label="Email"
					register={register}
					errors={errors}
					id="email"
					validate={{
						required: "Không được bỏ trống trường này",
						pattern: {
							value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
							message: "Email không hợp lệ",
						},
					}}
				/>
				<InputForm
					label="Họ"
					register={register}
					errors={errors}
					id="firstName"
					validate={{
						required: "Không được bỏ trống trường này",
					}}
				/>
				<InputForm
					label="Tên"
					register={register}
					errors={errors}
					id="lastName"
					validate={{
						required: "Không được bỏ trống trường này",
					}}
				/>
				<InputForm
					label="Số điện thoại"
					register={register}
					errors={errors}
					id="mobile"
					validate={{
						required: "Không được bỏ trống trường này",
						pattern: {
							value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/im,
							message: "Số điện thoại không hợp lệ",
						},
					}}
				/>
				<InputForm
					label="Địa chỉ nhận hàng của bạn"
					register={register}
					errors={errors}
					id="address"
					validate={{
						required: "Không được bỏ trống trường này",
					}}
					fullWidth
					placeholder="Nhập tên địa chỉ nhận hàng của bạn"
					style={clsx("text-sm")}
				/>

				<div className="flex items-center gap-2">
					<span className="font-medium">Ngày tạo:</span>
					<span>{moment(current?.createdAt).fromNow()}</span>
				</div>
				{isDirty && (
					<div className="w-full justify-end flex">
						<Button type="submit">Cập nhật thông tin</Button>
					</div>
				)}
			</form>
		</div>
	);
};
export default memo(Personal);
