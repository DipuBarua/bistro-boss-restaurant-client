import { FaBook, FaBoxes, FaPhoneAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: statistics = [] } = useQuery({
        queryKey: ["user-stats", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-stats/${user.email}`);
            return res.data;
        }
    })
    console.log("statistics shop", statistics?.totalShop);
    console.log("statistics menus", statistics?.totalMenus);

    return (
        <div>
            <h1 className=" text-3xl font-semibold text-start px-10 py-5">Hi, Welcome Back!</h1>

            <div className="stats shadow w-full rounded-none bg-slate-200 mx-10">
                <div className=" flex text-center items-center gap-3 p-5">
                    <div className="stat-figure text-secondary">
                        <FaBook className=" text-3xl text-blue-500"></FaBook>
                    </div>
                    <div>
                        <div className="stat-value">{statistics.totalMenus}</div>
                        <div className="stat-title">Menu</div>
                    </div>
                </div>

                <div className=" flex text-center items-center gap-3 p-5">
                    <div className="stat-figure text-secondary">
                        <FaBoxes className=" text-3xl text-blue-500"></FaBoxes>
                    </div>
                    <div>
                        <div className="stat-value">{statistics.totalShop}</div>
                        <div className="stat-title">Shop</div>
                    </div>
                </div>

                <div className=" flex text-center items-center gap-3 p-5">
                    <div className="stat-figure text-secondary">
                        <FaPhoneAlt className=" text-3xl text-blue-500"></FaPhoneAlt>
                    </div>
                    <div>
                        <div className="stat-value">0</div>
                        <div className="stat-title">Contact</div>
                    </div>
                </div>

            </div>

            <div className=" mt-5 mx-10 flex">
                <div className=" flex-1 bg-yellow-50 border-r-2 border-black items-center py-20">
                    <div className="avatar mb-4">
                        <div className="w-24 rounded-full ring ring-orange-400 ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL} alt="" />
                        </div>
                    </div>
                    <h3 className=" font-bold">{user?.displayName}</h3>
                </div>
                <div className=" flex-1 bg-violet-100 items-center py-20 pl-7 text-start">
                    <h3 className=" font-bold text-2xl pb-2 text-center">My Activities</h3>
                    <p className=" font-semibold"><span className=" pr-3">ORDERS :</span>{statistics.totalOrder}</p>
                    <p className=" font-semibold"><span className=" pr-3">RIVIEWS :</span>{statistics.totalReviews}</p>
                    <p className=" font-semibold"><span className=" pr-3">BOOKINGS :</span>{statistics.totalbookings}</p>
                    <p className=" font-semibold"><span className=" pr-3">PAYMENTS :</span>{statistics.totalShop}</p>
                </div>
            </div>


        </div>
    );
};

export default UserHome;