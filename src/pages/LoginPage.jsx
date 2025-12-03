
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const [mobile, setMobile] = useState("+91");
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSendOtp = () => {

        const userMobile = localStorage.getItem("PhoneNo");
        if (userMobile !== mobile) {
            setError("Mobile number not registered");
            return;
        }

        setError("");

        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(newOtp);


        localStorage.setItem("otp", newOtp);

        alert("Your OTP is: " + newOtp);

        setStep(2);
    };

    const handleVerify = () => {

        const storedOtp = localStorage.getItem("otp");

        if (otp === storedOtp && otp !== "") {
            alert("Login Successful!");
            setError("");
            navigate('/profile');
        } else {
            setError("Incorrect OTP");
        }

    };

    return (
        <div className='min-h-screen flex justify-center items-center px-5'>
            <div className='bg-white px-12 rounded-xl w-full mt-8 md:mt-12 py-12 sm:w-96 md:w-200'>
                <h1 className='font-bold flex justify-center mb-8' style={{ fontSize: '32px' }}>Login</h1>

                <form>
                    {step == 1 ? <>
                        <div className='mb-8'>
                            <label className='block font-semibold mb-1 text-gray-600'>Mobile number:</label>
                            <input type="text" id='mobileNo'
                                className='border w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md'
                                value={mobile}
                                placeholder='+91XXXXXXXXXX'
                                required
                                maxLength={13}
                                onChange={(e) => { setMobile(e.target.value) }}
                            />
                        </div>
                        <button className='border w-full bg-blue-950 text-white py-3 text-lg font-bold rounded-lg mb-2 hover:bg-black cursor-pointer' onClick={handleSendOtp}>Get OTP
                        </button></> : null
                    }

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {step == 2 ? <>
                        <div className='mb-8'>
                            <label className='block font-semibold mb-1 text-gray-600'>OTP:</label>
                            <input type="text"
                                placeholder='Enter 6-digit OTP'
                                className='border w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md'
                                maxlength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        <button
                            className="border w-full bg-green-600 text-white py-3 text-lg font-bold rounded-lg hover:bg-green-800"
                            onClick={handleVerify}
                        >
                            Verify OTP
                        </button></> : null}

                </form>

                <p className='mb-3'>Not registered?
                    <a href="/register" className='underline'> Register here</a>
                </p>
            </div>
        </div>
    )
}

export default LoginPage