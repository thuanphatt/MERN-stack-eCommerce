/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button, InputForm, Loading } from "components";
import { apiCreateCoupon } from "apis";
import { showModal } from "store/app/appSlice";
import withBaseComponent from "hocs/withBaseComponent";

const CreateCoupon = ({ dispatch }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();
	const handleCreateCoupon = async (data) => {
		const finalPayload = { ...data };
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiCreateCoupon(finalPayload);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			reset();
		} else toast.error(response.mes);
	};

	return (
		<div className={clsx("w-full")}>
			<h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b w-full tracking-tight">
				<span>Tạo mã giảm giá</span>
			</h1>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleCreateCoupon)}>
					<InputForm
						label="Tên mã giảm giá"
						register={register}
						errors={errors}
						id="name"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						fullWidth
						placeholder="Nhập tên của mã giảm giá"
					/>

					<div className="w-full my-6">
						<InputForm
							type="number"
							label="Số tiền giảm (VND)"
							register={register}
							errors={errors}
							id="discount"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
							placeholder="Nhập mức giảm của mã giảm giá"
						/>
					</div>

					<div className="w-full my-6">
						<InputForm
							label="Thời hạn (ngày)"
							register={register}
							errors={errors}
							id="expiry"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
							placeholder="VD: Nhập 7 => sẽ có hiệu lực 7 ngày kể từ ngày tạo"
						/>
					</div>

					<div className="my-6">
						<Button fullwidth type="submit">
							Tạo mã giảm giá
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(CreateCoupon));
