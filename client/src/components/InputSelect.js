import React, { memo } from "react";

const InputSelect = ({ value, changeValue, options }) => {
	return (
		<select
			value={value}
			onChange={(e) => {
				changeValue(e.target.value);
			}}
			className="text-[12px] text-gray-500 p-3 px-5 outline"
		>
			<option value="">Ngẫu nhiên</option>
			{options?.map((el) => (
				<option key={el.id} value={el.value} className="text-[12px] text-gray-500">
					{el.text}
				</option>
			))}
		</select>
	);
};

export default memo(InputSelect);
