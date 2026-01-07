
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../api/Api';
import axios from 'axios';

function EditProfile() {

    const [userData, setUserData] = useState(null);
    const [profileImg, setProfileImg] = useState("src/assets/profile.jpeg");
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfileImg(reader.result);
        };
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        axios.get("http://localhost:5000/api/user/dashboard", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                setUserData(res.data);
            })
            .catch((err) => {
                console.error(err);
                alert("Unauthorized or session expired");
            });
    }, []);

    const updateprofile = async () => {

        if (userData?.user?.first_name.trim() === "") {
            alert("First name can't be empty");
            return;
        }
        if (userData?.user?.last_name.trim() === "") {
            alert("Last name can't be empty");
            return;
        }
        if (!userData?.user?.email.includes("@") || !userData?.user?.email.includes(".")) {
            alert("Please enter a valid email");
            return;
        }
        const vehiclePattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
        if (!vehiclePattern.test(userData?.user?.vehicle_number)) {
            alert("Please enter a valid vehicle number (e.g.)");
            return;
        }

        try {
                    const payload = {
                        first_name: userData?.user?.first_name,
                        last_name: userData?.user?.last_name,
                        email: userData?.user?.email,
                        vehicle_number: userData?.user?.vehicle_number,
                        userId: userData?.user?.id,
                        profile_image: profileImg
                    };
        
                    const res = await updateUser(payload);
        
                    if (res.data.error) {
                        alert(res.data.error);
                        return;
                    }
        
                    alert("Profile Updated Successfully!");
        navigate('/profile');
        
                } catch (err) {
                    console.error(err);
                    alert("Something went wrong. Please try again.");
                }

        
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
                            value={userData?.user?.first_name}
                            onChange={(e) => { setUserData({ ...userData, user: { ...userData?.user, first_name: e.target.value } }) }}
                        />
                    </div>
                    <div className='mb-5'>
                        <label className='block font-bold mb-1'>Last name:</label>
                        <input type="text"
                            placeholder='Enter your last name'
                            className='border w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md'
                            value={userData?.user?.last_name}
                            onChange={(e) => { setUserData({ ...userData, user: { ...userData?.user, last_name: e.target.value } }) }}
                        />
                    </div>
                    <div className='mb-5'>
                        <label className='block font-bold mb-1'>Email:</label>
                        <input type="text"
                            placeholder='e.g., abcd@gmail.com'
                            className='border w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md'
                            value={userData?.user?.email}
                            onChange={(e) => setUserData({ ...userData, user: { ...userData?.user, email: e.target.value } }) }
                        />
                    </div>
                    <div className='mb-5'>
                        <label className='block font-bold mb-1'>Vehicle number:</label>
                        <input type="text"
                            placeholder='e.g., KA01AB1234'
                            className='border w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-amber-900 focus:shadow-md'
                            value={userData?.user?.vehicle_number}
                            onChange={(e) => { setUserData({ ...userData, user: { ...userData?.user, vehicle_number: e.target.value } }) }}
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