const movieModal = document.getElementById("movie_modal_container");
const closeMovieModal = document.getElementById("close_movie_modal");

const yt_video = document.getElementById("yt_video");
const movie_title = document.getElementById("movie_title");
const movie_description = document.getElementById("movie_description");

let fetchedMovies = [];
let categoriesList = [];
let movies_by_category = [];

let movie = {
	id: null,
	title: null,
	description: null,
	duration: null,
	img: null,
	rating: null,
	releaseDate: null,
	url: null,
	category: null,
};

function createClickListeners() {
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

const rowBtnElement = (name) =>
	`<div>
     <br>
    <button class="btn-item">${name}</button>
    <br>
    </div>`;

function setGridClickListener() {
	let divs = Array.from(document.getElementsByClassName("grid-item"));
	divs.forEach((element, index) => {
		element.addEventListener("click", () => {
			openMovieModal(fetchedMovies[index]);
		});
	});
}

function setRowClickListener() {
	let divs = Array.from(document.getElementsByClassName("btn-item"));
	divs.forEach((element, index) => {
		element.addEventListener("click", () => {
			console.log(categoriesList[index]);
			//update list
			if (index == 4) {
				createGrid(fetchedMovies);
			} else {
				filterByCategory(categoriesList[index]);
			}
		});
	});
}

function createGrid(movies) {
	let grid = document.getElementById("new_div");
	grid.innerHTML = "";
	movies.forEach((movie) => {
		let grid_item = document.createElement("div");
		grid_item.innerHTML = gridElement(movie);
		grid.appendChild(grid_item);
	});
	setGridClickListener();
}

function createCategoriesRow(categoriesList) {
	let row = document.getElementById("category_btn");
	categoriesList.forEach((category) => {
		let item = document.createElement("div");
		item.innerHTML = rowBtnElement(category);
		row.appendChild(item);
	});
	setRowClickListener();
}

async function init() {
	const response = await getAllMovies();
	console.log(response);
	movies_by_category = categories(response);
	createCategoriesRow(categoriesList);
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

//mapped movies
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
		category: pipe([setCategoryName, chechDuplicateAndAddToList])(
			movieResponse.category[0]
		),
	});
}

//get movies group by categories
const categories = (movies) => {
	return movies.myCustomReduce((groupedCategories, movie) => {
		let category = movie.category;
		if (groupedCategories[category] == null) {
			groupedCategories[category] = [];
		}
		groupedCategories[category].push(movie);
		return groupedCategories;
	}, {});
};

function filterByCategory(category) {
	filteredMovies = fetchedMovies.myCustomReduce((moviesByCategory, movie) => {
		if (moviesByCategory[category] == null) moviesByCategory[category] = [];
		if (movie.category == category) {
			moviesByCategory[category].push(movie);
		}
		return moviesByCategory;
	}, {});

	console.log(Object.values(filteredMovies)[0]);
	createGrid(Object.values(filteredMovies)[0]);
}

const setCategoryName = (x) => {
	x = x.toLowerCase();
	return titleCase(x);
};

const chechDuplicateAndAddToList = (x) => {
	if (!categoriesList.includes(x)) categoriesList.push(x);
	return x;
};

const titleCase = (st) => {
	return st
		.split(" ")
		.myCustomReduce(
			(s, c) => s + "" + (c.charAt(0).toUpperCase() + c.slice(1) + " "),
			""
		);
};

init();
