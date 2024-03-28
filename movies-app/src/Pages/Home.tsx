import { useState, useEffect } from 'react';
import MovieCard from '../Components/MovieCard';
import { useLocation, useNavigate } from "react-router-dom";

export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    release_date: string;
    adult: boolean;
    original_language: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
}

// Define a type for the response from the API
type MovieResponse = {
    results: Movie[];
}

const Home = () => {
    const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=';
    const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [movieData, setMovieData] = useState<MovieResponse>({ results: [] });
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchInput = searchParams.get('search');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${page}`);
                const jsonData = await response.json();
                const newResults = jsonData.results.filter((movie: any) => {
                    return !movieData.results.some((m) => m.id === movie.id);
                });
                setMovieData((prevData) => ({
                    results: [...prevData.results, ...newResults],
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (!isSearching && searchInput == null) {
            fetchData();
        }
    }, [page, isSearching]);

    useEffect(() => {
        if (searchInput != null) {
            const fetchData = async () => {
                const response = await fetch(`${SEARCH_API}${searchInput}`);
                const jsonData = await response.json();
                setMovieData(jsonData);
                setIsSearching(true);
            };

            fetchData();
        }
    }, [searchInput])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fetchData = async () => {
            const response = await fetch(`${SEARCH_API}${query}`);
            const jsonData = await response.json();
            setMovieData(jsonData);
            setIsSearching(true);
        };

        if (query.length > 0) {
            const searchLink = `/?search=${query}`
            navigate(searchLink)
            fetchData();
        }

    }

    const handleClear = () => {
        if (isSearching) {
            setQuery('');
            setIsSearching(false);
            setMovieData({ results: [] });
            navigate("/");
        }

    }

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <form className="flex justify-center mb-8" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="border rounded-lg px-4 py-2 focus:outline-none w-[500px]"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Search
                </button>
                <button
                    type="button"
                    className="ml-2 bg-red-600 text-white px-4 py-2 rounded-lg"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movieData.results && movieData.results.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {!isSearching && (
                <div className="flex justify-center mt-8">
                    <button
                        className="border rounded-lg overflow-hidden shadow-md flex flex-col px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                        onClick={handleLoadMore}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    )
}

export default Home;
