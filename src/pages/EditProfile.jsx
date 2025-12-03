
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function EditProfile() {

    const [FirstName, setFirstName] = useState(localStorage.getItem("FirstName") || "");
    const [LastName, setLastName] = useState(localStorage.getItem("LastName") || "");
    const [Email, setEmail] = useState(localStorage.getItem("Email") || "");
    const [Vehicle, setVehicle] = useState(localStorage.getItem("Vehicle") || "");
    const [profileImg, setProfileImg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setProfileImg(savedImage);
        }
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfileImg(reader.result);
            localStorage.setItem("profileImage", reader.result);
        };
        reader.readAsDataURL(file);
    }


    const updateprofile = () => {

        if (FirstName.trim() === "") {
            alert("First name can't be empty");
            return;
        }
        if (LastName.trim() === "") {
            alert("Last name can't be empty");
            return;
        }
        if (!Email.includes("@") || !Email.includes(".")) {
            alert("Please enter a valid email");
            return;
        }
        const vehiclePattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
        if (!vehiclePattern.test(Vehicle)) {
            alert("Please enter a valid vehicle number (e.g., KA01AB1234)");
            return;
        }

        localStorage.setItem("FirstName", FirstName);
        localStorage.setItem("LastName", LastName);
        localStorage.setItem("Vehicle", Vehicle);
        localStorage.setItem("Email", Email);
        alert("Profile Updated Successfully!");
        navigate('/profile');
    }

    return (
        <div className='min-h-screen flex justify-center items-center px-5'>
            <div className='bg-white px-12 rounded-xl mt-28 md:mt-33 mb-13 py-12 w-full sm:w-96 md:w-200'>
                <h1 className='font-bold flex justify-center mb-8 text-center' style={{ fontSize: '32px' }}>Edit Profile Information</h1>

                <form>
                    <div className='mb-5'>
                        <label className='block font-bold mb-1'>First name:</label>
                        <input type="text"
                            placeholder='Enter your first name'
                            className='border border-gray-300 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md'
                            value={FirstName}
                            onChange={(e) => { setFirstName(e.target.value) }}
                        />
                    </div>
                    <div className='mb-5'>
                        <label className='block font-bold mb-1'>Last name:</label>
                        <input type="text"
                            placeholder='Enter your last name'
                            className='border w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md'
                            value={LastName}
                            onChange={(e) => { setLastName(e.target.value) }}
                        />
                    </div>
                    <div className='mb-5'>
                        <label className='block font-bold mb-1'>Email:</label>
                        <input type="text"
                            placeholder='e.g., abcd@gmail.com'
                            className='border w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md'
                            value={Email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className='mb-5'>
                        <label className='block font-bold mb-1'>Vehicle number:</label>
                        <input type="text"
                            placeholder='e.g., KA01AB1234'
                            className='border w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md'
                            value={Vehicle}
                            onChange={(e) => { setVehicle(e.target.value) }}
                        />
                    </div>

                    <div className='mb-5'>
                        <label className='block font-bold mb-1'>Profile picture:</label>
                        <input type="file" onChange={handleImageUpload} className='border w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md' />
                    </div>

                    <button type='button' className='border w-full bg-blue-950 text-white py-2 md:py-3 text-lg font-bold rounded-lg mb-3 hover:bg-black cursor-pointer' onClick={updateprofile}>Update Profile</button>
                </form>

                <p className='mb-5 text-center md:text-left'>
                    <a href="/profile" className='underline'>Cancel / View My Profile</a>
                </p>
            </div>
        </div>
    )
}

export default EditProfile