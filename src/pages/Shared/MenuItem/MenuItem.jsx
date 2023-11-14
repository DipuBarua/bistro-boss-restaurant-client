const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (
        <div className=" flex space-x-8 mx-10">
            <img className=" w-1/2 h-1/3 md:w-1/6 md:h-2/3 rounded-r-full rounded-b-full" src={image} alt="" />
            <div>
                <h2 className=" uppercase">{name} -------------------------</h2>
                <p>{recipe}</p>
            </div>
            <p className=" text-orange-600">${price}</p>
        </div>
    );
};

export default MenuItem;