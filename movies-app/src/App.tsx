import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home, { Movie } from './Pages/Home';
import Login from './Pages/Login';
import Header from './Components/Header';
import { useEffect, useState } from 'react';
import Favourites from './Pages/Favourites';
import MovieInfo from './Pages/MovieInfo';

export interface User {
  username: string;
  signedIn: boolean;
  favouriteMovies: { movie: Movie, username: string }[];
}

interface AppProps { }

function App({ }: AppProps) {

  const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);

  const [user, setUser] = useState<User>({
    username: "",
    signedIn: false,
    favouriteMovies: []
  })

  useEffect(() => {
    //console.log(user);
  }, [user])

  return (
    <>
      <BrowserRouter>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favourites' element={<Favourites user={user} setUser={setUser} />} />
          <Route path='/login' element={<Login user={user} setUser={setUser} />} />
          <Route path='/product' element={<MovieInfo user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
