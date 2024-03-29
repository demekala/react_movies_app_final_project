import React from 'react';
import { Movie } from '../Pages/Home';
import { Link } from 'react-router-dom';
import { randomInt } from 'crypto';

const MovieCard = ({ movie }: { movie: Movie }) => {

    let link = `/product?name=${movie.title}&votecount=${movie.vote_count}`
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

    return (
        <Link
            className="border rounded-lg overflow-hidden shadow-md flex flex-col"
            to={link}
        >
            <img
                className="w-full min-h-64 max-h-96 object-cover"
                src={`${IMG_PATH}` + `${movie.poster_path}`}
                alt={movie.title}
            />
            <div className="p-4 flex flex-col justify-center items-center w-[100%]">
                <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-700">release date: {movie.release_date}</p>
                <p className="text-gray-700">{Math.round(Math.random() * 100)}$</p>

            </div>
        </Link>
    )
}

export default MovieCard;