
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import axios from 'axios';


function UserDashboard() {

  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/user/dashboard`, {
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

  return (

    <div className="min-h-screen flex justify-center items-center px-5 py-10">
      <div className="bg-white rounded-xl w-full max-w-6xl p-6 md:p-12 mt-16">

        <button
          aria-label="edit-profile"
          onClick={() => navigate("/edit-profile")}
          className='ml-250 mb-5 md:mb-10'
        >
          <FiEdit className="text-gray-500 cursor-pointer text-2xl md:text-4xl" />


        </button>



        <h1 className="font-bold text-center mb-10 md:mb-20 text-3xl md:text-4xl mt-5 md:mt-0">
          My Profile & QR Code
        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-25">


          <div className="flex flex-col items-center gap-10">
            <div className="text-center">
              <img
                src={userData?.user?.profile_image || "/default-profile.png"}
                className="rounded-full w-16 h-16 md:w-30 md:h-30 border-4 border-white shadow-md mx-auto"
              />
            </div>

            <div className="text-center">
              <img
                src={"/Black-Dot-PNG-Pic.png"}
                className="w-32 h-32 md:w-48 md:h-48 border-4 border-white shadow-md mx-auto"
              />
              <h3 className="text-lg font-bold mt-4">Your Vehicle QR Code</h3>
            </div>
          </div>


          <div className="w-full md:w-auto p-6 md:p-10">

            <h3 className="text-2xl md:text-3xl font-bold mb-6 -skew-x-12 border-b-2 pb-2">
              Personal Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg md:text-xl">

              <p className="font-bold">Mobile Number:</p>
              <p>{userData?.user?.mobile}</p>

              <p className="font-bold">First Name:</p>
              <p>{userData?.user?.first_name}</p>

              <p className="font-bold">Last Name:</p>
              <p>{userData?.user?.last_name}</p>

              <p className="font-bold">Email:</p>
              <p>{userData?.user?.email}</p>

            </div>

            <h3 className="text-2xl md:text-3xl font-bold mt-10 mb-6 -skew-x-12 border-b-2 pb-2">
              Vehicle Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg md:text-xl">
              <p className="font-bold">Vehicle Number:</p>
              <p>{userData?.user?.vehicle_number}</p>
            </div>

          </div>
        </div>

      </div>
    </div>

  )
}

export default UserDashboard
