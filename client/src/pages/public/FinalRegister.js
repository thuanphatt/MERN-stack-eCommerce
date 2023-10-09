import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import path from "utils/path";

const FinalRegister = () => {
	const { status } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		if (status === "failed")
			Swal.fire("Opps", "Đăng ký không thành công!", "error").then(() => {
				navigate(`/${path.LOGIN}`);
			});
		if (status === "success")
			Swal.fire("Congratulation!", "Đăng ký thành công!, Hãy đăng nhập", "success").then(() => {
				navigate(`/${path.LOGIN}`);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <div className="w-screen h-screen bg-gray-100"></div>;
};
export default FinalRegister;
