import React, { useEffect, useState } from 'react'
import Users from "../Records/users.json"
import { User } from '../App';
import { useNavigate } from "react-router-dom";

interface LoginProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const Login = ({ user, setUser }: LoginProps) => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (user.signedIn) {
            navigate("/");
        }
    }, [user.signedIn])

    const handleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            const found = Users.some(user => {
                return user.username === input.username && user.password === input.password;
            });
            if (found) {
                setUser({
                    ...user,
                    signedIn: true,
                    username: input.username,
                });
            } else {
                alert("Account not found");
            }
        } else {
            alert("Please provide valid input");
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmitEvent} className="max-w-md mx-auto">
            <div className="mb-6">
                <label htmlFor="user-username" className="block text-sm font-medium text-gray-700">Username:</label>
                <input
                    type="text"
                    id="user-username"
                    name="username"
                    placeholder="Enter your username"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={handleInput}
                />
                <p className="mt-2 text-sm text-gray-500" id="user-username">Please enter your username.</p>
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={handleInput}
                />
                <p className="mt-2 text-sm text-gray-500" id="user-password">Your password should be at least 6 characters long.</p>
            </div>
            <button type="submit" className="w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
        </form>
    );
}

export default Login