/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoReturnDownBack } from "react-icons/io5";
import { toast } from "react-toastify";

import { apiUpdateReceipt } from "apis";
import { Button, InputForm, Loading } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import { showModal } from "store/app/appSlice";

const UpdateSale = ({ editReceipt, setEditReceipt, render, dispatch }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();
	useEffect(() => {
		reset({
			inputPrice: editReceipt?.inputPrice || "",
			inputQuantity: editReceipt?.inputQuantity || "",
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editReceipt]);

	const handleUpdateReceipt = async (data) => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiUpdateReceipt(data, editReceipt?._id);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			setEditReceipt(null);
			render();
		} else toast.error(response.mes);
	};
	return (
		<div className="w-full flex flex-col gap-4 relative bg-gray-100 h-full">
			<div className="flex items-center justify-betweend p-4 border-b w-full">
				<h1 className="text-3xl font-bold tracking-tight">
					<span>Cập nhật phiếu nhập</span>
				</h1>
				<span
					className="ml-auto cursor-pointer hover:underline"
					onClick={() => {
						setEditReceipt(null);
					}}
				>
					<IoReturnDownBack size={24} />
				</span>
			</div>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleUpdateReceipt)}>
					<InputForm
						label="Giá nhập hàng"
						register={register}
						errors={errors}
						type="number"
						id="inputPrice"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						fullWidth
						placeholder="Nhập giá nhập hàng"
					/>

					<div className="w-full my-6">
						<InputForm
							label="Số lượng nhập hàng"
							register={register}
							errors={errors}
							type="number"
							id="inputQuantity"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
							placeholder="Nhập số lượng nhập hàng"
						/>
					</div>

					<div className="my-6">
						<Button fullwidth type="submit">
							Tạo phiếu nhập hàng
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(UpdateSale));
