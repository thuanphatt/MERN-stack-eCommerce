import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, { memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { apiGetContents, apiDeleteContent } from "apis";
import Swal from "sweetalert2";
import { showModal } from "store/app/appSlice";
import { Loading } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import UpdateContent from "./UpdateContent";

const ManageContent = ({ dispatch }) => {
	const [banners, setBanners] = useState(null);
	const [editContent, setEditContent] = useState(null);
	const [update, setUpdate] = useState(false);
	const fetchContents = async () => {
		const response = await apiGetContents();
		if (response.success) setBanners(response.contents);
	};
	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleDeleteContent = (cid) => {
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
				const response = await apiDeleteContent(cid);

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
		fetchContents();
	}, [update]);
	return (
		<div className="w-full relative px-4 mx-auto h-full">
			{editContent && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					<UpdateContent editContent={editContent} render={render} setEditContent={setEditContent} />
				</div>
			)}
			<header className="text-3xl font-bold py-4 border-b border-main">Quản lý nội dung</header>
			<table className="table-auto mb-6 text-center text-sm my-8 w-main mx-auto">
				<thead className="font-bold bg-main text-white">
					<tr className="">
						<th className="py-4 px-2 ">STT</th>
						<th className="py-4 px-2 ">Logo</th>
						<th className="py-4 px-2 ">Các banner chính</th>
						<th className="py-4 px-2 ">Các banner phụ</th>
						<th className="py-4 px-2 ">Thời gian</th>
						<th className="py-4 px-2 ">Hành động</th>
					</tr>
				</thead>
				<tbody>
					<tr className="border border-t-0 border-[#ccc]">
						<td className="py-4 px-2 ">1</td>
						<td className="py-4 px-2 flex items-center justify-center">
							<img
								src={banners && banners[0].logo}
								alt={banners && banners[0]?.logo}
								className="w-[100px] h-[120px] object-contain"
							/>
						</td>
						<td className="py-4 px-2 ">
							{banners &&
								banners[0]?.banners?.map((el, index) => (
									<div className="flex flex-col items-center" key={index}>
										<img src={el} alt={index} className="max-w-[150px] min-h-[150px] object-contain" />
									</div>
								))}
						</td>
						<td className="py-4 px-2 ">
							{banners &&
								banners[0]?.bannerSub?.map((el, index) => (
									<div className="flex flex-col items-center" key={index}>
										<img src={el} alt={index} className="max-w-[150px] min-h-[150px] object-contain" />
									</div>
								))}
						</td>

						<td className="py-4 px-2">{moment(banners && banners[0]?.createdAt)?.fromNow()}</td>
						<td className="py-4 px-2">
							<div className="flex items-center gap-4 justify-center">
								<span
									className="cursor-pointer hover:text-gray-800 text-blue-500"
									onClick={() => {
										if (banners) {
											setEditContent(banners[0]);
											window.scrollTo({
												top: 0,
												behavior: "smooth",
											});
										}
									}}
								>
									<AiFillEdit size={18} />
								</span>
								<span
									className="cursor-pointer hover:text-gray-800 text-red-500"
									onClick={() => {
										if (banners) {
											handleDeleteContent(banners[0]?._id);
										}
									}}
								>
									<AiFillDelete size={18} />
								</span>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default withBaseComponent(memo(ManageContent));
