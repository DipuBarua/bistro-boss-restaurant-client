import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../assets/others/authentication2.png";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../contextProviders/AuthProvider";

const Login = () => {
    const { logIn } = useContext(AuthContext);
    // const captchaRef = useRef(null);
    const [disable, setDisable] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        const from = location.state?.from?.pathname || "/";

        // Login by email password
        logIn(email, password)
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true });
            })
            .catch(error => console.log(error))
    }

    const handleValidateCaptcha = (e) => {
        // const user_captcha_value = captchaRef.current.value;
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value) === true) {
            setDisable(false);
        }
        else {
            setDisable(true);
        }
    }

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    return (
        <>
            <Helmet>
                <title>
                    Bistro | LogIn
                </title>
            </Helmet>

            <div className="hero min-h-screen bg-blue-50">
                <div className="hero-content flex flex-col md:flex-row gap-16 my-16">
                    <img className="" src={loginImg} alt="" />
                    <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl shadow-blue-300 bg-base-100 rounded-none">
                        <form onSubmit={handleLogin} className="card-body">
                            <h2 className=" text-center text-3xl font-bold">Log In</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-2">
                                <LoadCanvasTemplate />
                                <input
                                    type="text"
                                    onBlur={handleValidateCaptcha}
                                    // ref={captchaRef} 
                                    placeholder="type the captcha above"
                                    className="input input-bordered" />
                                {/* <button onClick={handleValidateCaptcha} className="btn btn-outline btn-xs mt-2 rounded-none">Validate</button> */}
                            </div>

                            <div className="form-control mt-6">
                                <input disabled={disable} type="submit" value="Log In" className="btn btn-outline hover:bg-orange-600 rounded-none text-xl" />
                            </div>

                            {/* <div className=" border border-black p-2 flex justify-center">
                            <button onClick={handleGoogleLogin} className="text-3xl"><FcGoogle></FcGoogle></button>
                        </div> */}

                            <div className=" border border-black p-2">
                                <p>Have an account? if no, please <Link to={'/signup'}><button className="btn-link font-semibold text-orange-600">Sign Up</button></Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;