import { Breakcrumb } from "components";
import React from "react";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { BiMap } from "react-icons/bi";

const Contact = () => {
	return (
		<div className="w-full">
			<div className="h-[81px] bg-gray-100 flex justify-center items-center">
				<div className="w-main">
					<h3 className="uppercase font-semibold mb-1"> Liên hệ</h3>
					<Breakcrumb category="Liên hệ" />
				</div>
			</div>
			<div className="w-main mx-auto my-4">
				<h2 className="text-main text-3xl font-bold text-center py-4">THÔNG TIN LIÊN HỆ</h2>
				<p className="text-center text-gray-600 text-sm my-4">
					Cảm ơn bạn đã quan tâm đến sản phẩm của chúng tôi. Để đặt lịch tư vấn, bạn vui lòng điền thông tin vào mẫu đơn
					bên trái hoặc điền đơn “đề nghị tư vấn” online. Chuyên viên tư vấn của chúng tôi sẽ liên hệ với bạn trong thời
					gian sớm nhất.
				</p>
				<div className="flex items-center">
					<div className="flex-1 flex flex-col gap-2 items-center  p-4">
						<span>
							<AiOutlinePhone size={65} color="#79AC78" />
						</span>
						<span className="text-[#333333] text-[18px] uppercase font-bold">hotline</span>
						<span>0999.9999.999</span>
					</div>
					<div className="flex-1 flex flex-col gap-2 items-center border-r  border-l p-4">
						<span>
							<BiMap size={65} color="#79AC78" />
						</span>
						<span className="text-[#333333] text-[18px] uppercase font-bold">TRỤ SỞ CHÍNH</span>
						<span>Trà Ôn, Vĩnh Long, Việt Nam</span>
					</div>
					<div className="flex-1 flex flex-col gap-2 items-center  p-4">
						<span>
							<AiOutlineMail size={65} color="#79AC78" />
						</span>
						<span className="text-[#333333] text-[18px] uppercase font-bold">EMAIL</span>
						<span>thphatt@gmail.com</span>
					</div>
				</div>
				<div className="my-6">
					<section class="bg-gray-100 rounded-md">
						<div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
							<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
								LIÊN HỆ VỚI CHÚNG TÔI
							</h2>
							<p class="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
								Có một vấn đề kỹ thuật? Bạn muốn gửi phản hồi về tính năng ? Cần thông tin chi tiết về kế hoạch kinh
								doanh của chúng tôi? Hãy cho chúng tôi biết.
							</p>
							<form action="#" class="space-y-8">
								<div>
									<label for="email" class="block mb-2 text-sm font-medium text-gray-900">
										Email
									</label>
									<input
										type="email"
										id="email"
										class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
										placeholder="VD: thphatt@gmail.com"
										required
									/>
								</div>
								<div>
									<label for="subject" class="block mb-2 text-sm font-medium text-gray-900 ">
										Tiêu đề
									</label>
									<input
										type="text"
										id="subject"
										class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
										placeholder="Hãy cho chúng tôi biết làm thế nào để giúp đỡ cho bạn"
										required
									/>
								</div>
								<div class="sm:col-span-2">
									<label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">
										Nội dung
									</label>
									<textarea
										id="message"
										rows="6"
										class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Để lại một nội dung..."
									></textarea>
								</div>
								<button
									type="submit"
									class="py-3 px-5 text-sm font-medium text-center text-white  bg-main rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									Gửi
								</button>
							</form>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Contact;
