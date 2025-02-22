import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Outlet } from 'react-router-dom';

function LoginForm() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate =  useNavigate()
    const Login = async (e) => {
        e.preventDefault();
        
        try {
            const res = await axios.post("https://realauto.limsa.uz/api/auth/signin", {
                phone_number: phone,
                password: password
            });

            if (res.data && res.data.data && res.data.data.tokens) {
                localStorage.setItem("accessToken", res.data.data.tokens.accessToken.token);
                toast.success("Ajoyib! Muvaffaqiyatli kirdingiz.");
                navigate("/")
            } else {
                toast.error("Xatolik: Token olinmadi!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Kirishda xatolik yuz berdi.");
        }
    };

    return (
        <form className="w-full max-w-sm" onSubmit={Login}>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="phone">
                        Telefon
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        id="phone" 
                        type="text" 
                        placeholder="91234567" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
                        Parol
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        id="password" 
                        type="password" 
                        placeholder="******************" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <button 
                        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                        type="submit"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;
