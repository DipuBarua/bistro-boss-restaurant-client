import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })
    console.log("payment history", payments)

    return (
        <div>
            <Helmet>
                <title>Bristo | Dashboard | Payment History</title>
            </Helmet>

            <div className=" flex justify-evenly mb-5 pt-5 pb-3 bg-orange-500 mx-10">
                <h2 className=" text-3xl font-bold">PAYMENT HISTORY</h2>
            </div>

            {/* Table  */}
            <div className="overflow-x-auto">
                <table className="table table-xs text-xl">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Transaction Id</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment, index) => <tr key={payment._id}>
                            <th>{index + 1}</th>
                            <td>{payment.date}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.price}</td>
                            <td>{payment.status}</td>
                        </tr>)}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;