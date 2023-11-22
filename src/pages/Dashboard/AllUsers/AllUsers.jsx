import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    // used tenstack query and axios for data fetching
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const result = await axiosSecure.get("/users");
            // console.log(result.data);
            return result.data;
        }
    })

    const handleMakeAdmin = (id) => {
        axiosSecure.patch(`/users/admin/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Promoted to Admin",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleUserDelete = (id) => {
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
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `User has been deleted.`,
                                icon: "success"
                            });
                        }
                        console.log(res.data);
                    })


            }
        });
    }

    return (
        <div>
            <div className=" flex justify-evenly mb-5 pt-5 bg-orange-500 mx-10">
                <h2 className=" text-3xl font-bold">All Users</h2>
                <h2 className=" text-3xl font-bold">Total Users:{users.length} </h2>
            </div>

            <div className="overflow-x-auto pl-8 pt-5">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* single row  */}
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>

                                <td>
                                    <div className="font-bold">{user.name}</div>
                                </td>

                                <td>
                                    <div className="font-bold">{user.email}</div>
                                </td>

                                <th>
                                    {(user.role === "admin") ?
                                        <p className=" text-green-600">Admin</p>
                                        :
                                        <button onClick={() => handleMakeAdmin(user._id)} className="btn border border-blue-900 hover:bg-orange-400">
                                            <FaUser className=" text-blue-900" />
                                        </button>
                                    }
                                </th>

                                <th>
                                    <button onClick={() => handleUserDelete(user._id)} className="btn btn-ghost">
                                        <FaTrash className=" text-xl text-red-600" />
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

export default AllUsers;