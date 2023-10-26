import { movie } from "./movie.js";
import { showReview, backToTop } from "./review.js";
import { photo } from "./photo.js";

const API_KEY = "7ea5a4480f6e34a1f8f87e7241924dd2";
const API_ID = 976573; // 엘리멘탈(임의 id값)

// 가져올 API 링크
const API_Videos_KR = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
const API_Videos_US = `https://api.themoviedb.org/3/movie/${API_ID}/videos?language=en-US`;

export async function detailMovies() {
  // 첫번째 API
  let dataKR = await fetch(API_Videos_KR).then((res) => res.json());
  const moviesKR = dataKR.results;
  console.log(moviesKR);
  // 두번째 API
  let dataUS = await fetch(API_Videos_US).then((res) => res.json());
  const moviesUS = dataUS.results;
  console.log(moviesUS);

  movie(moviesUS, moviesKR);
  photo();
  showReview();
  backToTop();
}

detailMovies();
