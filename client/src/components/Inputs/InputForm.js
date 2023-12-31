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
	style,
	readOnly,
}) => {
	return (
		<div className={clsx("flex flex-col gap-2 relative", style)}>
			{label && <label htmlFor={id} className="font-medium">{`${label}:`}</label>}
			<input
				type={type}
				id={id}
				{...register(id, validate)}
				disabled={disabled}
				defaultValue={defaultValue}
				placeholder={placeholder}
				className={clsx(
					"p-2 rounded-sm border-2 border-[#ccc] w-full placeholder:text-sm outline-none my-auto max-h-[42px]",
					fullWidth && "w-full"
				)}
				readOnly={readOnly}
			/>

			{errors[id] && (
				<small className="text-sm text-red-600 absolute bottom-[-20px] w-[240px]">{errors[id]?.message}</small>
			)}
		</div>
	);
};

export default memo(InputForm);
