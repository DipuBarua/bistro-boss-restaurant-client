import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCard = () => {
        if (user && user.email) {
            //send food Item to the database
            const cardItems = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }

            axiosSecure.post("/carts", cardItems)
                .then(res => {
                    console.log(res.data);

                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} successfully added to cart`,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        // refetch the cart Items to update the added cart count 
                        refetch();
                    }
                })

        }
        else {
            Swal.fire({
                title: "Please login to add the cart",
                text: "Do you want to add the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, LogIn"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }

    return (
        <div className="card w-96 bg-base-200 shadow-xl rounded-none">
            <figure className=" px-10 pt-10">
                <img src={image} alt="food img" className="" />
                <p className=" absolute right-12 top-12 px-2 bg-slate-800 text-white">${price}</p>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button onClick={() => handleAddToCard()} className=" btn btn-outline border-0 border-b-4 text-orange-600 hover:text-white hover:border-orange-600 uppercase">add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;