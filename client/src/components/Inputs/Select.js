import React, { memo } from "react";
import clsx from "clsx";
const Select = ({
	label,
	options = [],
	register,
	errors,
	id,
	validate,
	fullWidth,
	style,
	defaultValue,
	multiple,
	styleSelect,
	noDefaultValue,
}) => {
	return (
		<div className={clsx("flex flex-col gap-2 relative", style)}>
			{label && <label htmlFor={id}>{label}</label>}
			<select
				multiple={multiple ? true : false}
				defaultValue={defaultValue}
				id={id}
				{...register(id, validate)}
				className={clsx(
					"bg-white border border-gray-300 text-sm rounded-sm block w-full px-1 py-2 text-black max-h-[50px]",
					fullWidth && "w-full",
					styleSelect
				)}
			>
				{!noDefaultValue && <option value="">--Chọn--</option>}

				{options?.map((el, index) => (
					<option value={el.code} key={index}>
						{el.value}
					</option>
				))}
			</select>
			{errors[id] && (
				<small className={clsx("text-sm text-red-600 absolute bottom-[-20px] w-[240px]")}>{errors[id]?.message}</small>
			)}
		</div>
	);
};

export default memo(Select);
