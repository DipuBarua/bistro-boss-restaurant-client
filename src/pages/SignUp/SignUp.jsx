import { Link, useNavigate } from "react-router-dom";
import registerImg from "../../assets/others/authentication2.png";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../contextProviders/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(res => {
                const loggedUser = res.user;
                console.log(loggedUser);

                // updated: user-name,photo
                updateUser(data.name, data.photo)
                    .then(res => {
                        console.log("user profile updated.", res);
                        reset();

                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post("/users", userInfo)
                            .then(res => {
                                console.log(res.data);
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Your profile successfully created",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate("/");
                                }
                            })
                    })
                    .catch(err => console.log(err))
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <>
            <Helmet>
                <title>
                    Bistro | SignUp
                </title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex flex-col md:flex-row gap-10">
                    <img src={registerImg} alt="" />
                    <div className="card flex-shrink-0 w-full max-w-xl shadow-2xl shadow-blue-300 bg-yellow-50 rounded-none my-16">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h2 className=" text-center text-3xl font-bold">Sign Up</h2>
                            {/* Name  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                                {errors.name && <span className=" text-red-600">This field is required</span>}
                            </div>
                            {/* Photo  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="url" {...register("photo", { required: true })} name="photo" placeholder="Your photo URL" className="input input-bordered" />
                                {errors.photo && <span className=" text-red-600">Photo URL is required</span>}
                            </div>
                            {/* Email  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className=" text-red-600">This field is required</span>}
                            </div>
                            {/* Password  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Create Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                                })} name="password" placeholder="password" className="input input-bordered" />

                                {errors.password?.type === "required" && (
                                    <span className=" text-red-600">password is required</span>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <span className=" text-red-600">password must have at least 6 characters</span>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <span className=" text-red-600">password must be less than 20 characters</span>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <span className=" text-red-600">password must have at least 1 upper case, 1 lower case, 1 number, 1 sepical character.</span>
                                )}
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
        </>
    );
};

export default SignUp;