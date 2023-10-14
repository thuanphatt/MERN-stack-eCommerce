import moment from "moment";
import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Button, InputForm } from "components";
import avatarDefault from "assets/avatarDefault.jpg";
import clsx from "clsx";
import { apiUpdateCurrent } from "apis";
import { getCurrent } from "store/user/asyncActions";
import { toast } from "react-toastify";
const Personal = () => {
	const {
		register,
		formState: { errors, isDirty },
		reset,
		handleSubmit,
	} = useForm();
	const dispatch = useDispatch();
	const { current } = useSelector((state) => state.user);
	useEffect(() => {
		reset({
			email: current?.email,
			firstName: current?.firstName,
			lastName: current?.lastName,
			mobile: current?.mobile,
			avatar: current?.avatar,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [current]);
	const handleSubmitInfo = async (data) => {
		const formData = new FormData();
		if (data?.avatar.length > 0) formData.append("avatar", data?.avatar[0]);

		delete data.avatar;

		for (let i of Object.entries(data)) formData.append(i[0], i[1]);
		const response = await apiUpdateCurrent(formData);
		if (response.success) {
			dispatch(getCurrent());
			toast.success(response.mes);
		} else {
			toast.error(response.mes);
		}
	};
	console.log(current.avatar);
	return (
		<div className="w-full relative px-4">
			<header className="text-3xl font-semibold py-4 border-b border-main">Thông tin cá nhân</header>
			<form className="flex w-3/5 mx-auto flex-col gap-4 py-8" onSubmit={handleSubmit(handleSubmitInfo)}>
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
