import { Link } from "react-router-dom";
import loginImg from "../../assets/others/authentication2.png";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useRef, useState } from "react";

const Login = () => {
    const captchaRef = useRef(null);

    const [disable, setDisable] = useState(true);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
    }

    const handleValidateCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;
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
        <div className="hero min-h-screen bg-base-100">
            <div className="hero-content flex flex-col md:flex-row gap-24 my-16">
                <img className=" w-2/3" src={loginImg} alt="" />
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
                            <input type="text" ref={captchaRef} name="captcha" placeholder="type the captcha above" className="input input-bordered" required />
                            <button onClick={handleValidateCaptcha} className="btn btn-outline btn-xs mt-2 rounded-none">Validate</button>
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
    );
};

export default Login;