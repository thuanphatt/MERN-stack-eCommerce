import React, { memo } from "react";
import clsx from "clsx";

const InputForm = ({
	label,
	disabled,
	register,
	errors,
	id,
	validate,
	type = "text",
	placeholder,
	fullWidth,
	defaultValue,
}) => {
	return (
		<div className="flex flex-col gap-2 relative">
			{label && <label htmlFor={id}></label>}
			<input
				type={type}
				id={id}
				{...register(id, validate)}
				disabled={disabled}
				defaultValue={defaultValue}
				placeholder={placeholder}
				className={clsx("p-2 rounded-sm border w-full placeholder:text-sm outline-none my-auto", fullWidth && "w-full")}
			/>
			{errors[id] && <small className="text-sm text-red-600 absolute bottom-[-14px]">{errors[id]?.message}</small>}
		</div>
	);
};

export default memo(InputForm);
