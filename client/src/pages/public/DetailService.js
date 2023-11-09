/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import React, { memo, useEffect, useState } from "react";

import { apiGetService } from "apis";
import { Breakcrumb, InputForm } from "components";
import { useParams } from "react-router-dom";
import { formatMoney, formatPrice } from "utils/helpers";
import DOMPurify from "dompurify";
import { useForm } from "react-hook-form";
import useDebounce from "hooks/useDebounce";
import withBaseComponent from "hocs/withBaseComponent";
const DetailService = ({ navigate }) => {
	const param = useParams();
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();
	const [detailService, setDetailService] = useState(null);
	const [quantityProduct, setQuantityProduct] = useState(1);
	const [totalProduct, setTotalProduct] = useState(1);
	const fetcSerivce = async (sid) => {
		const response = await apiGetService(sid);
		if (response.success) setDetailService(response.service);
	};
	const queryDebounce = useDebounce(watch("quanlity"), 800);
	useEffect(() => {
		fetcSerivce(param.sid);
	}, [param.sid]);
	useEffect(() => {
		setQuantityProduct(watch("quanlity") / 10);
	}, [queryDebounce]);
	useEffect(() => {
		setTotalProduct(detailService?.products.reduce((sum, el) => sum + el.price * +Math.round(quantityProduct), 0));
	}, [queryDebounce, totalProduct]);
	return (
		<div className="w-full">
			<div className="h-[81px] bg-gray-100 flex justify-center items-center">
				<div className="w-main">
					<h3 className="uppercase font-semibold mb-1"> {detailService?.name}</h3>
					<Breakcrumb title={detailService?.name} category="Dịch vụ" />
				</div>
			</div>
			<div className="w-main mx-auto flex items-center justify-center mt-6">
				<img src={detailService?.image} alt="thumb" className="w-[60%] object-contain" />
			</div>
			<div className="w-main mx-auto bg-white shadow-lg rounded-xl overflow-hidden md:flex flex flex-col mb-8">
				<div className="p-8">
					<h2 className="text-3xl font-bold leading-tight text-gray-800 text-center">{detailService?.name}</h2>
					<div className="text-gray-600 text-lg text-right">{`Ngày tạo : ${moment(detailService?.createdAt).format(
						"DD/MM/YYYY"
					)}`}</div>
					<div className="text-md mb-8 text-justify ">
						<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detailService?.description) }}></div>
					</div>
					<form onSubmit={handleSubmit} className="py-2">
						<InputForm
							type="number"
							label="Nhập ha đất để tính toán số lượng thiết bị cần thiết"
							register={register}
							errors={errors}
							id="quanlity"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
							placeholder="VD: 10 || 20 (ha)"
						/>
					</form>
					{quantityProduct ? (
						<>
							{detailService?.products.map((el) => (
								<div
									key={el._id}
									className="border-b py-4 flex gap-4 items-center hover:bg-gray-300 cursor-pointer"
									onClick={() => {
										navigate(`/${el?.category[0]}/${el?._id}/${el?.title}`);
									}}
								>
									<div>
										<img src={el.thumb} alt={el.title} className="p-4 w-24 h-24 object-cover rounded" />
									</div>
									<div>
										<h2 className="text-xl font-semibold">{el.title}</h2>
										<p className="text-gray-600">{`Giá: ${formatMoney(formatPrice(el.price))} VND`}</p>
										<p>{`Số lượng: ${Math.round(quantityProduct)} cái`}</p>
									</div>
								</div>
							))}

							<div className="text-right mt-8 flex flex-col gap-2">
								<h3 className="text-xl font-semibold">{`Số lượng sản phẩm cần thiết: ${
									detailService?.products.length * Math.round(quantityProduct)
								} cái`}</h3>
								<h3 className="text-xl font-semibold">{`Phí dịch vụ: ${formatMoney(
									formatPrice(detailService?.price)
								)} VND`}</h3>
								<h3 className="text-xl font-semibold">{`Giá tham khảo: ${formatMoney(
									formatPrice(totalProduct + detailService?.price)
								)} VND`}</h3>
								<span className="text-lg font-semibold">Liên hệ : 093232323</span>
							</div>
						</>
					) : (
						<p className="text-gray-500">Không có thiết bị nào</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(DetailService));
