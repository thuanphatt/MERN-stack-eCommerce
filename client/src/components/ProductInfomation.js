import React, { memo, useState } from "react";
import { productInfoTabs } from "../utils/contants";

// const activedStyles = "";
// const notActivedStyles = "";
const ProductInfomation = () => {
	const [activedTab, setActivedTab] = useState(1);
	return (
		<div>
			<div className="flex items-center gap-1 relative bottom-[-1px]">
				{productInfoTabs.map((el) => (
					<span
						key={el.id}
						className={`p-2 px-4 text-[#505050] cursor-pointer ${
							activedTab === el.id
								? "bg-white border border-b-0"
								: "bg-[#f1f1f1]"
						}`}
						onClick={() => {
							setActivedTab(el.id);
						}}
					>
						{el.name}
					</span>
				))}
			</div>
			<div className="border w-full p-4">
				{productInfoTabs.some((el) => activedTab === el.id) &&
					productInfoTabs.find((el) => el.id === activedTab)?.content}
			</div>
		</div>
	);
};

export default memo(ProductInfomation);
