import { Link } from "react-router-dom";
import registerImg from "../../assets/others/authentication2.png";
import { useForm } from "react-hook-form"

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex flex-col md:flex-row gap-10">
                <img src={registerImg} alt="" />
                <div className="card flex-shrink-0 w-full max-w-xl shadow-2xl shadow-blue-300 bg-yellow-50 rounded-none my-16">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h2 className=" text-center text-3xl font-bold">Sign Up</h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                            {errors.name && <span className=" text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className=" text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Create Password</span>
                            </label>
                            <input type="password" {...register("password", { required: true })} name="password" placeholder="password" className="input input-bordered" />
                            {errors.password && <span className=" text-red-600">This field is required</span>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-outline rounded-none hover:bg-orange-600">Sign Up</button>
                        </div>
                        <div>
                            <p>Already have an account? if Yes, please <Link to={"/login"}><button className="btn-link font-semibold text-orange-600">Login</button></Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;