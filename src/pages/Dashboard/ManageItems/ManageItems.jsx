import { FaEdit, FaTrash } from "react-icons/fa";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ManageItems = () => {
    const [menu, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${id}`)
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Item has been deleted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            }
        });
    }

    return (
        <div className="overflow-x-auto">
            <Helmet>
                <title>Bristo | Dashboard | Admin | ManageItems</title>
            </Helmet>

            <SectionTitle
                subHeading={"---Hurry Up!---"}
                heading={"MANAGE ALL ITEMS"}>
            </SectionTitle>

            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>
                            <label>
                                SL.
                            </label>
                        </th>

                        <th>ITEM_IMAGE</th>
                        <th>ITEM_NAME</th>
                        <th>PRICE ($)</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        menu.map((item, index) => <>

                            {/* A row */}
                            <tr>
                                <th></th>

                                {/* serial no  */}
                                <th>
                                    <label>
                                        <p>{index + 1}</p>
                                    </label>
                                </th>

                                {/* ITEM_IMAGE */}
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="img." />
                                        </div>
                                    </div>
                                </td>

                                {/* ITEM_NAME */}
                                <td>
                                    <div className="font-bold">{item.name}</div>
                                </td>

                                {/* PRICE  */}
                                <td>
                                    <div className=" text-xl">$ {item.price}</div>
                                </td>

                                {/* EDIT  */}
                                <th>
                                    <Link to={`/dashboard/updateItem/${item._id}`}>
                                        <button className="btn btn-ghost text-xl hover:bg-orange-600">
                                            <FaEdit></FaEdit>
                                        </button>
                                    </Link>
                                </th>

                                {/* DELETE  */}
                                <th>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost text-xl hover:bg-red-500 hover:text-white">
                                        <FaTrash></FaTrash>
                                    </button>
                                </th>

                                <td></td>

                            </tr>
                        </>)
                    }

                </tbody>

            </table>
        </div>
    );
};

export default ManageItems;