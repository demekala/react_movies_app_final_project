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

    useEffect(() => {
        if (!user.signedIn) {
            navigate("/login")
        }
    })

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {user.favouriteMovies.map(({ movie, username }) => {
                if (username === user.username) {
                    return (
                        <div key={movie.id}>
                            <MovieCard movie={movie} />
                        </div>
                    );
                }
                return null; // If username doesn't match, return null to skip rendering
            })}
        </div>
    );

};

export default Favourites;
