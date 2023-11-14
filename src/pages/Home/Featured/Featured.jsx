import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import fraturedImg from "../../../assets/home/featured.jpg"
import moment from "moment/moment";
import "./Featured.css"
const Featured = () => {
    return (
        <section className="featured-item text-white pt-8 mb-16 bg-fixed">
            <SectionTitle
                subHeading={'---Check it out---'}
                heading={'FROM OUR MENU'}
            ></SectionTitle>

            <div className=" bg-slate-500 bg-opacity-30 md:flex items-center justify-center px-40 py-24">
                <div>
                    <img src={fraturedImg} alt="" />
                </div>
                <div className="md:ml-10 space-y-2">
                    <p>{moment().format("MMMM D, YYYY")}</p>
                    <p className=" uppercase">WHERE CAN I GET SOME?</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
                    </p>
                    <button className=" btn btn-outline border-0 border-b-4 uppercase">Read more</button>
                </div>
            </div>

        </section>
    );
};

export default Featured;