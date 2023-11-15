import clsx from "clsx";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Button, InputForm, Loading } from "components";
import { apiCreateBlogCategory } from "apis";
import { showModal } from "store/app/appSlice";

const CreateBlogCategory = () => {
	const dispatch = useDispatch();
	const {
		register,
		formState: { errors },
		handleSubmit,

		reset,
	} = useForm();

	const handleCreateCategory = async (data) => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiCreateBlogCategory(data);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
			reset();
		} else toast.error(response.mes);
	};
	return (
		<div className={clsx("w-full")}>
			<h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b w-full tracking-tight">
				<span>Tạo danh mục tin tức</span>
			</h1>
			<div className="p-4 w-1/2">
				<form onSubmit={handleSubmit(handleCreateCategory)}>
					<InputForm
						label="Tên danh mục"
						register={register}
						errors={errors}
						id="title"
						validate={{
							required: "Không được bỏ trống trường này",
						}}
						fullWidth
						placeholder="Nhập tên của danh mục"
					/>

					<div className="my-6">
						<Button fullwidth type="submit">
							Tạo danh mục tin tức
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default memo(CreateBlogCategory);
