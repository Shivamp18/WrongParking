
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import dotpic from '../assets/Black-Dot-PNG-Pic.png';
import profileimage from '../assets/profile.jpeg';

function UserDashboard() {

  const MobileNo = localStorage.getItem("PhoneNo");
  const FirstName = localStorage.getItem("FirstName");
  const LastName = localStorage.getItem("LastName");
  const Email = localStorage.getItem("Email");
  const Vehicle = localStorage.getItem("Vehicle");

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='bg-white px-12 rounded-xl w-350 mt-35 py-12 min-h-screen mb-20'>
        <h1 className='font-bold flex justify-center mb-8' style={{ fontSize: '36px' }}>My Profile & QR Code
        </h1>

        <div className='flex justify-center gap-40 mt-30'>
          <div className="flex flex-col items-center gap-6">
            <div>
              <img
                src={profileimage}
                className="rounded-full w-50 h-50 border-3 border-white shadow-md"
              />
              <h2 className="mt-3 text-xl font-bold ml-10">{FirstName} {LastName}</h2>
              <p className="opacity-90 ml-10 mt-2">{MobileNo}</p>
            </div>

            <div>
              <img
                src={dotpic}
                className="w-55 h-55 border-4 border-white shadow-md ml-2"
              />
              <h3 className="text-lg font-bold mb-3 ml-6 mt-4">Your Vehicle QR Code</h3>
            </div>


          </div>

          <div className="bg-white mb-5 w-170 px-9 py-20">
            <h3 className="text-3xl font-bold mb-7 -skew-x-12 pb-2 border-b-3 ">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl">

              <div>
                <p className="font-bold w-40">Mobile Number:</p>
              </div>

              <div>
                <p>{MobileNo}</p>
              </div>
              <div>
                <p className="font-bold w-40">First Name:</p>
              </div>

              <div>
                <p>{FirstName}</p>
              </div>

              <div>
                <p className="font-bold w-40">Last Name:</p>
              </div>

              <div>
                <p>{LastName}</p>
              </div>

              <div>
                <p className="font-bold w-40">Email:</p>
              </div>

              <div>
                <p>{Email}</p>
              </div>

            </div>



            <h3 className="text-3xl font-bold mb-7 mt-10 -skew-x-12 pb-2 border-b-3 ">Vehicle Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl">

              <div>
                <p className="font-bold w-40">Vehicle Number:</p>
              </div>

              <div>
                <p>{Vehicle}</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserDashboard