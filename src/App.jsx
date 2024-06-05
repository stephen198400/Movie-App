import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import './App.css';

/* --------------------------------- App -------------------------------- */
function App() {
	return (
		<div className="">
			<Container />
		</div>
	);
}

/* -------------------------------- Container ------------------------------- */
const Container = () => {
	/* ---------------------------------- state --------------------------------- */
	const [input, setInput] = useState('');
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			if (query) {
				const res = await fetch(
					`http://www.omdbapi.com/?s=${query}&apikey=b97c2c40`
				);
				const data = await res.json();
				setMovies(data.Search || []);
			}
		};
		fetchData();
	}, [query]);

	useEffect(() => {
		const handleClickOutside = () => {
			setMovies([]);
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	/* ---------------------------------- funcs --------------------------------- */
	const handleInputOnChange = (e) => {
		const value = e.target.value;
		setInput(value);
		setQuery(value);

		if (value === '') {
			setMovies([]);
		}
	};

	/* --------------------------------- return --------------------------------- */
	return (
		<div className="container mx-auto space-y-3">
			<Input
				onChange={handleInputOnChange}
				value={input}
				placeholder="Search IMDb"
				onClick={(e) => e.stopPropagation()} // 阻止点击事件冒泡到 document
			/>
			{input && <MovieListCard movies={movies} />}
		</div>
	);
};

/* ------------------------------- movie lists card ------------------------------ */
const MovieListCard = ({ movies }) => {
	return (
		<ul className="movie-list p-2 bg-gray-50 rounded-sm">
			{movies.length === 0 ? (
				<li className="h-[50px]">
					<div className="flex justify-start items-center">
						There is no result
					</div>
				</li>
			) : (
				movies.map((movie) => <Movie key={movie.imdbID} movie={movie} />)
			)}
		</ul>
	);
};

/* ---------------------------------- movie --------------------------------- */
const Movie = ({ movie }) => {
	return (
		<li className="flex justify-start items-center gap-4">
			<div className="bg-red-100 w-[50px] h-[75px]">
				<img src={movie.Poster} alt={movie.Title} />
			</div>
			<div className="flex flex-col items-start">
				<h3 className="text-xl font-semibold">{movie.Title}</h3>
				<h4 className="text-[16px]">{movie.Year}</h4>
				<h4 className="text-[16px]">{movie.Actors}</h4>
			</div>
		</li>
	);
};

export default App;
