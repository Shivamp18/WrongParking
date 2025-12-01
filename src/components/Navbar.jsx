
import { useState } from "react";
import { Link, useMatch } from "react-router-dom";
import profileimage from '../assets/profile.jpeg';


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const profileMatch = useMatch("/profile");
  const editProfileMatch = useMatch("/edit-profile");

  return (
    <nav className="bg-black shadow-md fixed w-full top-0 left-0 z-50 p-2">
      <div className="max-w-7xl mx-auto px-10 py-3 flex justify-between items-center">

        <Link to="/" className="font-bold text-white cursor-pointer" style={{ fontSize: '1.8rem' }}>
          Wrong Parking
        </Link>
        {profileMatch || editProfileMatch ?
          <>
            <ul className="hidden md:flex space-x-8 text-white font-medium items-center" style={{ fontSize: '17px' }}>
              <li><Link to="/" className="hover:text-gray-300 cursor-pointer">Home</Link></li>
              <li>
                <div className="relative group">
                  <img
                    src={profileimage}
                    className="rounded-full w-10 h-10 border-3 border-white shadow-md cursor-pointer"
                  />

                  <div className="absolute -right-13 mt-2 w-38 bg-gray-50 shadow-lg rounded-lg p-3 
                  opacity-0 group-hover:opacity-100 invisible group-hover:visible 
                  transition-all duration-200">
                    <ul className="text-black">
                      <li className="py-1 hover:bg-gray-200 px-2 rounded"><Link to="/profile">My Profile</Link></li>
                      <li className="py-1 hover:bg-gray-200 px-2 rounded"><Link to="/edit-profile">Edit Profile</Link></li>
                      <li className="py-1 hover:bg-gray-200 px-2 rounded"><Link to="/">Logout</Link></li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul></> :
          <ul className="hidden md:flex space-x-8 text-white font-medium" style={{ fontSize: '17px' }}>
            <li><Link to="/" className="hover:text-gray-300 cursor-pointer">Home</Link></li>
            <li><Link to="/register" className="hover:text-gray-300 cursor-pointer">Register</Link></li>
            <li><Link to="/login" className="hover:text-gray-300 cursor-pointer">Login</Link></li>
          </ul>

        }

        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {open && (
        <ul className="md:hidden bg-white px-6 pb-4 space-y-3 text-gray-700 font-medium shadow-md">
          <li><Link to="/" onClick={() => setOpen(false)} className="block hover:text-blue-600">Home</Link></li>
          <li><Link to="/login" onClick={() => setOpen(false)} className="block hover:text-blue-600">Login</Link></li>
          <li><Link to="/register" onClick={() => setOpen(false)} className="block hover:text-blue-600">Register</Link></li>
        </ul>
      )}
    </nav>
  );
}
