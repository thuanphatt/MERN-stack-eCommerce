/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
import React, { memo, useCallback, useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import clsx from "clsx";
import { CSVLink } from "react-csv";
import { CiExport } from "react-icons/ci";

import { InputForm, Select, Button, CustomSelect, Loading } from "components";
import { apiDeleteUser, apiDetailUser, apiGetUsers, apiUpdateUser } from "apis/user";
import { roles, blockStatus, roleLabel } from "utils/contants";
import useDebounce from "hooks/useDebounce";
import { Pagination } from "components";
import icons from "utils/icons";
import Swal from "sweetalert2";
import path from "utils/path";
import withBaseComponent from "hocs/withBaseComponent";
import { formatExportData } from "utils/helpers";
import { showModal } from "store/app/appSlice";
import DetailUser from "./DetailUser";
import { AiFillEye } from "react-icons/ai";
const ManageUser = ({ navigate, location, dispatch }) => {
	const { AiFillEdit, AiFillDelete, RiArrowGoBackFill } = icons;
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
		reset,
	} = useForm({
		email: "",
		firstName: "",
		lastName: "",
		role: "",
		mobile: "",
		isBlocked: "",
	});
	const [usersData, setUsersData] = useState(null);
	const [counts, setCounts] = useState(0);
	const [update, setUpdate] = useState(false);
	const [detailUser, setDetailUser] = useState(null);
	const role = watch("role");
	const [editElement, setEditElement] = useState(null);
	const [params] = useSearchParams();

	const fetchUsers = async (params) => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiGetUsers({ ...params, limit: process.env.REACT_APP_LIMIT });
		dispatch(showModal({ isShowModal: false, modalChildren: null }));

		if (response.success) {
			setUsersData(response);
			setCounts(response.counts);
		}
	};

	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleUpdate = async (data) => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiUpdateUser(data, editElement._id);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));

		if (response.success) {
			setEditElement(null);
			render();
			toast.success(response.mes);
		} else toast.error(response.mes);
	};
	const data = formatExportData(usersData, "user");
	const handleDelete = (uid) => {
		Swal.fire({
			title: "Bạn có chắc chắn không ?",
			text: "Sau khi bạn xóa người dùng này sẽ không thể khôi phục lại",
			cancelButtonText: "Không",
			confirmButtonText: "Có",
			showCancelButton: true,
			icon: "warning",
		}).then(async (result) => {
			if (result.isConfirmed) {
				dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
				const response = await apiDeleteUser(uid);
				dispatch(showModal({ isShowModal: false, modalChildren: null }));
				if (response.success) {
					render();
					toast.success(response.mes);
				} else toast.error(response.mes);
			} else {
			}
		});
	};
	const handleSearchRole = ({ value }) => {
		navigate({
			pathname: location?.pathname,
			search: createSearchParams({ role: value }).toString(),
		});
	};
	const handleDetailUser = async (uid) => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiDetailUser(uid);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		console.log(response);
		if (response.success) {
			setDetailUser(response.mes);
		}
	};
	const queryDebounce = useDebounce(watch("q"), 800);
	useEffect(() => {
		if (queryDebounce) {
			navigate({
				pathname: location?.pathname,
				search: createSearchParams({ q: queryDebounce }).toString(),
			});
		} else {
			navigate({
				pathname: location?.pathname,
			});
		}
	}, [queryDebounce]);
	useEffect(() => {
		const searchParams = Object.fromEntries([...params]);
		fetchUsers(searchParams);
	}, [params, update]);
	return (
		<div className={clsx("w-full flex flex-col gap-4 relative", editElement && "pl-[26px]")}>
			{detailUser && <DetailUser detailUser={detailUser} setDetailUser={setDetailUser} />}
			<div className="w-full h-[69px]"></div>
			<div className="flex items-center justify-betweend p-4 border-b w-full fixed top-0 bg-gray-100">
				<h1 className="text-3xl font-bold tracking-tight ">
					<span>Quản lý người dùng</span>
				</h1>
			</div>
			<div className="w-full p-4">
				<div className="flex justify-between items-center mb-6">
					<CSVLink
						filename="user.csv"
						className="border-[2px] flex justify-center rounded-md items-center px-2 py-1 bg-main  text-white"
						data={data}
					>
						<CiExport className="md:text-[20px] text-[18px] " />
						<h2 className="font-[600] px-1">Xuất</h2>
					</CSVLink>
					<form className="w-[45%] grid grid-cols-2 gap-2">
						<div className="col-span-1">
							<InputForm
								id="q"
								register={register}
								errors={errors}
								fullWidth
								placeholder="Tìm kiếm theo email người dùng ..."
							/>
						</div>
						<div className="col-span-1 flex items-center">
							<CustomSelect
								placeholder="Vai trò"
								options={roleLabel}
								value={role}
								onChange={(val) => {
									if (!val) {
										navigate(`/${path.ADMIN}/${path.MANAGE_USER}`);
									}
									val && handleSearchRole(val);
								}}
								wrapClassName="w-full"
							/>
						</div>
					</form>
				</div>

				<form onSubmit={handleSubmit(handleUpdate)}>
					{editElement && (
						<div className="absolute bottom-[80.2%] left-[12%]">
							<Button type="submit">Cập nhật</Button>
						</div>
					)}
					<table className="table-auto mb-6 text-left w-full">
						<thead className="font-bold bg-main text-sm text-white text-center">
							<tr>
								<th className="px-4 py-2">STT</th>
								<th className="px-4 py-2">Email</th>
								<th className="px-4 py-2">Họ</th>
								<th className="px-4 py-2">Tên</th>
								<th className="px-4 py-2">Số điện thoại</th>
								<th className="px-4 py-2">Vai trò</th>
								<th className="px-4 py-2">Ngày tạo</th>
								<th className="px-4 py-2">Trạng thái</th>
								<th className="px-4 py-2">Hành động</th>
							</tr>
						</thead>
						{usersData && (
							<tbody>
								{usersData?.users?.map((el, index) => (
									<tr key={el._id} className="text-center border border-[#ccc]">
										<td className="px-2 py-4">{index + 1}</td>
										<td className="px-2 py-4">
											{editElement?._id === el._id ? (
												<InputForm
													readOnly
													fullWidth
													defaultValue={editElement?.email}
													register={register}
													errors={errors}
													id={"email"}
													validate={{
														required: "Không được để trống trường này",
														pattern: {
															value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
															message: "Email không hợp lệ",
														},
													}}
												/>
											) : (
												<span>{el.email}</span>
											)}
										</td>
										<td className="px-2 py-4">
											{editElement?._id === el._id ? (
												<InputForm
													fullWidth
													defaultValue={editElement?.firstName}
													register={register}
													errors={errors}
													id={"firstName"}
													validate={{ required: "Không được để trống trường này" }}
												/>
											) : (
												<span>{el.firstName}</span>
											)}
										</td>
										<td className="px-2 py-4">
											{editElement?._id === el._id ? (
												<InputForm
													fullWidth
													defaultValue={editElement?.lastName}
													register={register}
													errors={errors}
													id={"lastName"}
													validate={{ required: "Không được để trống trường này" }}
												/>
											) : (
												<span>{el.lastName}</span>
											)}
										</td>
										<td className="px-2 py-4">
											{editElement?._id === el._id ? (
												<InputForm
													fullWidth
													defaultValue={editElement?.mobile}
													register={register}
													errors={errors}
													id={"mobile"}
													validate={{
														required: "Không được để trống trường này",
														pattern: {
															value: /^[62|0]+\d{9}/gi,
															message: "Số điện thoại không hợp lệ",
														},
													}}
												/>
											) : (
												<span>{el.mobile}</span>
											)}
										</td>
										<td className="px-2 py-4">
											{editElement?._id === el._id ? (
												<Select
													fullWidth
													defaultValue={el.role}
													register={register}
													errors={errors}
													id={"role"}
													validate={{ required: "Không được để trống trường này" }}
													options={roles}
												/>
											) : (
												<span>{roles.find((item) => +item.code === +el.role)?.value}</span>
											)}
										</td>
										<td className="py-2 px-4">{moment(el.createdAt)?.format("DD/MM/YYYY")}</td>
										<td className="py-2 px-4">
											{editElement?._id === el._id ? (
												<Select
													fullWidth
													defaultValue={el.isBlocked}
													register={register}
													errors={errors}
													id={"isBlocked"}
													options={blockStatus}
												/>
											) : (
												<span className={el.isBlocked ? "text-red-600" : "text-green-600"}>
													{el.isBlocked ? "Bị khóa" : "Hoạt động"}
												</span>
											)}
										</td>

										<td className="py-2 px-4 flex items-center pt-5 justify-center">
											{editElement?._id === el._id ? (
												<span
													className="px-2 hover:underline cursor-pointer"
													onClick={() => {
														setEditElement(null);
													}}
												>
													<RiArrowGoBackFill color="black" />
												</span>
											) : (
												<span
													className="px-2 hover:underline cursor-pointer hover:text-gray-800 text-blue-500"
													onClick={() => {
														setEditElement(el);
														reset({
															email: editElement?.email,
															lastName: editElement?.lastName,
															firstName: editElement?.firstName,
															mobile: editElement?.mobile,
															role: el?.role,
															isBlocked: el?.isBlocked,
														});
													}}
												>
													<AiFillEdit size={18} />
												</span>
											)}
											<span
												className="cursor-pointer hover:text-gray-800 text-gray-600"
												onClick={() => {
													handleDetailUser(el._id);
												}}
											>
												<AiFillEye size={18} />
											</span>
											<span
												className="px-2 hover:underline cursor-pointer hover:text-gray-800 text-red-500"
												onClick={() => {
													handleDelete(el?._id);
												}}
											>
												<AiFillDelete size={18} />
											</span>
										</td>
									</tr>
								))}
							</tbody>
						)}
					</table>
				</form>
				<div className="text-right w-full">
					<Pagination totalCount={counts} />
				</div>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(ManageUser));
