import Cover from "../../Shared/Cover/Cover";
import orderCoverImg from "../../../assets/shop/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa"
import FoodCard from "../../../components/FoodCard/FoodCard";

const Order = () => {
    const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    // console.log(initialIndex);

    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();

    const salad = menu.filter(item => item.category === "salad");
    const pizza = menu.filter(item => item.category === "pizza");
    const soup = menu.filter(item => item.category === "soup");
    const dessert = menu.filter(item => item.category === "dessert");
    const drinks = menu.filter(item => item.category === "drinks");

    // search by title >>
    const [searchItems, setSearchItems] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchTitle = e.target.search.value;

        const searchMenus = menu.filter(cart => cart.name.toLowerCase().includes(searchTitle.toLowerCase()));

        console.log(searchMenus);
        setSearchItems(searchMenus)
    }

    return (
        <div>
            <Helmet>
                <title>
                    Bistro | Shop
                </title>
            </Helmet>

            <Cover img={orderCoverImg} title={"OUR SHOP"} description={"Would you like to try a dish?"}></Cover>

            {/* react tabs  */}
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soups</Tab>
                    <Tab>Desserts</Tab>
                    <Tab>Drinks</Tab>
                </TabList>

                <TabPanel>
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={soup}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={dessert}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                </TabPanel>

            </Tabs>


            {/* search  */}
            <form onSubmit={handleSearch} className=" flex justify-center my-16">
                <div className=" form-control bg-blue-800 w-1/2">
                    <label className=" input input-bordered flex items-center gap-2 px-0 rounded-none">
                        <input type="text" name="search" className="grow" placeholder=" Search with Title" />

                        <button type="submit" className=" bg-gray-300 h-full px-5 hover:bg-black hover:text-white">
                            <FaSearch className=" mt-2"></FaSearch>
                        </button>
                    </label>
                </div>
            </form>

            <div className="grid md:grid-cols-4 gap-5">
                {
                    searchItems.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                }
            </div>

        </div>
    );
};

export default Order;