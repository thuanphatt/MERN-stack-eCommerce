import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, { memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { apiGetBanners, apiDeleteBanner } from "apis";
import Swal from "sweetalert2";
import { showModal } from "store/app/appSlice";
import { Loading } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import UpdateBanner from "./UpdateBanner";

const ManageBanner = ({ dispatch }) => {
	const [banners, setBanners] = useState(null);
	const [editBanner, setEditBanner] = useState(null);
	const [update, setUpdate] = useState(false);
	const fetchBanners = async () => {
		const response = await apiGetBanners();
		if (response.success) setBanners(response.banners);
	};
	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleDeleteBlog = (bid) => {
		Swal.fire({
			title: "Bạn có chắc chắn không ?",
			text: "Sau khi bạn xóa banner này sẽ không thể khôi phục lại",
			cancelButtonText: "Không",
			confirmButtonText: "Có",
			showCancelButton: true,
			icon: "warning",
		}).then(async (result) => {
			if (result.isConfirmed) {
				dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
				const response = await apiDeleteBanner(bid);

				dispatch(showModal({ isShowModal: false, modalChildren: null }));

				if (response.success) {
					render();
					toast.success(response.mes);
				} else {
					toast.error(response.mes);
				}
			} else {
			}
		});
	};
	useEffect(() => {
		fetchBanners();
	}, [update]);
	return (
		<div className="w-full relative px-4 mx-auto h-full">
			{editBanner && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					<UpdateBanner editBanner={editBanner} render={render} setEditBanner={setEditBanner} />
				</div>
			)}
			<header className="text-3xl font-bold py-4 border-b border-main">Quản lý banner</header>
			<table className="table-auto mb-6 text-center text-sm my-8 w-main mx-auto">
				<thead className="font-bold bg-main text-white">
					<tr className="">
						<th className="py-4 px-2 ">STT</th>
						<th className="py-4 px-2 ">Banner</th>

						<th className="py-4 px-2 ">Thời gian</th>
						<th className="py-4 px-2 ">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{banners?.map((el, index) => (
						<tr key={index} className="border border-t-0 border-[#ccc]">
							<td className="py-4 px-2 ">{index + 1}</td>
							<td className="py-4 px-2 flex items-center justify-center">
								<img src={el.image} alt={el.title} className="w-[250px] h-[120px] object-contain" />
							</td>

							<td className="py-4 px-2">{moment(el.createdAt)?.fromNow()}</td>
							<td className="py-4 px-2">
								<div className="flex items-center gap-4 justify-center">
									<span
										className="cursor-pointer hover:text-gray-800 text-blue-500"
										onClick={() => {
											setEditBanner(el);
										}}
									>
										<AiFillEdit size={18} />
									</span>
									<span
										className="cursor-pointer hover:text-gray-800 text-red-500"
										onClick={() => {
											handleDeleteBlog(el._id);
										}}
									>
										<AiFillDelete size={18} />
									</span>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default withBaseComponent(memo(ManageBanner));
