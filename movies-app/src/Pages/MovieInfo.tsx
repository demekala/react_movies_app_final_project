import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Movie } from "./Home";
import { User } from "../App";

interface MovieInfoProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const MovieInfo = ({ user, setUser }: MovieInfoProps) => {
    const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const [moviedata, setMovieData] = useState<Movie[]>([]);
    const [movieIndex, setMovieIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${SEARCH_API}${name}`);
                const jsonData = await response.json();
                setMovieData(jsonData.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [name]);

    useEffect(() => {
        moviedata.forEach((movie, index) => {
            if (movie.title === name) {
                setMovieIndex(index);
                return;
            }
        })
    }, [moviedata]);

    useEffect(() => {
        console.log(user.favouriteMovies);
    }, [user.favouriteMovies])

    const handleAddToFavourites = () => {
        if (!user.signedIn) {
            alert("Need to sign in before adding to favourites");
            return;
        }

        if (!user.favouriteMovies.some((favMovie) => favMovie.movie.id === moviedata[movieIndex].id && favMovie.username === user.username)) {
            setUser({
                ...user,
                favouriteMovies: [...user.favouriteMovies, { movie: moviedata[movieIndex], username: user.username }]
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white">
            {moviedata.length > 0 ? (
                <div className="relative">
                    <img
                        src={IMG_PATH + moviedata[movieIndex].backdrop_path} alt=""
                        className="w-full h-full opacity-50"
                    />
                    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-center">{moviedata[movieIndex].title}</h1>
                    <p className="text-center mt-4">Overview: {moviedata[movieIndex].overview}</p>
                    <p className="text-center mt-4">Release date: {moviedata[movieIndex].release_date}</p>
                    <p className="text-center mt-4">Original language: {moviedata[movieIndex].original_language}</p>
                    <p className="text-center mt-4">Popularity: {moviedata[movieIndex].popularity}</p>
                    <p className={`text-center mt-4 ${moviedata[movieIndex].vote_average > 6 ? 'text-green-500' : 'text-red-500'}`}>Rating: {moviedata[movieIndex].vote_average}</p>
                    <p className="text-center mt-4">Vote count: {moviedata[movieIndex].vote_count}</p>
                    {user.favouriteMovies.some((favMovie) => favMovie.movie.id === moviedata[movieIndex].id && favMovie.username === user.username) ? (
                        <p className="absolute bottom-10 right-10 text-gray-500">Already in favourites</p>
                    ) : (
                        <button onClick={handleAddToFavourites} className="absolute bottom-10 right-10 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
                            Add to Favourites
                        </button>
                    )}
                </div>
            ) : (
                <p>No movie data available</p>
            )}
        </div>
    );
};

export default MovieInfo;
