import { apiGetBlogs } from "apis";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo, useEffect, useState } from "react";

const Trainning = ({ navigate }) => {
	const [blogNews, setBlogNews] = useState(null);
	const fetchBlogNews = async () => {
		const response = await apiGetBlogs({ sort: "-createdAt", limit: 3 });
		if (response.success) {
			setBlogNews(response.blogs);
		}
	};
	useEffect(() => {
		fetchBlogNews();
	}, []);
	return (
		<div className="w-full">
			<div className="w-full">
				<img
					src="https://globalcheck.com.vn/apt-upload/image/cache/data/banner/2021/2021-06/dich-vu-3-optimized-2025x950resize_and_crop.jpg"
					alt="thumb"
					className="w-full object-contain"
				/>
			</div>
			<div className="grid grid-cols-10 p-4 md:w-main w-full mx-auto gap-4">
				<div className="col-span-8 w-full">
					<h2 className="font-bold text-2xl">Đào tạo và chuyển giao</h2>
					<span className="italic text-gray-500">30/10/2023</span>
					<h2 className="font-bold text-2xl text-center mb-4">TRỞ THÀNH PHI CÔNG THẬT ĐƠN GIẢN</h2>
					<p className="text-justify pl-6 text-lg">
						Bất cứ ai cũng có thể trở thành những người phi công điều khiển làm chủ công nghệ Drone không người lái ứng
						dụng trong sản xuất nông nghiệp thực hiện phun tưới phân bón, thuốc BVTV, gieo hạt giống.
						<br />
						Được đào tạo bởi đội ngũ chuyên gia, giảng viên dày dạn kinh nghiệm, tận tình cùng với giáo trình đào tạo
						được xây dựng chi tiết bài bản, khoa học các học viên sẽ được trải qua chương trình huấn luyện theo lịch
						trình từ lý thuyết đến thực hành làm chủ công nghệ. Không những thế khi đến với khóa{" "}
						<a href="https://globalcheck.com.vn/dao-tao-chuyen-giao-n625.html" className="text-blue-600">
							đào tạo phi công nông nghiệp
						</a>
						của công ty cổ phần Đại Thành các học viên còn được hướng dẫn truyền đạt thêm các kiến thức về an toàn bay,
						kiến thức về pháp luật liên quan, về thuốc BVTV sử đụng cho Drone.
						<br />
						Với những gì được trang bị, học viên hoàn toàn tự tin có thể làm chủ công nghệ đưa những thiết bị bay không
						người lái Globalcheck hàng đầu thế giới cất cánh vươn xa lên bầu trời thực hiện các nhiệm vụ hỗ trợ sản xuất
						Nông nghiệp hết sức đơn giải chỉ sau thời gian ngắn.
					</p>
					<h2 className="font-bold text-2xl text-center mt-4">CHƯƠNG TRÌNH ĐÀO TẠO</h2>
					<div className="pl-6 text-lg">
						<span className="mt-4 text-lg underline font-semibold">► Lý thuyết</span>
						<br />
						Phần 1: Kiến thức về các văn bản quy phạm pháp luật liên quan
						<br />
						Phần 2: Kiến thức về sử dụng thuốc BVTV đối với Drone
						<br />
						Phần 3: Chính sách dịch vụ sau bán hàng
						<br />
						<span className="mt-4 text-lg underline font-semibold"> ​► Thực hành</span>
						<br />
						Phần 1: Học lái, vận hành trên máy bay thực tế Phần 2: Học bảo dưỡng, bảo trì
						<br />
						<span className="mt-4 text-lg underline font-semibold">► Thi kiểm tra</span>
						<br />
						Viết bài kiểm tra về lý thuyết Kỹ năng điều khiển khai thác thiết bị bay thực tế
						<br />
						<span className="mt-4 text-lg underline font-semibold"> ► Cấp tài khoản</span>
						<br />
						Cấp tài khoản vận hành ngay sau khi đào tạo và chứng nhận trong vòng 30 ngày kể từ ngày kết thúc khóa học,
						<br />
						không tính ngày nghỉ (chỉ cấp với các trường hợp đầy đủ hồ sơ và đóng học phí theo quy định).
					</div>
					<p className="text-center text-2xl font-semibold w-full mx-auto my-4">
						(Mẫu chứng nhận sau khi tốt nghiệp khóa đào tạo)
					</p>
					<div className="flex items-center justify-center gap-4 my-6">
						<img
							src="https://globalcheck.com.vn/apt-upload/image/data/b1.png"
							alt=""
							className="w-1/2 flex-1 object-contain"
						/>
						<img
							src="https://globalcheck.com.vn/apt-upload/image/data/b2.png"
							alt=""
							className="w-1/2 flex-1 object-contain"
						/>
					</div>
					<h2 className="font-bold text-2xl text-center mt-4">ĐỐI TƯỢNG ĐÀO TẠO</h2>

					<ul className="pl-6 text-lg font-medium">
						<li>1. Người kinh doanh dịch vụ phun thuê</li>
						<li>2. Các tập đoàn, công ty hoặc chủ trang trại nông nghiệp</li>
						<li>3. Hợp tác xã nông nghiệp</li>
						<li>4. Đại lý kinh doanh máy nông nghiệp</li>
						<li>5. Những người đam mê công nghệ muốn trải nghiệm khám phá</li>
					</ul>
				</div>

				<div className="col-span-2 w-full">
					<div className="flex flex-col gap-2 mt-2">
						<h2 className="text-2xl font-semibold border-b border-main mb-2">Tin tức mới nhất</h2>
						{blogNews?.map((blog, index) => (
							<div
								className="flex flex-col bg-white shadow-lg rounded-md overflow-hidden p-4 cursor-pointer"
								key={index}
								onClick={() => {
									navigate(`/blogs/${blog?._id}/${blog?.title}`);
								}}
							>
								<img src={blog.image} alt={blog.title} className="w-full h-40 object-cover object-center" />
								<h3 className="text-sm font-semibold mb-2 w-full">{blog.title}</h3>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(Trainning));
