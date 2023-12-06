import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";

// publishable key has added from stripe
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    return (
        <div>
            <Helmet>
                <title>Bristo | Dashboard | Reservation</title>
            </Helmet>

            <div className=" flex justify-evenly mb-5 pt-5 pb-3 bg-orange-500 mx-10">
                <h2 className=" text-3xl font-bold">PAYMENT</h2>
            </div>

            <div className=" lg:w-2/3 mx-auto my-24">
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;