import React, { memo } from "react";
import clsx from "clsx";
const Select = ({ label, options = [], register, errors, id, validate, fullWidth, style, defaultValue }) => {
	return (
		<div className="flex flex-col gap-2">
			{label && <label htmlFor={id}>{label}</label>}
			<select
				defaultValue={defaultValue}
				id={id}
				{...register(id, validate)}
				className={clsx(
					"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
					fullWidth && "w-full",
					style
				)}
			>
				<option value="">--Chọn--</option>
				{options?.map((el) => (
					<option value={el.code} key={el}>
						{el.value}
					</option>
				))}
			</select>
			{errors[id] && <small className="text-sm text-red-600 absolute bottom-[-14px]">{errors[id]?.message}</small>}
		</div>
	);
};

export default memo(Select);
