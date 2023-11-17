import { apiCreateRevenuePredict } from "apis";
import clsx from "clsx";
import { Button, InputForm, Loading } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { IoReturnDownBack } from "react-icons/io5";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import path from "utils/path";

const CreateRevenuePredict = ({ dispatch, navigate }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();
	const handleCreateCoupon = async (data) => {
		const finalPayload = { revenues: data };
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiCreateRevenuePredict(finalPayload);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			reset();
		} else toast.error(response.mes);
	};
	const renderMonthlyInputs = () => {
		const monthlyInputs = [];
		for (let i = 1; i <= 12; i++) {
			const monthKey = `month${i}`;
			monthlyInputs.push(
				<InputForm
					type="number"
					key={monthKey}
					label={`Tháng ${i}`}
					register={register}
					errors={errors}
					style={clsx("py-2")}
					id={monthKey}
					validate={{
						required: "Không được bỏ trống trường này",
					}}
					fullWidth
					placeholder={`Nhập doanh thu dự kiến tháng ${i}`}
				/>
			);
		}

		return monthlyInputs;
	};

	return (
		<div className={clsx("w-full")}>
			<h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b w-full tracking-tight">
				<span>Tạo doanh thu dự kiến</span>
				<span
					className="ml-auto cursor-pointer hover:underline"
					onClick={() => {
						navigate(`/${path.ADMIN}/${path.REVENUE_STATISTICS}`);
					}}
				>
					<IoReturnDownBack size={24} />
				</span>
			</h1>
			<div className="p-4">
				<form onSubmit={handleSubmit(handleCreateCoupon)}>
					{renderMonthlyInputs()?.map((el) => el)}
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

export default withBaseComponent(memo(CreateRevenuePredict));
