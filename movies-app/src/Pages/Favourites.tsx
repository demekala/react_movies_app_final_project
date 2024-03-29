import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../App';
import MovieCard from '../Components/MovieCard';

interface FavouritesProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const Favourites = ({ user, setUser }: FavouritesProps) => {

    const navigate = useNavigate();
    let hasFavourites = false;

    useEffect(() => {
        if (!user.signedIn) {
            navigate("/login")
        }
    })

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-screen max-w-screen pt-3 bg-[#faebd7]">
            {user.favouriteMovies.map(({ movie, username }) => {
                if (username === user.username) {
                    hasFavourites = true;
                    return (
                        <div key={movie.id}>
                            <MovieCard movie={movie} />
                        </div>
                    );
                }
                return null; // If username doesn't match, return null to skip rendering
            })}
            {hasFavourites ? null : <div className="text-center w-[1500px] text-[100px]"> No favourite movies </div>}
        </div>
    );

};

export default Favourites;
