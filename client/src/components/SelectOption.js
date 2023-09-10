import React from "react";

const SelectOption = ({ icon }) => {
  return (
    <div className="bg-white w-10 h-10 border rounded-full shadow-md flex items-center justify-center hover:bg-black hover:text-white cursor-pointer hover:border-gray-500">
      {icon}
    </div>
  );
};

export default SelectOption;
