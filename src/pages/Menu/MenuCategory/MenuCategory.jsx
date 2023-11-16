import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, img, title, description }) => {
    return (
        <div className="mt-24">
            {title &&
                <Cover img={img} title={title} description={description}></Cover>
            }

            <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    >
                    </MenuItem>)
                }
            </div>
            <div className=" text-center mb-16">
                <Link to={`/order`}>
                    <button className=" btn btn-outline border-0 border-b-4 uppercase">ORDER YOUR FAVOURITE FOOD</button>
                </Link>
            </div>
        </div>

    );
};

export default MenuCategory;