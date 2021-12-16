import React, { useEffect, useState } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';
import EditMovieForm from './components/EditMovieForm';
import AddMovieForm from './components/AddMovieForm'; //Add in a route that allows access to AddMovieForm.

const App = (props) => {
	const [movies, setMovies] = useState([]);
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:9000/api/movies')
			.then((res) => {
				setMovies(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const deleteMovie = (id) => {
		setMovies(movies.filter((item) => item.id !== id)); //this does our state updating for deleting a movie
	};

	const addToFavorites = (movie) => {};

	return (
		<div>
			<nav className='navbar navbar-dark bg-dark'>
				<span className='navbar-brand'> HTTP / CRUD Module Project</span>
			</nav>

			<div className='container'>
				<MovieHeader />
				<div className='row '>
					<FavoriteMovieList favoriteMovies={favoriteMovies} />

					<Switch>
						<Route path='/movies/edit/:id'>
							<EditMovieForm //First, we need to be able to navigate to the edit movie component. In App.js, add in the <EditMovieForm> component to the supplied edit route.
								setMovies={setMovies}
							/>
							{/*  Now that we have access to setMovies, made sure the updated list of movies is saved to our global state*/}
						</Route>
						<Route path='/movies/add'>
							<AddMovieForm setMovies={setMovies} />
							{/* //Add in a route that allows access to AddMovieForm.
							 */}
						</Route>

						<Route path='/movies/:id'>
							<Movie deleteMovie={deleteMovie} />
						</Route>

						<Route path='/movies'>
							<MovieList movies={movies} />
						</Route>

						<Route path='/'>
							<Redirect to='/movies' />
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default App;
