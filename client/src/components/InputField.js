import React from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidField,
  setInvalidField,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={nameKey}>
        {nameKey?.slice(0, 1).toUpperCase() + nameKey.slice(1)}
      </label>
      <input
        type={type || "text"}
        className="px-4 py-2 rounded-sm border w-full my-4 placeholder:text-sm outline-none"
        placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey.slice(1)}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      />
    </div>
  );
};

export default InputField;
