
const SectionTitle = ({ subHeading, heading }) => {
    return (
        <div className=" text-center w-1/4 mx-auto my-10">
            <p className=" text-orange-600 m-2">{subHeading}</p>
            <h2 className=" uppercase text-3xl border-y-4 py-4">{heading}</h2>
        </div>
    );
};

export default SectionTitle;