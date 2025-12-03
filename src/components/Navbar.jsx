
import { useState } from "react";
import { Link, useMatch } from "react-router-dom";
import profileimage from '../assets/profile.jpeg';


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const profileMatch = useMatch("/profile");
  const editProfileMatch = useMatch("/edit-profile");

  return (
    <nav className="bg-black fixed w-full top-0 left-0 z-50 shadow-md">
      <div className=" px-6 py-3 flex justify-between items-center">

        <Link to="/" className="font-bold text-white text-2xl md-text-3xl">
          Wrong Parking
        </Link>

        {profileMatch || editProfileMatch ? (
          <ul className="hidden md:flex space-x-6 text-white font-medium items-center text-lg">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>

            <li className="relative group cursor-pointer">
              <img
                src={profileimage}
                className="rounded-full w-10 h-10 border-2 border-white shadow-md"
                alt="Profile"
              />

              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-3 
              opacity-0 group-hover:opacity-100 invisible group-hover:visible 
              transition-all duration-200">
                <ul className="text-black">
                  <li className="py-1 hover:bg-gray-100 px-2 rounded"><Link to="/profile">My Profile</Link></li>
                  <li className="py-1 hover:bg-gray-100 px-2 rounded"><Link to="/edit-profile">Edit Profile</Link></li>
                  <li className="py-1 hover:bg-gray-100 px-2 rounded"><Link to="/">Logout</Link></li>
                </ul>
              </div>
            </li>
          </ul>
        ) : (
          <ul className="hidden md:flex space-x-6 text-white font-medium text-lg">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/register" className="hover:text-gray-300">Register</Link></li>
            <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
          </ul>
        )}

        <button onClick={() => setOpen(!open)} className="md:hidden text-white text-3xl">
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white w-full shadow-md py-4">
          <ul className="px-6 space-y-3 text-gray-700 font-medium">
            <li><Link to="/" onClick={() => setOpen(false)} className="block hover:text-blue-600">Home</Link></li>

            {profileMatch || editProfileMatch ? (
              <>
                <li><Link to="/profile" onClick={() => setOpen(false)} className="block hover:text-blue-600">My Profile</Link></li>
                <li><Link to="/edit-profile" onClick={() => setOpen(false)} className="block hover:text-blue-600">Edit Profile</Link></li>
                <li><Link to="/" onClick={() => setOpen(false)} className="block hover:text-blue-600">Logout</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={() => setOpen(false)} className="block hover:text-blue-600">Login</Link></li>
                <li><Link to="/register" onClick={() => setOpen(false)} className="block hover:text-blue-600">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
