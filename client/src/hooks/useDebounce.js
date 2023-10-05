import { useEffect, useState } from "react";

const useDebounce = (value, ms) => {
	const [debounceValue, setDebounceValue] = useState("");
	useEffect(() => {
		const setTimeOutId = setTimeout(() => {
			setDebounceValue(value);
		}, ms);
		return () => {
			clearTimeout(setTimeOutId);
		};
	});
	return debounceValue;
};

export default useDebounce;
