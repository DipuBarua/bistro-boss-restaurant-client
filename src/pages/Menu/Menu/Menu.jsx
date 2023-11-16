import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import coverImg from "../../../assets/menu/banner3.jpg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";


const Menu = () => {
    const [menu] = useMenu();

    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    const offered = menu.filter(item => item.category === 'offered');

    return (
        <div>
            <Helmet>
                <title>
                    Bistro | Menu
                </title>
            </Helmet>

            {/* Menu cover */}
            <Cover
                img={coverImg}
                title={'OUR MENU'}
                description={'Would you like to try a dish?'}
            ></Cover>

            {/* Offered  */}
            <SectionTitle
                subHeading={"---Don't miss---"}
                heading={"TODAY'S OFFER"}
            ></SectionTitle>
            <MenuCategory
                items={offered}
            ></MenuCategory>

            {/* Desserts */}
            <MenuCategory
                items={dessert}
                img={dessertImg}
                title={"dessert"}
                description={"It's dessert"}
            ></MenuCategory>

            {/* Pizza */}
            <MenuCategory
                items={pizza}
                img={pizzaImg}
                title={"pizza"}
                description={"It's pizza"}
            ></MenuCategory>

            {/* Salads */}
            <MenuCategory
                items={salad}
                img={saladImg}
                title={"salad"}
                description={"It's salad"}
            ></MenuCategory>

            {/* Soups */}
            <MenuCategory
                items={soup}
                img={soupImg}
                title={"soup"}
                description={"It's soup"}
            ></MenuCategory>

        </div>
    );
};

export default Menu;