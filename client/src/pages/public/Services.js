import { apiGetServices } from "apis";
import { Breakcrumb, Button } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo, useEffect, useState } from "react";

const Services = ({ navigate }) => {
	const [services, setServices] = useState(null);
	const fetchServices = async () => {
		const response = await apiGetServices();
		if (response.success) setServices(response.services);
	};
	useEffect(() => {
		fetchServices();
	}, []);
	return (
		<div className="w-full">
			<div className="w-full">
				<img
					src="https://globalcheck.com.vn/apt-upload/image/cache/data/banner/2021/2021-06/dich-vu-2-optimized-2025x950resize_and_crop.jpg"
					alt="thumb"
					className="w-full object-contain"
				/>
			</div>
			<div className="h-[81px] bg-gray-100 flex justify-center items-center">
				<div className="w-main">
					<h3 className="uppercase font-semibold mb-1"> Dịch vụ</h3>
					<Breakcrumb category="Dịch vụ" />
				</div>
			</div>
			<div className="w-main mx-auto">
				<header class="text-3xl font-bold my-8">BẢO HÀNH - BẢO TRÌ - SỬA CHỮA</header>
				<div class="flex gap-4 justify-between items-center">
					{services?.map((el, index) => (
						<div class="w-full md:w-1/2 flex-1 border shadow-md p-4 my-4 rounded-sm min-h-[350px]" key={index}>
							<div>
								<img src={el.image} alt={el.name} className="w-full h-[200px] object-contain"></img>
								<div class="p-4 w-full flex items-center justify-center flex-col">
									<h3 class="text-sm font-semibold mb-2">{el.name}</h3>
									<Button
										handleOnClick={() => {
											navigate(`/services/${el?._id}/${el?.name}`);
										}}
									>
										Tìm Hiểu Thêm
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(Services));
