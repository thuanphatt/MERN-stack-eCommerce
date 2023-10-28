import clsx from "clsx";
import React, { memo } from "react";
import Select from "react-select";

const CustomSelect = ({ label, placeholder, onChange, options = [], value, className, wrapClassName }) => {
	return (
		<div className={clsx(wrapClassName)}>
			{label && <h3 className="font-bold">{label}</h3>}
			<Select
				placeholder={placeholder}
				value={value}
				isClearable
				isSearchable
				options={options}
				onChange={(value) => onChange(value)}
				formatOptionLabel={(option) => (
					<div className="flex items-center gap-2 text-black">
						<span>{option.label}</span>
					</div>
				)}
				className={{ control: () => clsx("border-2 py-[2px]", className) }}
			></Select>
		</div>
	);
};

export default memo(CustomSelect);
