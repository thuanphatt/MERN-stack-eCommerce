/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";

import { InputField } from "components";
import { apiGetUsers } from "apis/user";
import { roles } from "utils/contants";
import useDebounce from "hooks/useDebounce";
import { Pagination } from "components";
const ManageUser = () => {
	const [usersData, setUsersData] = useState(null);
	const [queries, setQueries] = useState({
		q: "",
	});
	const [params] = useSearchParams();
	const queriesDebounce = useDebounce(queries.q, 800);
	const fetchUsers = async (params) => {
		const response = await apiGetUsers({ ...params, limit: process.env.REACT_APP_LIMIT });
		if (response.success) setUsersData(response);
	};

	useEffect(() => {
		const queries = Object.fromEntries([...params]);
		if (queriesDebounce) queries.q = queriesDebounce;
		fetchUsers(queries);
	}, [queriesDebounce, params]);

	return (
		<div className="w-full">
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
				<table className="table-auto mb-6 text-left w-full">
					<thead className="font-bold bg-gray-600 text-[13px] text-white ">
						<tr className="border border-gray-500">
							<th className="px-4 py-2">#</th>
							<th className="px-4 py-2">Email</th>
							<th className="px-4 py-2">Họ và tên</th>
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
									<td className="py-2 px-4">{el.email}</td>
									<td className="py-2 px-4">{`${el.firstName} ${el.lastName}`}</td>
									<td className="py-2 px-4">{el.mobile}</td>
									<td className="py-2 px-4">{roles.find((item) => +item.code === +el.role)?.value}</td>
									<td className="py-2 px-4">{moment(el.createdAt)?.format("DD/MM/YYYY")}</td>
									<td className="py-2 px-4">{el.isBlocked ? "Bị khóa" : "Hoạt động"}</td>
									<td className="py-2 px-4 flex items-center pt-3">
										<span className="px-2 hover:underline cursor-pointer">
											<AiFillEdit color="blue" />
										</span>
										<span className="px-2 hover:underline cursor-pointer">
											<AiFillDelete color="red" />
										</span>
									</td>
								</tr>
							))}
						</tbody>
					)}
				</table>
				<div className="text-right w-full">
					<Pagination totalCount={usersData?.counts} />
				</div>
			</div>
		</div>
	);
};

export default ManageUser;
