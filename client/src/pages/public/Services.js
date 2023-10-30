import React, { memo } from "react";

const Services = () => {
	return (
		<div className="w-full">
			<div className="w-full">
				<img
					src="https://globalcheck.com.vn/apt-upload/image/cache/data/banner/2021/2021-06/dich-vu-2-optimized-2025x950resize_and_crop.jpg"
					alt="thumb"
					className="w-full object-contain"
				/>
			</div>
			<div className="w-main mx-auto">
				<header class="text-3xl font-bold my-8">BẢO HÀNH - BẢO TRÌ - SỬA CHỮA</header>

				<div class="flex flex-wrap gap-4 justify-between items-center">
					<div class="w-full md:w-1/2 lg:w-1/3">
						<div class="service-card">
							<div class="service-image"></div>
							<div class="p-4">
								<h3 class="text-xl font-semibold mb-2">Dịch vụ số 1</h3>
								<p class="text-gray-600 mb-4">Mô tả về dịch vụ số 1.</p>
								<span class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Tìm Hiểu Thêm</span>
							</div>
						</div>
					</div>

					<div class="w-full md:w-1/2 lg:w-1/3">
						<div class="service-card">
							<div class="service-image"></div>
							<div class="p-4">
								<h3 class="text-xl font-semibold mb-2">Dịch vụ số 2</h3>
								<p class="text-gray-600 mb-4">Mô tả về dịch vụ số 2.</p>
								<span class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Tìm Hiểu Thêm</span>
							</div>
						</div>
					</div>

					<div class="w-full md:w-1/2 lg:w-1/3">
						<div class="service-card">
							<div class="service-image"></div>
							<div class="p-4">
								<h3 class="text-xl font-semibold mb-2">Dịch vụ số 3</h3>
								<p class="text-gray-600 mb-4">Mô tả về dịch vụ số 3.</p>
								<span class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Tìm Hiểu Thêm</span>
							</div>
						</div>
					</div>
					<div class="w-full md:w-1/2 lg:w-1/3">
						<div class="service-card">
							<div class="service-image"></div>
							<div class="p-4">
								<h3 class="text-xl font-semibold mb-2">Dịch vụ số 4</h3>
								<p class="text-gray-600 mb-4">Mô tả về dịch vụ số 4.</p>
								<span class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Tìm Hiểu Thêm</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Services);
