import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AddReview from "../pages/Dashboard/AddReview/AddReview";
import Reservation from "../pages/Dashboard/Reservation/Reservation";
import MyBooking from "../pages/Dashboard/MyBooking/MyBooking";
import ManageBookings from "../pages/Dashboard/ManageBookings/ManageBookings";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/menu",
                element: <Menu></Menu>
            },
            {
                path: "/order/:category",
                element: <Order></Order>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            // normal user's routes 
            {
                path: "userHome",
                element: <UserHome></UserHome>
            },
            {
                path: "cart",
                element: <Cart></Cart>
            },
            {
                path: "payment",
                element: <Payment></Payment>
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: "addReview",
                element: <AddReview></AddReview>
            },
            {
                path: "reservation",
                element: <Reservation></Reservation>
            },
            {
                path: "myBooking",
                element: <MyBooking></MyBooking>
            },
            {
                path: "manageBookings",
                element: <ManageBookings></ManageBookings>
            },
            // admin user's routes 
            {
                path: "adminHome",
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: "addItems",
                element: <AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path: "allUsers",
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: "manageItems",
                element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
            },
            {
                path: "updateItem/:id",
                element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader: ({ params }) => fetch(`https://bistro-boss-restaurant-server-alpha.vercel.app/menu/${params.id}`)
            }
        ]
    }
]);

export default router;