import { apiChangePassword } from "apis";
import { Button, InputForm, Loading } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";

const ChangePassword = ({ dispatch }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();
	const { current } = useSelector((state) => state.user);
	const handleChangePassword = async (data) => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiChangePassword(
			{ password: data.password, newPassword: data.newPassword, confirmPassword: data.newPasswordConfirm },
			current._id
		);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));

		if (response.success) {
			reset({
				password: "",
				newPassword: "",
				newPasswordConfirm: "",
			});
			toast.success(response.mes);
		} else toast.error(response.mes);
	};
	return (
		<div className="w-full relative px-4 ">
			<header className="text-3xl font-semibold py-4 border-b border-main">Đổi mật khẩu</header>
			<div className="flex items-center justify-center py-4">
				<form onSubmit={handleSubmit(handleChangePassword)} className="flex flex-col gap-6">
					<InputForm
						type="password"
						label="Mật khẩu hiện tại"
						register={register}
						errors={errors}
						id="password"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
					/>
					<InputForm
						type="password"
						label="Mật khẩu mới"
						register={register}
						errors={errors}
						id="newPassword"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
					/>
					<InputForm
						type="password"
						label="Xác nhật mật khẩu mới"
						register={register}
						errors={errors}
						id="newPasswordConfirm"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
					/>
					<div className="my-6">
						<Button type="submit">Thay đổi</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(ChangePassword));
