import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleLogIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleLogIn()
            .then(res => {
                console.log(res.user);
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email
                }
                axiosPublic.post("/users", userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <button onClick={handleGoogleSignIn} className="btn rounded-none border border-black p-2 flex justify-center">
            <button className="text-3xl"><FcGoogle></FcGoogle></button>
        </button>
    );
};

export default SocialLogin;