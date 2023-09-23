import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "../../components";
import { apiResetPassword } from "../../apis/user";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    console.log(response);
    if (response.success) {
      toast.success(response.mes);
    } else {
      toast.error(response.mes);
    }
  };
  return (
    <div className="absolute right-0 left-0 top-0 bottom-0 bg-white z-50 flex flex-col items-center py-8">
      <div className="flex flex-col gap-4">
        <label htmlFor="password">Nhập mật khẩu mới của bạn:</label>
        <input
          type="password"
          name="password"
          className="w-[800px] border-b pb-2 outline-none placeholder:text-sm"
          placeholder="Nhập tại đây ..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div className="flex items-center justify-end w-[800px] gap-4">
        <Button name="Gửi" handleOnClick={handleResetPassword} />
      </div>
    </div>
  );
};
export default ResetPassword;
