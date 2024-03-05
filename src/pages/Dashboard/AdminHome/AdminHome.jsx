import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBookOpen, FaBoxOpen, FaDollarSign, FaUsers } from "react-icons/fa";
import moment from "moment";

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = [] } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats");
            return res.data;
        }
    });

    return (
        <div>
            <div className=" flex justify-evenly mb-5 pt-5 bg-orange-500 mx-10">
                <h2 className=" text-3xl font-bold">Hi Welcome! {user?.displayName ? user.displayName : "Dear User"}</h2>
            </div>

            <div className="stats shadow-2xl shadow-orange-200 bg-slate-100 rounded-none mt-5 p-7">

                <div className="stat">
                    <div className="stat-figure text-secondary text-4xl">
                        <FaDollarSign></FaDollarSign>
                    </div>
                    <div className="stat-title text-xl">Revenue</div>
                    <div className="stat-value text-5xl">{stats.revenue}</div>
                    <div className="stat-desc">Jan 1st - {moment().format("MMM Do")}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary text-4xl">
                        <FaUsers></FaUsers>
                    </div>
                    <div className="stat-title text-xl">Users</div>
                    <div className="stat-value text-5xl">{stats.users}</div>
                    {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary text-4xl">
                        <FaBookOpen></FaBookOpen>
                    </div>
                    <div className="stat-title text-xl">Menu Items</div>
                    <div className="stat-value text-5xl">{stats.menuItems}</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary text-4xl">
                        <FaBoxOpen></FaBoxOpen>
                    </div>
                    <div className="stat-title text-xl">Orders</div>
                    <div className="stat-value text-5xl">{stats.orders}</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>

            </div>

        </div>
    );
};

export default AdminHome;