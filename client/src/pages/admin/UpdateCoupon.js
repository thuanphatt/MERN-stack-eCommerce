import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoReturnDownBack } from "react-icons/io5";
import { toast } from "react-toastify";

import { apiUpdateService } from "apis";
import { Button, InputForm, Loading } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import { showModal } from "store/app/appSlice";
const UpdateCoupon = ({ editCoupon, setEditCoupon, render, dispatch }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	useEffect(() => {
		reset({
			name: editCoupon?.name || "",
			discount: editCoupon?.discount || "",

			expiry: editCoupon?.expiry || "",
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editCoupon]);

	const handleUpdateBlog = async (data) => {
		const finalPayload = { ...data };
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiUpdateService(finalPayload, editCoupon?._id);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			setEditCoupon(null);
			render();
		} else toast.error(response.mes);
	};
	return (
		<div className="w-full flex flex-col gap-4 relative bg-gray-100 h-full">
			<div className="flex items-center justify-betweend p-4 border-b w-full">
				<h1 className="text-3xl font-bold tracking-tight">
					<span>Cập nhật mã giảm giá</span>
				</h1>
				<span
					className="ml-auto cursor-pointer hover:underline"
					onClick={() => {
						setEditCoupon(null);
					}}
				>
					<IoReturnDownBack size={24} />
				</span>
			</div>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleUpdateBlog)}>
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
							label="Mức giảm (Theo %)"
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
							disabled
							label="Ngày hết hạn"
							register={register}
							errors={errors}
							id="expiry"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
						/>
					</div>

					<div className="my-6">
						<Button fullwidth type="submit">
							Cập nhật mã giảm giá
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(UpdateCoupon));
