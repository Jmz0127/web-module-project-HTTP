import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';

const EditMovieForm = (props) => {
	const { push } = useHistory();

	const { setMovies } = props;
	const [movie, setMovie] = useState({
		title: '',
		director: '',
		genre: '',
		metascore: 0,
		description: ''
	});

	const { id } = useParams(); //Next, we need to grab the id being passed into the component through the url. Use the useParams hook to get the id value.

	useEffect(() => {
		axios
			.get(`http://localhost:9000/api/movies/${id}`)
			.then((res) => {
				setMovie(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [id]); //We need to be able to load in the current movie's attributes into our local form state. When EditMovieForm mount, retrieve our current id's movie from the api and save the data returned to local state.

	const handleChange = (e) => {
		setMovie({
			...movie,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:9000/api/movies/${id}`, movie)
			.then((res) => {
				setMovies(res.data);
				push(`/movies/${id}`); //Redirect the user to the currently edited movie's individual info page.
			})
			.catch((err) => {
				console.log(err);
			});
	}; // At this point, nothing happens when the edit form is submitted. Add in the api call needed to update the server with our updated movie data.

	const { title, director, genre, metascore, description } = movie;

	return (
		<div className='col'>
			<div className='modal-content'>
				<form onSubmit={handleSubmit}>
					<div className='modal-header'>
						<h4 className='modal-title'>
							Editing <strong>{movie.title}</strong>
						</h4>
					</div>
					<div className='modal-body'>
						<div className='form-group'>
							<label>Title</label>
							<input value={title} onChange={handleChange} name='title' type='text' className='form-control' />
						</div>
						<div className='form-group'>
							<label>Director</label>
							<input value={director} onChange={handleChange} name='director' type='text' className='form-control' />
						</div>
						<div className='form-group'>
							<label>Genre</label>
							<input value={genre} onChange={handleChange} name='genre' type='text' className='form-control' />
						</div>
						<div className='form-group'>
							<label>Metascore</label>
							<input value={metascore} onChange={handleChange} name='metascore' type='number' className='form-control' />
						</div>
						<div className='form-group'>
							<label>Description</label>
							<textarea value={description} onChange={handleChange} name='description' className='form-control'></textarea>
						</div>
					</div>
					<div className='modal-footer'>
						<input type='submit' className='btn btn-info' value='Save' />
						<Link to={`/movies`}>
							<input type='button' className='btn btn-default' value='Cancel' />
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditMovieForm;
