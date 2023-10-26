import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoReturnDownBack } from "react-icons/io5";
import { toast } from "react-toastify";

import { apiUpdateShipment } from "apis";
import { Button, InputForm, Loading } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import { showModal } from "store/app/appSlice";

const UpdateShipment = ({ editShipment, setEditShipment, render, dispatch }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,

		reset,
	} = useForm();

	useEffect(() => {
		reset({
			name: editShipment?.name || "",
			cost: editShipment?.cost || 0,
			freeship: editShipment?.freeship || 0,
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editShipment]);

	const handleUpdateShipment = async (data) => {
		const finalPayload = { ...data };
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiUpdateShipment(finalPayload, editShipment?._id);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			setEditShipment(null);
			render();
		} else toast.error(response.mes);
	};

	return (
		<div className="w-full flex flex-col gap-4 relative bg-gray-100 h-full">
			<div className="flex items-center justify-betweend p-4 border-b w-full">
				<h1 className="text-3xl font-bold tracking-tight ">
					<span>Cập nhật phí vận chuyển</span>
				</h1>
				<span
					className="ml-auto cursor-pointer hover:underline"
					onClick={() => {
						setEditShipment(null);
					}}
				>
					<IoReturnDownBack size={24} />
				</span>
			</div>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleUpdateShipment)}>
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
						label="Phí vận chuyển"
						register={register}
						errors={errors}
						id="cost"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						fullWidth
						placeholder="Nhập phí vận chuyển"
					/>
					<InputForm
						label="Mức để được miễn phí vận chuyển"
						register={register}
						errors={errors}
						id="freeship"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						fullWidth
						placeholder="Nhập mức để được miễn phí vận chuyểnc"
					/>

					<div className="my-6">
						<Button fullwidth type="submit">
							Cập nhật phí vận chuyển
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(UpdateShipment));
