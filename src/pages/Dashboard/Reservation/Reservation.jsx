import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import { FaClock, FaLocationArrow, FaPhoneAlt, FaTable } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        console.log(data);

        const reservationData = {
            date: data.date,
            time: data.time,
            guest: parseInt(data.guest),
            name: data.name,
            phone: data.phone,
            email: data.email,
            status: "pending",
        }
        console.log(reservationData);


        const reservation = await axiosPublic.post("/bookings", reservationData);
        console.log(reservation.data);
        if (reservation.data.insertedId) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Reservation has Submitted`,
                showConfirmButton: false,
                timer: 1500
            });
            reset();
            navigate('/dashboard/myBooking')
        }

    }


    return (
        <div>
            <SectionTitle
                subHeading={"---Reservation---"}
                heading={"Book A Table"}>
            </SectionTitle>

            <div className=" mx-5 mb-5 p-5 bg-gray-200">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className=" grid grid-cols-3 gap-10">
                        {/* Date */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input
                                type="date"
                                {...register('date', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                        {/* Time */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Time</span>
                            </label>
                            <input
                                type="time"
                                {...register('time', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                        {/* Guest */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Guest</span>
                            </label>
                            <select
                                {...register('guest', { required: true })}
                                className="select select-bordered w-full">
                                <option value="1">1 person</option>
                                <option value="2">2 persons</option>
                                <option value="3">3 persons</option>
                                <option value="4">4 persons</option>
                                <option value="6">6 persons</option>
                                <option value="8">8 persons</option>
                                <option value="10">10 persons</option>
                            </select>
                        </div>

                        {/* Name */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                defaultValue={user.displayName}
                                {...register('name', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                        {/* phone */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                {...register('phone', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                        {/* email */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                defaultValue={user?.email}
                                {...register('email', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>

                    <button className="btn my-2">
                        Book A Table <FaTable className=" text-xl text-orange-500"></FaTable>
                    </button>
                </form>
            </div>


            <SectionTitle
                subHeading={"---Visit Us---"}
                heading={"Our Location"}>
            </SectionTitle>

            <div className=" grid grid-cols-3 gap-5 mb-10 mx-10 bg-slate-200 pb-10">
                <div>
                    <div className=" bg-orange-500 p-2 mb-4 flex justify-center text-white"><FaPhoneAlt></FaPhoneAlt></div>
                    <p className=" text-xl font-semibold uppercase">Phone</p>
                    <p className=" font-sans">+880 183 2423 324</p>
                </div>
                <div>
                    <div className=" bg-orange-500 p-2 mb-4 flex justify-center text-white"><FaLocationArrow></FaLocationArrow></div>
                    <p className=" text-xl font-semibold uppercase">Address</p>
                    <p className=" font-sans">21,no Jamalkhan,<br /> Chittagong</p>
                </div>
                <div>
                    <div className=" bg-orange-500 p-2 mb-4 flex justify-center text-white"><FaClock></FaClock></div>
                    <p className=" text-xl font-semibold uppercase">Working Hours</p>
                    <p className=" font-sans">sunday - thursday <br />9:00AM - 6:00PM</p>
                </div>
            </div>

        </div>
    );
};

export default Reservation;