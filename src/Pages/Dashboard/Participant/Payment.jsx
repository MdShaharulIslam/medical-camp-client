import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./../../../Components/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import PageHeader from "../../../Components/PageHeader";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
const Payment = () => {
	return (
		<div>
			<PageHeader title="Payment" />
			<div>
				<Elements stripe={stripePromise}>
					<CheckOutForm></CheckOutForm>
				</Elements>
			</div>
		</div>
	);
};

export default Payment;
