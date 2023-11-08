import { apiGetCoupons } from "apis";
import Button from "components/Buttons/Button";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";

const DiscountCode = () => {
	const [coupons, setCoupons] = useState(null);
	const fetchCoupons = async () => {
		const response = await apiGetCoupons();
		if (response.success) setCoupons(response.coupons);
	};
	const copyToClipboard = (text) => {
		if (text) {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					toast.success("Đã sao chép mã giảm giá thành công");
					console.log(`Copied to clipboard: ${text}`);
					// You can add a notification or some feedback to the user here
				})
				.catch((error) => {
					console.error("Failed to copy to clipboard", error);
					// Handle the error, e.g., show an error message to the user
				});
		}
	};
	useEffect(() => {
		fetchCoupons();
	});
	return (
		<div className="w-full">
			<h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main">Mã giảm giá</h2>
			<div className="flex items-center mt-4 gap-2">
				{coupons?.map((el, index) => (
					<div className="flex items-center flex-1 border shadow-md" key={index}>
						<div className="flex-2 flex items-center justify-center">
							<img
								src="https://static.thenounproject.com/png/2513410-200.png"
								alt="discout"
								className="w-12 h-12 object-contain rounded-full bg-red-500 p-2"
							/>
						</div>
						<div className="flex-8 border flex flex-col gap-2 p-4">
							<span className="text-lg font-semibold">{el.name}</span>
							<span className="text-gray-500 text-sm">{`HSD: ${moment(el.expiry).format("DD/MM/YYYY")}`}</span>
							<div className="flex items-center justify-between">
								<span className="text-blue-500">Chi tiết</span>
								<Button
									handleOnClick={() => {
										copyToClipboard(el._id);
									}}
								>
									Sao chép
								</Button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default memo(DiscountCode);
