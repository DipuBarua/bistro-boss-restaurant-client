import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaRocket } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const AddReview = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const onSubmit = async (data) => {
        console.log(data);

        const reviewData = {
            email: user.email,
            name: data.name,
            recipe: data.recipe,
            suggestion: data.suggestion,
            details: data.details,
            rating: parseInt(data.rating),
        }
        const reviewResult = await axiosPublic.post("/review", reviewData);
        console.log("review :", reviewResult.data);
        if (reviewResult.data.insertedId) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Thank you for your review.`,
                showConfirmButton: false,
                timer: 1500
            });
            reset();
        }
    }

    return (
        <div>
            <SectionTitle
                subHeading={"---Sharing is Caring!!!---"}
                heading={"GIVE A REVIEW..."}>
            </SectionTitle>

            <div className=" mx-5 mb-5 p-5 bg-gray-200">
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Rating */}
                    <h1 className=" text-2xl font-light pb-2">RATE US!</h1>
                    <div className="rating">
                        <input
                            type="radio"
                            name="rating-2"
                            value={1}
                            {...register("rating")}
                            className="mask mask-star-2 bg-orange-400" />
                        <input
                            type="radio"
                            name="rating-2"
                            value={2}
                            {...register("rating")}
                            className="mask mask-star-2 bg-orange-400" />
                        <input
                            type="radio"
                            name="rating-2"
                            value={3}
                            {...register("rating")}
                            checked
                            className="mask mask-star-2 bg-orange-400" />
                        <input
                            type="radio"
                            name="rating-2"
                            value={4}
                            {...register("rating")}
                            className="mask mask-star-2 bg-orange-400" />
                        <input
                            type="radio"
                            name="rating-2"
                            value={5}
                            {...register("rating")}
                            className="mask mask-star-2 bg-orange-400" />
                    </div>


                    {/* Name */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe you liked most"
                            defaultValue={user.displayName}
                            {...register('name', { required: true })}
                            className="input input-bordered w-full" />
                    </div>

                    {/* Which recipe you liked most?  */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Which recipe you liked most?</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe you liked most"
                            defaultValue={""}
                            {...register('recipe', { required: false })}
                            className="input input-bordered w-full" />
                    </div>

                    {/* Do you have any suggestion for us?  */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Do you have any suggestion for us?</span>
                        </label>
                        <input
                            type="text"
                            placeholder="suggestion"
                            defaultValue={""}
                            {...register('suggestion', { required: false })}
                            className="input input-bordered w-full" />
                    </div>

                    {/* Kindly express your care in a short way. */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Kindly express your care in a short way.</span>
                        </label>
                        <textarea {...register('details', { required: false })}
                            className="textarea textarea-bordered h-24"
                            defaultValue={""}
                            placeholder="Review in detail"></textarea>
                    </div>

                    <button className="btn my-2">
                        Send Review <FaRocket className=" text-xl text-orange-500"></FaRocket>
                    </button>
                </form>
            </div>

        </div>
    );
};

export default AddReview;