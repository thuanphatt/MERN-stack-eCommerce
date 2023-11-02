import { apiGetServices } from "apis";
import { Breakcrumb } from "components";
import DOMPurify from "dompurify";
import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import path from "utils/path";

const Services = () => {
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
				<div class="flex flex-wrap gap-4 justify-between items-center">
					{services?.map((el, index) => (
						<div class="w-full md:w-1/2 lg:w-1/3" key={index}>
							<div class="service-card">
								<div class="service-image"></div>
								<div class="p-4">
									<h3 class="text-xl font-semibold mb-2">{el.name}</h3>
									<ul className="list-square text-sm text-gray-500">
										{el?.description?.length > 1 &&
											el?.description?.map((item, index) => (
												<li key={index} className="leading-[28px]">
													{item}
												</li>
											))}
										{el?.description?.length === 1 && (
											<div className="text-sm mb-8 ">
												<div
													dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(el?.description[0]) }}
													className="truncate h-[100px] w-full"
												></div>
											</div>
										)}
									</ul>
									{/* <Link
										class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
										to={`/${path.DETAIL_SERVICE__BID__TITLE}`}
									>
										Tìm Hiểu Thêm
									</Link> */}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default memo(Services);
