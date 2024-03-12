import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBookOpen, FaBoxOpen, FaDollarSign, FaUsers } from "react-icons/fa";
import moment from "moment";
//  chart import 
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
// pie chart 
import { PieChart, Pie } from 'recharts';
import { Helmet } from "react-helmet-async";


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

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get("/order-stats");
            return res.data;
        }
    })

    // customized bar chart 
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
                  ${x + width / 2}, ${y}
                  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
                  Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // customized pie chart 
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.revenue }
    })


    return (
        <div>
            <Helmet>
                <title>Bristo | Dashboard | Admin | Home</title>
            </Helmet>

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

            {/* Bar chart  */}
            <div className=" flex items-center">
                <div>
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>

                {/* pie chart  */}
                <div>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>


        </div>
    );
};

export default AdminHome;