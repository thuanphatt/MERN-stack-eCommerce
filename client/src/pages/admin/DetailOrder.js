import { apiGetCoupon, apiGetShipments } from "apis";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { formatMoney, formatPrice } from "utils/helpers";

const DetailOrder = ({ detailOrder, setDetailOrder }) => {
	const [shipment, setShipment] = useState(null);
	const [discount, setDiscount] = useState(null);
	const fetchShipment = async () => {
		const response = await apiGetShipments();
		if (response.success) setShipment(response.shipment);
	};
	const fetchCoupon = async (cid) => {
		const response = await apiGetCoupon(cid);
		if (response.success) setDiscount(response.coupon.discount);
	};
	const cost = Number(shipment?.map((el) => el.cost));
	const freeship = Number(shipment?.map((el) => el.freeship));
	useEffect(() => {
		fetchShipment();
		fetchCoupon(detailOrder?.coupon);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log(discount);
	return (
		<div className="inset-0 bg-gray-100 absolute z-100 ">
			<div className="flex items-center justify-betweend p-4 border-b w-full">
				<h1 className="text-3xl font-bold tracking-tight ">
					<span>Chi tiết đơn hàng</span>
				</h1>
				<span
					className="ml-auto cursor-pointer hover:underline"
					onClick={() => {
						setDetailOrder(null);
					}}
				>
					<IoReturnDownBack size={24} />
				</span>
			</div>
			<div className="p-4 border rounded-lg shadow-lg border-t-0">
				<div className="flex flex-col gap-4">
					<div className="flex gap-2">
						<div className="flex-1">
							<strong>Họ và tên:</strong> {`${detailOrder?.orderBy?.firstName} ${detailOrder?.orderBy?.lastName}`}
						</div>
						<div className="flex-1">
							<strong>SĐT:</strong> {detailOrder?.orderBy?.mobile}
						</div>
					</div>
					<div>
						<strong>Địa chỉ nhận hàng:</strong> {detailOrder?.orderBy?.address}
					</div>
					<div>
						<strong>Hình thức thanh toán:</strong> {detailOrder?.paymentMethod}
					</div>
					<div>
						<strong>Trạng thái:</strong> {detailOrder?.status}
					</div>
					<div>
						<strong>Thời gian:</strong> {moment(detailOrder?.createdAt).fromNow()}
					</div>
				</div>

				<div className="mt-6">
					<h3 className="text-xl font-bold">Sản phẩm đã đặt:</h3>
					{detailOrder?.products.map((item) => (
						<div className="flex items-center gap-4 mt-4" key={item._id}>
							<img src={item.thumbnail} alt="thumb" className="w-16 h-16 object-cover rounded-md" />
							<div className="flex-1">
								<div className="text-xl font-bold">{item.title}</div>
								<div>
									<strong>Màu sắc:</strong> {item.color}
								</div>
								<div>
									<strong>Số lượng:</strong> {item.quantity}
								</div>
								<div>
									<strong>Giá:</strong> {formatMoney(formatPrice(item?.price))} VND
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="text-right mt-6 flex flex-col gap-2">
					<span>
						<strong>Mã giảm giá:</strong> {discount || 0} %
					</span>
					<span>
						<strong>Phí vận chuyển:</strong> {formatMoney(formatPrice(detailOrder?.total > freeship ? 0 : cost))} VND
					</span>
					<span>
						<strong>Tổng cộng:</strong> {formatMoney(formatPrice(detailOrder?.total))} VND
					</span>
				</div>
			</div>
		</div>
	);
};

export default memo(DetailOrder);
