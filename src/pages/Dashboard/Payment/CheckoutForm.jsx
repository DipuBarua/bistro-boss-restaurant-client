import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = () => {
    const [error, setError] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const { user } = useAuth();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    // console.log('price',totalPrice);
    useEffect(() => {
        // if (totalPrice > 0) {}
        axiosSecure.post("/create-payment-intent", { price: totalPrice })
            .then(res => {
                console.log("client secrite:", res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log("payment error:", error);
            setError(error.message);
        }
        else {
            console.log("payment method:", paymentMethod);
            setError("");
        }

        // confirm payment
        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "anonymous",
                    email: user?.email || "anonymous",
                }
            }
        })
        if (paymentError) {
            console.log('payment error:', paymentError);
        }
        else {
            console.log("payment Intent", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction Id:', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),//convert into UTC.
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: "pending"
                }

                const res = await axiosSecure.post('/payments', payment)
                console.log('payment info saved and deleted items from cart:', res.data);
                refetch();
            }
        }


    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className=" btn btn-accent p-5 mt-10"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay
                </button>
                <p className=" mt-2 text-red-600">{error}</p>
                {transactionId && <p className=" text-green-600">Your transaction Id: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;