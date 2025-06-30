'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [admin, setAdmin] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            router.push('/create');
        }
    }, [router]);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (admin === 'admin' && password === 'admin') {
            localStorage.setItem('isLoggedIn', 'true');
            router.push('/create');
        } else {
            setErr('Invalid Credentials');
        }
    };

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-blue-400 to-[#f0f7ff] flex justify-center items-center">
            <div className="h-2/3 w-1/3 flex flex-col justify-between items-center border-2 bg-white py-20">
                <div className="text-5xl">Admin</div>
                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col">
                    <label htmlFor="username" className="pl-2 pb-2">User</label>
                    <input 
                        type="text" 
                        id="username"
                        placeholder="Username" 
                        className="h-10 pl-4 rounded-xl outline-1"
                        value={admin}
                        onChange={(e) => setAdmin(e.target.value)}
                    />
                    <label htmlFor="password" className="pl-2 pb-2 pt-6">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Password" 
                        className="h-10 pl-4 rounded-xl outline-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="text-red-500 h-5 mt-3">{err}</div>
                    <button 
                        type="submit"
                        className="mt-6 bg-blue-500 text-white h-10 rounded-xl hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}