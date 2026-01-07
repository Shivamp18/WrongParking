
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/Api";

function LoginPage() {
    const [form, setForm] = useState({
        mobile: "+91",
        password: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser(form);

            if (res.data.error) {
                setError(res.data.error);
                return;
            }


            localStorage.setItem("token", res.data.token);

            alert("Login successful!");
            navigate("/profile");
        } catch (err) {
            console.log(err);
            setError("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-5">
            <div className="bg-white px-12 rounded-xl w-full mt-8 py-12 sm:w-96 md:w-200">

                <h1 className="font-bold flex justify-center mb-8" style={{ fontSize: "32px" }}>
                    Login
                </h1>

                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label className="block font-semibold mb-1 text-gray-600">Mobile number:</label>
                        <input
                            type="text"
                            placeholder="Enter your mobile number"
                            className="border w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2"
                            value={form.mobile}
                            maxLength={13}
                            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block font-semibold mb-1 text-gray-600">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="border w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="border w-full bg-blue-950 text-white py-3 text-lg font-bold rounded-lg hover:bg-black cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-3">
                    Not registered?
                    <a href="/register" className="underline ml-1">Register here</a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
