let inputText = document.getElementById("textInput");
let arrayValue = document.getElementById("arrayValue");

const movieModal = document.getElementById("movie_modal_container");
const closeMovieModal = document.getElementById("close_movie_modal");
//Buttons
const mapBtn = document.getElementById("map_btn");
const reduceBtn = document.getElementById("reduce_btn");
const pipeBtn = document.getElementById("pipe_btn");

const yt_video = document.getElementById("yt_video");
const movie_title = document.getElementById("movie_title");
const movie_description = document.getElementById("movie_description");

let fetchedMovies = [];

let movie = {
	id: null,
	title: null,
	description: null,
	duration: null,
	img: null,
	rating: null,
	releaseDate: null,
	url: null,
};

let categories = [];
function createClickListeners() {
	mapBtn.addEventListener("click", () => {
		customMap();
	});
	reduceBtn.addEventListener("click", () => {
		customReduce();
	});
	pipeBtn.addEventListener("click", () => {
		customMap();
	});

	closeMovieModal.addEventListener("click", () => {
		yt_video.setAttribute("src", "");
		movieModal.classList.remove("show");
	});
}

const gridElement = (movie) => `<div class="grid-item" style="width: 20rem;">
  <img src="${movie.img}" alt="Card image cap" width="300" height="500">
  <div class="card-body">
    <p class="card-text">${movie.title}</p>
  </div>
</div>`;

function setGridClickListener() {
	let divs = Array.from(document.getElementsByClassName("grid-item"));
	console.log(divs);

	divs.forEach((element, index) => {
		element.addEventListener("click", () => {
			console.log(fetchedMovies[index]);
			openMovieModal(fetchedMovies[index]);
		});
	});
}

function createGrid(movies) {
	let grid = document.getElementById("new_div");
	movies.forEach((movie) => {
		let grid_item = document.createElement("div");
		grid_item.innerHTML = gridElement(movie);
		grid.appendChild(grid_item);
	});
	setGridClickListener();
}

async function init() {
	const response = await getAllMovies();
	fetchedMovies = response;
	createGrid(response);
	createClickListeners();
}

async function getAllMovies() {
	const movies = await queryFetch(GET_MOVIES_QUERY);
	if (movie.data === null) return [];
	return movies.data.movies.customMap((movie) => mapMovie(movie));
}

function openMovieModal(movie) {
	const div = document.getElementById("movie_modal_div");
	yt_video.setAttribute("src", `https://www.youtube.com/embed/${movie.url}`);
	movie_title.innerHTML = movie.title;
	movie_description.innerHTML = movie.description;
	movieModal.classList.add("show");
}

function mapMovie(movieResponse) {
	return (movie = {
		id: movieResponse._id,
		title: movieResponse.title,
		description: movieResponse.description,
		duration: movieResponse.duration,
		rating: movieResponse.rating,
		releaseDate: movieResponse.releaseDate,
		img: movieResponse.img,
		url: movieResponse.url,
	});
}

init();

//https://www.youtube.com/embed/
