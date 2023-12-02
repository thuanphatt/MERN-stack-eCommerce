import moment from "moment";
import React, { memo } from "react";
import { IoReturnDownBack } from "react-icons/io5";
import avatarDefault from "assets/avatarDefault.jpg";
const DetailOrder = ({ detailUser, setDetailUser }) => {
	return (
		<div className="inset-0 bg-gray-100 absolute z-100">
			<div className="p-4 border rounded-lg shadow-lg border-t-0" id="content">
				<div className="flex items-center justify-betweend pb-4 border-b w-full ">
					<h1 className="text-3xl font-bold tracking-tight ">
						<span>Chi tiết người dùng</span>
					</h1>
					<span
						className="ml-auto cursor-pointer hover:underline"
						onClick={() => {
							setDetailUser(null);
						}}
					>
						<IoReturnDownBack size={24} />
					</span>
				</div>
				<div className="flex flex-col gap-4 pt-4">
					<div></div>
					<div className="flex gap-2">
						<div className="flex-1">
							<div className="flex items-center gap-2">
								<strong>Ảnh đại diện:</strong>
								<img
									src={detailUser?.avatar || avatarDefault}
									alt="avatar"
									className="w-20 h-20 object-contain rounded-full mb-4"
								/>
							</div>
							<strong>Họ và tên:</strong> {`${detailUser?.firstName} ${detailUser?.lastName}`}
						</div>
					</div>
					<div>
						<strong>Email:</strong> {detailUser?.email}
					</div>
					<div>
						<strong>SĐT:</strong> {detailUser?.mobile}
					</div>
					<div>
						<strong>Vai trò:</strong> {detailUser?.role === "2001" ? "Admin" : "Người dùng"}
					</div>
					<div>
						<strong>Trạng thái:</strong> {detailUser?.isBlocked === false ? "Hoạt động" : "Bị khóa"}
					</div>
					<div>
						<strong>Địa chỉ nhận hàng:</strong> {detailUser?.address}
					</div>

					<div>
						<strong>Thời gian:</strong> {moment(detailUser?.createdAt).fromNow()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(DetailOrder);
