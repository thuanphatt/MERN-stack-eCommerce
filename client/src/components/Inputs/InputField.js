import React, { memo } from "react";
import clsx from "clsx";
const InputField = ({
	value,
	setValue,
	nameKey,
	type,
	invalidField,
	setInvalidField,
	style,
	fullWidth,
	placeholder,
	isHideLabel,
}) => {
	return (
		<div className={clsx("relative flex flex-col mb-2", fullWidth && "w-full")}>
			{!isHideLabel && value?.trim() !== "" && (
				<label
					htmlFor={nameKey}
					className="text-[10px] absolute top-0 left-[12px] block bg-white px-2 animate-slide-top-sm"
				>
					{nameKey?.slice(0, 1).toUpperCase() + nameKey.slice(1)}
				</label>
			)}

			<input
				type={type || "text"}
				className={clsx("px-4 md:py-3 py-3 rounded-sm border w-full my-2 placeholder:text-sm outline-none", style)}
				placeholder={placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey.slice(1)}
				value={value}
				onChange={(e) => setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))}
				onFocus={() => setInvalidField && setInvalidField([])}
			/>
			{invalidField?.some((el) => el.name === nameKey) && (
				<small className="text-red-600 italic absolute bottom-[-14px]">
					*{invalidField.find((el) => el.name === nameKey)?.mes}
				</small>
			)}
		</div>
	);
};

export default memo(InputField);
