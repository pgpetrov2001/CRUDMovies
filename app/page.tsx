"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface MovieType {
	id: number;
	title: string;
	genre: string;
}

interface MovieComponent {
	movie: MovieType;
	refreshMovies: Function;
}

// Movie component
const Movie: React.FC<MovieComponent> = ({ movie, refreshMovies }) => {
	const [editing, setEditing] = useState(false);
	const [title, setTitle] = useState(movie.title);
	const [genre, setGenre] = useState(movie.genre);

	const handleDelete = async () => {
		await axios.delete(`/api/movies?id=${movie.id}`);
		refreshMovies();
	};

	const handleUpdate = async () => {
		await axios.put(`/api/movies`, { id: movie.id, title, genre });
		setEditing(false);
		refreshMovies();
	};

	if (editing) {
		return (
			<div>
				<input value={title} onChange={e => setTitle(e.target.value)} />
				<input value={genre} onChange={e => setGenre(e.target.value)} />
				<button onClick={handleUpdate}>Update</button>
				<button onClick={() => setEditing(false)}>Cancel</button>
			</div>
		);
	}

	return (
		<div>
			<h2>{movie.title}</h2>
			<p>{movie.genre}</p>
			<button onClick={() => setEditing(true)}>Edit</button>
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
};

// MoviesList component
const MoviesList = () => {
	const [movies, setMovies] = useState<MovieType[]>([]);
	const [newTitle, setNewTitle] = useState('');
	const [newGenre, setNewGenre] = useState('');

	const refreshMovies = async () => {
		const response = await axios.get('/api/movies');
		setMovies(response.data);
	};

	const handleAdd = async () => {
		await axios.post('/api/movies', { title: newTitle, genre: newGenre });
		setNewTitle('');
		setNewGenre('');
		refreshMovies();
	};

	useEffect(() => {
		refreshMovies();
	}, []);

	return (
		<div>
			<input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Title" />
			<input value={newGenre} onChange={e => setNewGenre(e.target.value)} placeholder="Genre" />
			<button onClick={handleAdd}>Add Movie</button>
			{movies.map(movie => (
				<Movie key={movie.id} movie={movie} refreshMovies={refreshMovies} />
			))}
		</div>
	);
};

export default MoviesList;
