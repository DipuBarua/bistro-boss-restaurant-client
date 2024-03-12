import { FaCheck } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageBookings = () => {
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            const result = await axiosSecure.get("/bookings");
            return result.data;
        }
    })

    const handleActionBtn = async (id) => {
        const updateBooking = await axiosSecure.patch(`/booking/${id}`);
        console.log(updateBooking.data);

        if (updateBooking.data.modifiedCount > 0) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Booking Confirmed",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    }

    return (
        <div>
            <Helmet>
                <title>Bristo | Dashboard | Admin | ManageBookings</title>
            </Helmet>

            <SectionTitle
                subHeading={"---Ecellent Ambience---"}
                heading={"My Booking"}>
            </SectionTitle>

            <div className=" flex justify-evenly mb-5 pt-5 pb-3 bg-orange-500 mx-10">
                <h2 className=" text-3xl font-bold">Total Bookings: {""}</h2>
            </div>

            <div className="overflow-x-auto pl-8 pt-5 bg-slate-200 mx-10 mb-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                SL.
                            </th>
                            <th>User Email</th>
                            <th>User Name</th>
                            <th>Phone Number</th>
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
                                        <p>{booking.email}</p>
                                    </div>
                                </td>

                                <td>
                                    <div className="">
                                        <p>{booking.name}</p>
                                    </div>
                                </td>

                                <td>
                                    <div className="">
                                        <p>{booking.phone}</p>
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
                                        booking.status === "pending" ?
                                            <p className=" font-semibold text-orange-500">{booking.status}</p> :
                                            <p className=" font-semibold text-green-500">{booking.status}</p>

                                    }
                                </td>

                                <th>
                                    <button onClick={() => handleActionBtn(booking._id)} className="btn btn-ghost rounded-full hover:bg-blue-300">
                                        <FaCheck></FaCheck>
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

export default ManageBookings;