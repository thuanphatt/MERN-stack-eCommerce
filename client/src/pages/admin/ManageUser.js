/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import clsx from "clsx";

import { InputField, InputForm, Select, Button } from "components";
import { apiDeleteUser, apiGetUsers, apiUpdateUser } from "apis/user";
import { roles, blockStatus } from "utils/contants";
import useDebounce from "hooks/useDebounce";
import { Pagination } from "components";
import icons from "utils/icons";
import Swal from "sweetalert2";
const ManageUser = () => {
	const { AiFillEdit, AiFillDelete, RiArrowGoBackFill } = icons;
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		email: "",
		firstName: "",
		lastName: "",
		role: "",
		mobile: "",
		isBlocked: "",
	});
	const [usersData, setUsersData] = useState(null);
	const [update, setUpdate] = useState(false);
	const [queries, setQueries] = useState({
		q: "",
	});
	const [editElement, setEditElement] = useState(null);
	const [params] = useSearchParams();
	const queriesDebounce = useDebounce(queries.q, 800);

	const fetchUsers = async (params) => {
		const response = await apiGetUsers({ ...params, limit: process.env.REACT_APP_LIMIT });
		if (response.success) setUsersData(response);
	};
	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleUpdate = async (data) => {
		const response = await apiUpdateUser(data, editElement._id);
		if (response.success) {
			setEditElement(null);
			render();
			toast.success(response.mes);
		} else toast.error(response.mes);
	};
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
				const response = await apiDeleteUser(uid);
				if (response.success) {
					render();
					toast.success(response.mes);
				} else toast.error(response.mes);
			} else {
			}
		});
	};
	useEffect(() => {
		const queries = Object.fromEntries([...params]);
		if (queriesDebounce) queries.q = queriesDebounce;
		fetchUsers(queries);
	}, [queriesDebounce, params, update]);

	return (
		<div className={clsx("w-full", editElement && "pl-[80px]")}>
			<h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b w-full">
				<span>Quản lý người dùng</span>
			</h1>
			<div className="w-full p-4">
				<div className="flex justify-end py-4">
					<InputField
						isHideLabel
						nameKey={"q"}
						value={queries.q}
						setValue={setQueries}
						style={"w-[500px]"}
						placeholder="Tìm kiếm người dùng ..."
					/>
				</div>
				<form onSubmit={handleSubmit(handleUpdate)}>
					{editElement && <Button type="submit">Cập nhật</Button>}
					<table className="table-auto mb-6 text-left w-full">
						<thead className="font-bold bg-gray-600 text-[13px] text-white">
							<tr className="border border-gray-500">
								<th className="px-4 py-2">#</th>
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
									<tr key={el._id} className="border border-gray-500">
										<td className="py-2 px-4">{index + 1}</td>
										<td className="py-2 px-4">
											{editElement?._id === el._id ? (
												<InputForm
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
										<td className="py-2 px-4">
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
										<td className="py-2 px-4">
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
										<td className="py-2 px-4">
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
										<td className="py-2 px-4">
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
													validate={{ required: "Không được để trống trường này" }}
													options={blockStatus}
												/>
											) : (
												<span>{el.isBlocked ? "Bị khóa" : "Hoạt động"}</span>
											)}
										</td>

										<td className="py-2 px-4 flex items-center pt-3">
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
													className="px-2 hover:underline cursor-pointer"
													onClick={() => {
														setEditElement(el);
													}}
												>
													<AiFillEdit color="blue" />
												</span>
											)}
											<span
												className="px-2 hover:underline cursor-pointer"
												onClick={() => {
													handleDelete(el?._id);
												}}
											>
												<AiFillDelete color="red" />
											</span>
										</td>
									</tr>
								))}
							</tbody>
						)}
					</table>
				</form>
				<div className="text-right w-full">
					<Pagination totalCount={usersData?.counts} />
				</div>
			</div>
		</div>
	);
};

export default ManageUser;
