
const FoodCard = ({ item }) => {
    const { name, image, price, recipe } = item;

    return (
        <div className="card w-96 bg-base-200 shadow-xl rounded-none">
            <figure className=" px-10 pt-10">
                <img src={image} alt="food img" className="" />
                <p className=" absolute right-12 top-12 px-2 bg-slate-800 text-white">${price}</p>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button className=" btn btn-outline border-0 border-b-4 text-orange-600 hover:text-orange-600 hover:border-orange-600 uppercase">add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;