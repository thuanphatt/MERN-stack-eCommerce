import moment from "moment";
import icons from "./icons";
const { AiFillStar, AiOutlineStar } = icons;
export const createSlug = (string) =>
	string
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.split(" ")
		.join("-");
export const formatMoney = (number) => Number(number?.toFixed(1)).toLocaleString();
export const renderStarFromNumber = (number, size) => {
	if (!Number(number)) return;
	const stars = [];
	// 4 => [1,1,1,1,0]
	// 2 => [1,1,0,0,0]
	number = Math.round(number);
	for (let i = 0; i < number; i++) stars.push(<AiFillStar color="orange" size={size || 16} />);
	for (let i = 5; i > number; i--) stars.push(<AiOutlineStar color="orange" size={size || 16} />);
	return stars;
};
export function secondsToHms(d) {
	d = Number(d) / 1000;
	const h = Math.floor(d / 3600);
	const m = Math.floor((d % 3600) / 60);
	const s = Math.floor((d % 3600) % 60);
	return { h, m, s };
}
export const validate = (payload, setInvalidField) => {
	let invalids = 0;
	const formatPayload = Object.entries(payload);
	for (let arr of formatPayload) {
		if (arr[1].trim() === "") {
			invalids++;
			setInvalidField((prev) => [...prev, { name: arr[0], mes: "Không được bỏ trống trường này" }]);
		}
	}
	for (let arr of formatPayload) {
		switch (arr[0]) {
			case "email":
				let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

				if (!arr[1].match(regexEmail)) {
					invalids++;
					setInvalidField((prev) => [...prev, { name: arr[0], mes: "Email không hợp lệ" }]);
				}
				break;
			case "password":
				if (arr[1].length < 6) {
					invalids++;
					setInvalidField((prev) => [
						...prev,
						{
							name: arr[0],
							mes: "Mật khẩu phải dài ít nhất 6 ký tự",
						},
					]);
				}
				break;
			case "mobile":
				const regexPhoneNumber = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/im;
				if (!arr[1].match(regexPhoneNumber)) {
					invalids++;
					setInvalidField((prev) => [
						...prev,
						{
							name: arr[0],
							mes: "Số điện thoại không hợp lệ",
						},
					]);
				}
				break;

			default:
				break;
		}
	}
	return invalids;
};
export const formatPrice = (number) => Math.round(number / 1000) * 1000;
export const generateArrayRange = (start, end) => {
	const length = end + 1 - start;
	return Array.from({ length }, (_, index) => start + index);
};
export const getBase64 = (file) => {
	if (!file) return "";
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
};
export const calculateRevunue = (orders, timeFor) => {
	// Hàm tính tổng doanh thu cho một danh sách giao dịch
	function calculateTotalRevenue(transactions) {
		return transactions?.reduce((total, transaction) => total + transaction.total, 0);
	}

	if (timeFor === "week") {
		// Lấy ngày hiện tại
		const today = new Date();

		// Lấy ngày đầu của tuần (Chủ Nhật là ngày đầu tuần)
		const startOfTime = new Date(today);
		const weeklyRevenueByDay = [];
		startOfTime.setDate(today.getDate() - today.getDay());
		for (let i = 0; i < 7; i++) {
			const currentDate = new Date(startOfTime);
			currentDate.setDate(startOfTime.getDate() + i);

			const dailyRevenue = orders?.filter((transaction) => {
				const transactionDate = new Date(transaction.createdAt);
				return (
					transaction.status === "Thành công" &&
					transactionDate.getDate() === currentDate.getDate() &&
					transactionDate.getMonth() === currentDate.getMonth() &&
					transactionDate.getFullYear() === currentDate.getFullYear()
				);
			});

			const totalDailyRevenue = calculateTotalRevenue(dailyRevenue);

			weeklyRevenueByDay.push({
				date: currentDate,
				revenue: totalDailyRevenue,
			});
		}
		const revenueWeek = [];
		const dayOfRevenueWeek = [];
		weeklyRevenueByDay.forEach((item) => {
			revenueWeek.push(item.revenue);
			dayOfRevenueWeek.push(moment(item.date).format("DD/MM"));
		});
		return { revenueWeek, dayOfRevenueWeek };
	}
	if (timeFor === "month") {
		// Lấy tháng hiện tại
		const currentMonth = new Date().getMonth() + 1;
		// Tạo mảng để lưu trữ tổng doanh thu cho từng tháng
		const revenueMonth = Array(12).fill(0);
		orders?.forEach((transaction) => {
			const transactionDate = new Date(transaction.createdAt);
			const transactionMonth = transactionDate?.getMonth() + 1; // Ghi chú: Tháng trong JavaScript bắt đầu từ 0, nên cần +1.
			// Kiểm tra nếu giao dịch thuộc về tháng hiện tại hoặc trước đó
			if (transactionMonth <= currentMonth) {
				revenueMonth[transactionMonth - 1] += transaction.total; // Trừ 1 vì tháng bắt đầu từ 1.
			}
		});
		const monthOfRevenueMonth = [];
		for (let month = 1; month <= 12; month++) {
			monthOfRevenueMonth.push(`${month}/2023`);
		}

		return { revenueMonth, monthOfRevenueMonth };
	}
	if (timeFor === "today") {
		// Lấy tháng hiện tại
		const today = new Date();

		// Tính tổng doanh thu cho ngày cụ thể
		const dailyRevenue = orders
			?.filter(
				(transaction) =>
					transaction.status === "Thành công" && transaction.createdAt.startsWith(moment(today).format("YYYY-MM-DD"))
			)
			?.reduce((total, transaction) => total + transaction.total, 0);

		return formatMoney(formatPrice(dailyRevenue));
	}
};
export const getIdYoutube = (url) => {
	// Sử dụng regex để tìm video ID
	const videoID = url?.match(/v=([a-zA-Z0-9_-]+)/);

	if (videoID) {
		return videoID[1];
	} else {
		console.log("Không tìm thấy video ID.");
	}
};
export const calculateTotalRevenue = (transactions) => {
	const orderTotal = transactions?.filter((el) => el.status === "Thành công");
	return formatMoney(formatPrice(orderTotal?.reduce((total, transaction) => total + transaction.total, 0)));
};
