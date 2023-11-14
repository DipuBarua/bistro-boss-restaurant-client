import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItems = data.filter(item => item.category === 'popular');
                setMenu(popularItems)
            })
    }, [])

    return (
        <section>
            <SectionTitle
                subHeading={'---Check out popular menu---'}
                heading={'Popular MENU'}
            >
            </SectionTitle>

            <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 mb-5">
                {
                    menu.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    >
                    </MenuItem>)
                }
            </div>

            <div className=" text-center mb-16">
                <button className=" btn btn-outline border-0 border-b-4 uppercase">View Full  Menu</button>
            </div>

        </section>
    );
};

export default PopularMenu;