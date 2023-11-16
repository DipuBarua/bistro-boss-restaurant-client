import FoodCard from "../../../components/FoodCard/FoodCard";

const OrderTab = ({ items }) => {
    return (
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 my-16">
            {
                items.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
            }
        </div>
    );
};

export default OrderTab;