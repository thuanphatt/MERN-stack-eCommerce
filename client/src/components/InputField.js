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
    <div className="w-full relative">
      {value.trim() !== "" && (
        <label
          htmlFor={nameKey}
          className="text-[10px] absolute top-0 left-[12px] block bg-white px-2 animate-slide-top-sm"
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey.slice(1)}
        </label>
      )}
      <input
        type={type || "text"}
        className="px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm outline-none"
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
