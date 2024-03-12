import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaDownload, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyBooking = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings', user.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/bookings/${user.email}`);
            return res.data;
        }
    })

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete Booking!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const deleteBooking = await axiosPublic.delete(`/booking/${id}`);
                console.log(deleteBooking.data);
                refetch();

                if (deleteBooking.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Booking has been deleted",
                        icon: "success"
                    });
                }

            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>Bristo | Dashboard | MyBookings</title>
            </Helmet>

            <SectionTitle
                subHeading={"---Ecellent Ambience---"}
                heading={"My Booking"}>
            </SectionTitle>

            <div className=" flex justify-evenly mb-5 pt-5 pb-3 bg-orange-500 mx-10">
                <h2 className=" text-3xl font-bold">Total Bookings: {''}</h2>
                {
                    'cart'.length ?
                        <Link to={''}>
                            <button className="btn btn-ghost"><FaDownload></FaDownload>Download</button>
                        </Link>
                        :
                        <Link>
                            <button disabled className="btn">Download</button>
                        </Link>
                }
            </div>

            <div className="overflow-x-auto pl-8 pt-5 bg-slate-200 mx-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                SL.
                            </th>
                            <th>User</th>
                            <th>Guest Number</th>
                            <th>Booking Date</th>
                            <th>Booking Time</th>
                            <th>Activity</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* single row  */}
                        {
                            bookings.map((booking, index) => <tr key={booking._id}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>

                                <td>
                                    <div className="">
                                        <p>{booking.name}</p>
                                    </div>
                                </td>

                                <td>
                                    <p className="font-bold">{booking.guest}</p>
                                </td>

                                <td>
                                    <p>{booking.date}</p>
                                </td>

                                <td>
                                    <p>{booking.time}</p>
                                </td>

                                <td>
                                    {
                                        booking.status === "Done" ?
                                            <p className=" font-semibold text-green-500">Booking Confirmed</p>
                                            :
                                            <p className=" font-semibold text-orange-500">{booking.status}</p>
                                    }
                                </td>

                                <th>
                                    <button onClick={() => handleDelete(booking._id)} className="btn btn-ghost">
                                        <FaTrash className=" text-2xl hover:text-red-600" />
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyBooking;