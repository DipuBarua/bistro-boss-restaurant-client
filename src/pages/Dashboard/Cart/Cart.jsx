import { FaTrash } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Cart = () => {
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `Item has been deleted.`,
                                icon: "success"
                            });
                        }
                        console.log(res.data);
                    })


            }
        });
    }

    return (
        <>
            <Helmet>
                <title>Bristo | Dashboard | MyCart</title>
            </Helmet>

            <div className=" flex justify-evenly mb-5 pt-5 pb-3 bg-orange-500 mx-10">
                <h2 className=" text-3xl font-bold">Total Orders: {cart.length}</h2>
                <h2 className=" text-3xl font-bold">Total Price: ${totalPrice}</h2>
                {
                    cart.length ?
                        <Link to={'/dashboard/payment'}>
                            <button className="btn btn-primary">Pay</button>
                        </Link>
                        :
                        <Link>
                            <button disabled className="btn btn-primary">Pay</button>
                        </Link>
                }
            </div>

            <div className="overflow-x-auto pl-8 pt-5">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                SL.
                            </th>
                            <th>ITEM IMAGE</th>
                            <th>ITEM NAME</th>
                            <th>PRICE</th>
                            <th>ACTION</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* single row  */}
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>

                                <td>
                                    <div className="avatar">
                                        <div className=" rounded ring-2 w-24 h-16">
                                            <img src={item.image} alt="food img." />
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="font-bold">{item.name}</div>
                                </td>

                                <td>
                                    <div>{item.price}</div>
                                </td>

                                <th>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost">
                                        <FaTrash className=" text-2xl text-red-600" />
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Cart;