
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import dotpic from '../assets/Black-Dot-PNG-Pic.png';
import profileimage from '../assets/profile.jpeg';
import { FiEdit } from "react-icons/fi";


function UserDashboard() {

  const MobileNo = localStorage.getItem("PhoneNo");
  const FirstName = localStorage.getItem("FirstName");
  const LastName = localStorage.getItem("LastName");
  const Email = localStorage.getItem("Email");
  const Vehicle = localStorage.getItem("Vehicle");
  const navigate = useNavigate();

  return (

    <div className="min-h-screen flex justify-center items-center px-5 py-10">
      <div className="bg-white rounded-xl w-full max-w-6xl p-6 md:p-12 mt-16">

        <FiEdit className="text-gray-500 cursor-pointer ml-auto text-2xl md:text-4xl" onClick={() => navigate('/edit-profile')} />

        <h1 className="font-bold text-center mb-10 md:mb-20 text-3xl md:text-4xl mt-5 md:mt-0">
          My Profile & QR Code
        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-25">


          <div className="flex flex-col items-center gap-10">
            <div className="text-center">
              <img
                src={profileimage}
                className="rounded-full w-32 h-32 md:w-48 md:h-48 border-4 border-white shadow-md mx-auto"
              />
              <h2 className="mt-4 text-xl font-bold">{FirstName} {LastName}</h2>
              <p className="opacity-90 mt-2">{MobileNo}</p>
            </div>

            <div className="text-center">
              <img
                src={dotpic}
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
              <p>{MobileNo}</p>

              <p className="font-bold">First Name:</p>
              <p>{FirstName}</p>

              <p className="font-bold">Last Name:</p>
              <p>{LastName}</p>

              <p className="font-bold">Email:</p>
              <p>{Email}</p>

            </div>

            <h3 className="text-2xl md:text-3xl font-bold mt-10 mb-6 -skew-x-12 border-b-2 pb-2">
              Vehicle Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg md:text-xl">
              <p className="font-bold">Vehicle Number:</p>
              <p>{Vehicle}</p>
            </div>

          </div>
        </div>

      </div>
    </div>

  )
}

export default UserDashboard