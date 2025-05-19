import { useState, React } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login function triggered");

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            console.log("Invalid email format");
            return;
        }
        if (!password) {
            setError("Please enter your password");
            console.log("Password is empty");
            return;
        }
        setError("");
        try {
            console.log("Attempting login with payload:", { email, password });
            const response = await axiosInstance.post("/login", { email, password });
            console.log("Login response:", response);
            localStorage.setItem("User", JSON.stringify(response.user));
            if (response.data && response.data.token) {
                console.log("Access token received:", response.data.token);
                localStorage.setItem("token", response.data.token);
                console.log("Token saved in localStorage");
                navigate("/");
                console.log("Navigating to dashboard");
            } else {
                console.log("Access token missing in response data");
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again");
            }
        }
    };


    return (
        <>
            <Navbar />

            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded bg-apricot px-7 py-10'>
                    <form onSubmit={handleLogin}>
                        <h4 className='text-2xl mb-7'>Login</h4>

                        <input type="text" name="email" id="email" placeholder='Email' className='input-box' value={email} onChange={(e) => setEmail(e.target.value)} />

                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

                        {error && <p className='text-red-600 text-xs pb-1'>{error}</p>}

                        <button type='submit' className=' btn-primary'>
                            Login
                        </button>

                        <p className='text-sm text-center mt-4'>Not registered yet?{" "}
                            <Link to='/signup' className="font-medium text-leather underline">
                                Create an Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login