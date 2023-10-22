import clsx from "clsx";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Button, InputForm, Loading } from "components";
import { apiCreateShipment } from "apis";
import { showModal } from "store/app/appSlice";

const CreateShip = () => {
	const dispatch = useDispatch();
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const handleCreateCategory = async (data) => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiCreateShipment(data);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			reset();
		} else toast.error(response.mes);
	};
	return (
		<div className={clsx("w-full")}>
			<h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b w-full tracking-tight">
				<span>Tạo phí vận chuyển</span>
			</h1>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleCreateCategory)} className="flex flex-col gap-4">
					<InputForm
						label="Tên phí vận chuyển"
						register={register}
						errors={errors}
						id="name"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						fullWidth
						placeholder="Nhập tên của phí vận chuyển"
					/>
					<InputForm
						label="Chi phí vận chuyển"
						register={register}
						errors={errors}
						id="cost"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						fullWidth
						placeholder="Nhập chi phí vận chuyển"
					/>
					<InputForm
						label="Mức miễn phí vận chuyển"
						register={register}
						errors={errors}
						id="freeship"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						fullWidth
						placeholder="Nhập mức miễn phí vận chuyển"
					/>

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

export default memo(CreateShip);
