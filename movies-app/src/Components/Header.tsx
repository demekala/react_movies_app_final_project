import { Link } from "react-router-dom";
import { User } from "../App";
import React from "react";

interface HeaderProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const Header = ({ user, setUser }: HeaderProps) => {

    function handleLogOut() {
        setUser({
            ...user,
            signedIn: false,
            username: "",
        });
    }

    return (
        <div className="w-full border-b-2 border-black flex justify-between items-center py-2 pt-3 bg-[#faebd7]">
            <div className="flex items-center">
                <Link to="/" className="text-xl px-4 py-2 bg-blue-600 rounded-md text-white mx-2 hover:bg-blue-700 transition-colors duration-300">Home</Link>
                {user.signedIn ? (
                    <React.Fragment>
                        <Link to="/favourites" className="text-xl px-4 py-2 bg-blue-600 rounded-md text-white mx-2 hover:bg-blue-700 transition-colors duration-300">Favourites</Link>
                        <button
                            type="button"
                            className="ml-2 bg-red-600 text-white px-4 py-2 rounded-lg"
                            onClick={handleLogOut}
                        >
                            Log Out
                        </button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Link to="/login" className="text-xl px-4 py-2 bg-blue-600 rounded-md text-white mx-2 hover:bg-blue-700 transition-colors duration-300">Login</Link>
                    </React.Fragment>
                )}
            </div>
            {user.signedIn ? (
                <Link to="/login" className="text-xl px-4 py-2 border border-black mx-2 rounded bg-white">{user.username}</Link>
            ) : (
                <span className="text-xl px-4 py-2 border border-black mx-2 rounded bg-white">Guest</span>
            )}
        </div>
    );
};

export default Header;
