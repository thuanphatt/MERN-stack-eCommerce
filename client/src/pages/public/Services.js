import { apiGetServices } from "apis";
import { Breakcrumb, Button } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo, useEffect, useRef, useState } from "react";

import baohanh from "assets/baohanh.png";
import baotri from "assets/baotri.png";
import baotri1 from "assets/baotri1.png";
const Services = ({ navigate }) => {
	const [services, setServices] = useState(null);
	const titleRef = useRef();
	const fetchServices = async () => {
		const response = await apiGetServices();
		if (response.success) setServices(response.services);
	};
	useEffect(() => {
		fetchServices();
	}, []);
	return (
		<div className="w-full" ref={titleRef}>
			<div className="w-full">
				<img
					src="https://globalcheck.com.vn/apt-upload/image/cache/data/banner/2021/2021-06/dich-vu-2-optimized-2025x950resize_and_crop.jpg"
					alt="thumb"
					className="w-full object-contain"
				/>
			</div>
			<div className="h-[81px] bg-gray-100 flex justify-center items-center">
				<div className="md:w-main w-full md:px-0 px-4">
					<h3 className="uppercase font-semibold mb-1"> Dịch vụ</h3>
					<Breakcrumb category="Dịch vụ" />
				</div>
			</div>
			<div className="md:w-main w-full mx-auto md:px-0 px-4">
				<h2 className="text-xl font-bold mt-4"> CÁC DỊCH VỤ GIẢI PHÁP NÔNG NGHIỆP 4.0</h2>
				<div class="flex md:flex-row flex-col gap-4 md:justify-between md:items-center">
					{services?.map((el, index) => (
						<div class="w-full md:w-1/2 flex-1 border shadow-md p-4 my-4 rounded-sm min-h-[350px]" key={index}>
							<div>
								<img src={el.image} alt={el.name} className="w-full h-[200px] object-contain"></img>
								<div class="p-4 w-full flex items-center justify-center flex-col">
									<h3 class="text-sm font-semibold mb-2">{el.name}</h3>
									<Button
										handleOnClick={() => {
											titleRef.current?.scrollIntoView({ behavior: "smooth" });
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
				<h2 className="text-xl font-bold">DANH MỤC LINH PHỤ KIỆN THUỘC PHẠM VI BẢO HÀNH</h2>
				<div className="my-4 border border-black border-r-0">
					<img src={baohanh} alt="bao hanh" className="w-full h-auto object-contain" />
				</div>
				<span className="font-semibold text-base">Chú ý</span>
				<ul className="pl-10 list-disc text-justify">
					<li className="py-2">
						Các bộ phận tiêu hao hoặc bị ăn mòn nghiêm trọng do tiếp xúc với thuốc trừ sâu và các hóa chất khác trong
						quá trình sử dụng. Lỗi hoặc hư hỏng do ăn mòn thuốc trừ sâu hoặc biến dạng do vận hành không được bảo hành
						bởi dịch vụ bảo hành.
					</li>
					<li className="py-2">
						Các ô đánh dấu “*” có nghĩa là áp dụng 1 trong 2 điều kiện bảo hành tùy điều kiện đến trước.
					</li>
					<li className="py-2">
						Môi trường lưu trữ và nhiệt độ của pin thông minh phải được vận hành đúng theo hướng dẫn. Đối với dòng pin
						thông minh B13960S, không thực hiện thay cell mà chỉ đổi pin mới và Khách hàng phải thực hiện thanh toán chi
						phí chênh lệch số lần tuần hoàn đã sử dụng). Để biết phương pháp và chi phí thay thế cụ thể, vui lòng truy
						cập trang web: ...
					</li>
					<li className="py-2">
						Hàng trả bảo hành cho khách hàng đảm bảo là hàng tốt, sử dụng ổn định, không phải hàng mới 100%. Đối với các
						linh phụ kiện có thể sửa chữa được, sẽ được sửa lại và gửi lại khách hàng sử dụng.
					</li>
					<li className="py-2">
						Đối với đơn bảo hành máy rơi: Nếu máy rơi do lỗi của bản thân sản phẩm (phần mềm lỗi hoặc phần cứng thuộc
						danh mục được bảo hành nằm trong mục 1.1) thì sẽ bảo hành cho khách hàng các linh kiện thuộc diện bảo hành
						như mục 1.1 đã liệt kê.
					</li>
				</ul>
				<span className="font-bold text-base">TRÁCH NHIỆM CỦA CHỦ PHƯƠNG TIỆN BAY</span>
				<ul className="pl-10 list-decimal text-justify">
					<li className="py-2">
						Kiểm tra kỹ các điều khoản hợp đồng, chính sách và dịch vụ sau bán hàng thông qua các văn bản đã ban hành và
						hệ thống website: www.globalcheck.com.vn chính thức của công ty trước khi quyết định mua hàng.
					</li>
					<li className="py-2">
						Thực hiện đúng và đầy đủ lịch bảo dưỡng định kỳ do công ty công bố trên website và văn bản cứng, thay thế
						linh kiện, dầu bôi trơn, chống nhiệt, phụ kiện chính hãng và các công việc này cần được thực hiện bởi các
						phi công đã được công ty đào tạo cấp chứng nhận. Khi máy bay bị sự cố, tai nạn hoặc cần bảo hành, sửa
						chữa…các chủ máy cần đưa máy đến trung tâm bảo hành sửa chữa được công ty ủy quyền gần nhất để các kỹ thuật
						viên hỗ trợ kiểm tra phương tiện của bạn theo quy định.
					</li>
					<li className="py-2">
						Sử dụng các biện pháp phù hợp để bảo vệ phương tiện bay khỏi phát sinh những thiệt hại lớn hơn. Khi tín hiệu
						đèn, tính hiệu cảnh báo sáng trên bảng điều khiển hoặc khi phát hiện phương tiện có hiện tượng, tiếng động
						bất thường, chủ phương tiện bay hoặc người điều khiển phương tiện bay phải nhanh chóng dừng hoạt động bay,
						tắt máy và liên lạc ngay với các trung tâm bảo hành sửa chữa của công ty để được trợ giúp kịp thời. Chủ
						phương tiện bay phải chịu trách nhiệm đối với các thiệt hại phát sinh do việc không tuân theo cảnh báo trên
						mà tiếp tục vận hành phương tiện bay, phụ kiện đi kèm
					</li>
					<li className="py-2">
						Giao phương tiện, linh phụ kiện hư hỏng cho trung tâm bảo hành để thực hiện những sửa chữa, bảo hành ngay
						khi phát hiện ra sự cố. Thời gian không quá 48 tiếng kể từ khi gặp sự cố
					</li>
					<li className="py-2">
						Lưu ý rằng bất kỳ sửa đổi, lắp đặt thêm nào trên phương tiện cũng như phụ kiện đi cũng có thể ảnh hưởng tới
						hiệu suất hoạt động, tính an toàn, độ bền và thậm chí có thể vi phạm các quy định của Nhà nước, theo đó, chủ
						phương tiện bay phải tự chịu trách nhiệm về các hư hỏng, thiệt hại phát sinh & chịu trách nhiệm trước phát
						luật nếu ảnh hưởng đến an linh quốc phòng & an toàn bay.
					</li>
					<li className="py-2">
						Khi phát sinh sự cố, chủ phương tiện bay không người lái cần thông báo ngay cho trung tâm bảo hành của công
						ty để nhận được tư vấn, hỗ trợ cần thiết, kịp thời. Các văn bản được lập khi phát sinh sự cố phải có chữ ký
						của người đại diện trung tâm bảo hành tham gia chứng kiến, kiểm tra, giám sát bởi đây là tài liệu quan trọng
						để xác định sự cố, hư hỏng có thuộc trường hợp được bảo hành hay không.
					</li>
					<li className="py-2">
						Khi giao dịch làm việc với cán bộ, nhân viên của các trung tâm bảo hành, sửa chữa của công ty. Đề nghị trao
						đổi làm việc với thái độ và tinh thần hợp tác, ôn hòa, trên cơ sở tôn trọng lợi ích và cùng giải quyết vấn
						đề. Ứng xử có văn hóa, chừng mực phù hợp với thuần phong mỹ tục và danh dự nhân phẩm.
					</li>
				</ul>
				<span className="font-bold text-base">ĐIỀU KHOẢN KHÔNG ĐƯỢC HƯỞNG BẢO HÀNH</span>
				<ul className="pl-10 list-decimal text-justify">
					<li className="py-2">
						Phạm vi chính sách bảo hành chỉ áp dụng đối với các máy phát sinh lỗi do nhà sản xuất
					</li>
					<li className="py-2">
						Trường hợp lỗi do khách hàng, nhưng không thành thật mà che giấu. Khách hàng sẽ phải chịu hoàn toàn tổn thất
						sau khi chuyên viên của Đại Thành kiểm tra máy
					</li>
					<li className="py-2">Trường hợp đã nhận được cảnh báo sự cố trên phần mềm, mà vẫn tiếp tục vận hành.</li>
				</ul>
				<span className="text-xl font-bold mt-4">CHÍNH SÁCH BẢO TRÌ, BẢO DƯỠNG ĐỊNH KỲ</span>
				<ul className="pl-10 list-disc text-justify">
					<li className="py-2">
						Các phi công đã được đào tạo vận hành máy được cấp chứng nhận có trách nhiệm thực hiện công tác bảo dưỡng,
						vệ sinh sau mỗi lần thực hiện làm nhiệm vụ hàng ngày đối với máy bay.
					</li>
					<li className="py-2">
						Ngoài ra công ty còn cung cấp dịch vụ bảo trì định kỳ tổng thể máy bay. Hàng tháng khi đến định mức bảo
						dưỡng định kỳ bộ phận dịch vụ sau bán hàng của công ty (ASS) sẽ liên hệ thông báo đến từng khách hàng để đưa
						máy đi bảo dưỡng tổng thể.
					</li>
					<li className="py-2">
						Lịch bảo dưỡng này để giúp bạn có được một chiếc máy bay với hiệu suất hoạt động tốt, có độ bền và độ tin
						cậy lớn và đảm bảo cho quyền lợi bảo hành máy của bạn có giá trị. Việc bảo dưỡng định kỳ được thực hiện bởi
						các trung tâm bảo hành sửa chữa của công ty cổ phần Đại Thành trên toàn quốc.{" "}
					</li>
					<li className="py-2">Quý khách vui đồng đăng ký trước lịch bảo dưỡng qua điện thoại hoặc hộp thư điện tử.</li>
					<li className="py-2">Định mức khuyến cáo tổng bảo dưỡng định kỳ đối với máy bay:</li>
					<img src={baotri} alt="bao tri" className="w-full object-contain" />
					<li className="py-2">Máy phát điện</li>
					<img src={baotri1} alt="bao tri 1" className="w-full object-contain" />
				</ul>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(Services));
