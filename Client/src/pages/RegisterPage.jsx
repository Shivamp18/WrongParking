import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../api/Api";

function RegisterPage() {

    const [mobile, setMobile] = useState("+91");
    const [email, setEmail] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const registeruser = async () => {


        if (firstName.trim() === "") {
            alert("First name can't be empty");
            return;
        }
        if (lastName.trim() === "") {
            alert("Last name can't be empty");
            return;
        }

        const vehiclePattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
        if (!vehiclePattern.test(vehicle)) {
            alert("Please enter a valid vehicle number");
            return;
        }

        if (!mobile || mobile.length !== 13) {
            alert("Please enter a valid mobile number");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            alert("Please enter a valid email");
            return;
        }


        try {
            const payload = {
                first_name: firstName,
                last_name: lastName,
                email,
                password: password,
                vehicle_number: vehicle,
                mobile: mobile
            };

            const res = await registerUser(payload);

            if (res.data.error) {
                alert(res.data.error);
                return;
            }

            alert("Registered Successfully!");
            navigate("/login");

        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center px-5'>
            <div className='bg-white px-12 rounded-xl mt-25 md:mt-33 mb-13 py-12 w-full sm:w-96 md:w-200'>
                <h1 className='font-bold flex justify-center mb-8' style={{ fontSize: '32px' }}>Register</h1>

                <form>
                    <div className='mb-3'>
                        <label className='block font-bold mb-1'>First name:</label>
                        <input
                            type="text"
                            placeholder='Enter your first name'
                            className='border border-gray-300 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md'
                            value={firstName}
                            onChange={(e) => setfirstName(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='block font-bold mb-1'>Last name:</label>
                        <input
                            type="text"
                            placeholder='Enter your last name'
                            className='border w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='block font-bold mb-1'>Vehicle number:</label>
                        <input
                            type="text"
                            placeholder='e.g., KA01AB1234'
                            className='border w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md'
                            value={vehicle}
                            onChange={(e) => setVehicle(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='block font-bold mb-1'>Mobile number:</label>
                        <input
                            type="text"
                            className='border w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md'
                            value={mobile}
                            maxLength={13}
                            placeholder='+91XXXXXXXXXX'
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>

                        <div className='mb-3'>
                        <label className='block font-bold mb-1'>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="border w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block font-bold mb-1'>Email:</label>
                        <input
                            type="text"
                            placeholder='abcd@gmail.com'
                            className='border w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type='button'
                        className='border w-full bg-blue-950 text-white py-3 text-lg font-bold rounded-lg mb-3 hover:bg-black cursor-pointer'
                        onClick={registeruser}
                    >
                        Register
                    </button>
                </form>

                <p className='mb-3'>
                    Already registered?
                    <a href="/login" className='underline'> Login here</a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
