import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { apiCreateOrder } from "apis/order";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import path from "utils/path";

// This value is from the props in the UI
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount, payload, setIsSuccess }) => {
	const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
	useEffect(() => {
		dispatch({
			type: "resetOptions",
			value: {
				...options,
				currency: currency,
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currency, showSpinner]);
	const navigate = useNavigate();
	const handleSaveOrder = async () => {
		const response = await apiCreateOrder({ ...payload, status: "Thành công" });
		if (response.success) {
			setIsSuccess(true);
			setTimeout(() => {
				Swal.fire("Chúc mừng", "Đã đặt hàng thành công", "success").then(() => {
					navigate(`/${path.HOME}`);
				});
			}, 1500);
		}
	};
	return (
		<>
			{showSpinner && isPending && <div className="spinner" />}
			<PayPalButtons
				style={style}
				disabled={false}
				forceReRender={[style, currency, amount]}
				fundingSource={undefined}
				createOrder={(data, actions) =>
					actions.order
						.create({
							purchase_units: [{ amount: { currency_code: currency, value: amount } }],
						})
						.then((orderID) => orderID)
				}
				onApprove={(data, actions) =>
					actions.order.capture().then(async (response) => {
						if (response.status === "COMPLETED") {
							handleSaveOrder();
						}
					})
				}
			/>
		</>
	);
};

export default function Paypal({ amount, payload, setIsSuccess }) {
	return (
		<div style={{ maxWidth: "750px", minHeight: "200px", margin: "auto" }}>
			<PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
				<ButtonWrapper
					setIsSuccess={setIsSuccess}
					payload={payload}
					showSpinner={false}
					currency={"USD"}
					amount={amount}
				/>
			</PayPalScriptProvider>
		</div>
	);
}
