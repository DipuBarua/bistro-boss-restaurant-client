import { NavLink, Outlet } from "react-router-dom";
import { FaAddressBook, FaBars, FaCalendar, FaComment, FaHome, FaMoneyCheckAlt, FaPhoneAlt, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import useCart from "../hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart();
    return (
        <div className=" flex">
            {/* Dashboard Slidebar  */}
            <div className=" w-64 min-h-screen bg-orange-500">
                <li className=" menu-title"> <p className=" text-2xl">BISTRO BOSS</p> Restaurant</li>
                <ul className=" menu">
                    <li>
                        <NavLink to={'/dashboard/userHome'}>
                            <FaHome className=""></FaHome>
                            User Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/reservation'}>
                            <FaCalendar className=""></FaCalendar>
                            Reservation
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/payment'}>
                            <FaMoneyCheckAlt className=""></FaMoneyCheckAlt>
                            Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/cart'}>
                            <FaShoppingCart className=""></FaShoppingCart>
                            My Cart || {cart.length}*
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/addReview'}>
                            <FaComment className=""></FaComment>
                            Add Review
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/myBooking'}>
                            <FaAddressBook className=""></FaAddressBook>
                            My Booking
                        </NavLink>
                    </li>

                    <div className=" divider"></div>

                    <li>
                        <NavLink to={'/'}>
                            <FaHome className=""></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/menu'}>
                            <FaBars className=""></FaBars>
                            Our Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/order/salad'}>
                            <FaShoppingBag className=""></FaShoppingBag>
                            Our Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/'}>
                            <FaPhoneAlt className=""></FaPhoneAlt>
                            Contact
                        </NavLink>
                    </li>

                </ul>
            </div>
            {/* Dashboard Contents  */}
            <div className=" flex-1 text-center">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;