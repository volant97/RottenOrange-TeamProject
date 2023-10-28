import { movie } from "./movie.js";
import { detailList } from "./detailList.js"
import { showReview, backToTop } from "./review.js";
import { photo } from "./photo.js";
import { clickedID } from "./script.js";

const API_ID = clickedID; // (461130 code8 임의 id값)

// 가져올 API 링크
const options = {
	method: 'GET',
	headers: {
	  accept: 'application/json',
	  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTU2NGFmZjVjMmQ2NTg5NjIzYmYwNTU3OWZkYTg3NCIsInN1YiI6IjY1MmYyOTYwZWE4NGM3MDEwYzFkYzYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tllRINCGQK3ug_vl1CgEERHfUuoXmbgBZ8X-3hswvEE'
	}
  };

const API_Videos_US = `https://api.themoviedb.org/3/movie/${API_ID}/videos?language=en-US`;
const API_Details_KR = `https://api.themoviedb.org/3/movie/${API_ID}?language=ko-KR`
const API_Credits_KR = `https://api.themoviedb.org/3/movie/${API_ID}/credits?language=ko-KR`;


async function detailMovies() {
	// API 1 - 영상
	const videoDdata = await fetch(API_Videos_US, options)
		.then(res => res.json())
		.catch(err => console.error(err));
	const moviesUS = videoDdata.results;

	// API 2 - 세부정보 상단
	const detailsData = await fetch(API_Details_KR, options)
		.then(res => res.json())
		.catch(err => console.error(err));
	const detailsListKR = detailsData;

	// API 3 - 세부정보 하단
	const creditsData = await fetch(API_Credits_KR, options)
	.then(res => res.json())
	.catch(err => console.error(err));
	const creditsKR = creditsData;

	movie(moviesUS);
	detailList(detailsListKR, creditsKR);
	photo();
	showReview();
	backToTop();
}

// run
detailMovies().catch();