import icons from "./icons";
const { AiFillStar, AiOutlineStar } = icons;
export const createSlug = (string) =>
	string
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.split(" ")
		.join("-");
export const formatMoney = (number) =>
	Number(number?.toFixed(1)).toLocaleString();
export const renderStarFromNumber = (number, size) => {
	if (!Number(number)) return;
	const stars = [];
	// 4 => [1,1,1,1,0]
	// 2 => [1,1,0,0,0]
	for (let i = 0; i < number; i++)
		stars.push(<AiFillStar color="orange" size={size || 16} />);
	for (let i = 5; i > number; i--)
		stars.push(<AiOutlineStar color="orange" size={size || 16} />);
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
			setInvalidField((prev) => [
				...prev,
				{ name: arr[0], mes: "Không được bỏ trống trường này" },
			]);
		}
	}
	for (let arr of formatPayload) {
		switch (arr[0]) {
			case "email":
				let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

				if (!arr[1].match(regexEmail)) {
					invalids++;
					setInvalidField((prev) => [
						...prev,
						{ name: arr[0], mes: "Email không hợp lệ" },
					]);
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
				const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
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
