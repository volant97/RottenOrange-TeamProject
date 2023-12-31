// class 가져오기
const header = document.querySelector(".header");
const search_area = document.querySelector(".search_area");
const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");
const movieCardList = document.querySelector(".movieCardList");
const movieCard = document.querySelector(".movieCard");
const movieImage = document.querySelector(".movieImage");
const feature_home = document.querySelector(".feature_home");
const feature_BG = document.querySelector(".feature_BG");
const languageBtn = document.querySelector(".languageBtn");
const recMovieCardList = document.querySelector(".recommendMovieCardList");
const recMovieCard = document.querySelector(".recommendMovieCard");
const recommendMovieAll = document.querySelector(".recommendMovieAll");
const recommendMovieBox = document.querySelector(".recommendMovieBox");

// TMDB API
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTU2NGFmZjVjMmQ2NTg5NjIzYmYwNTU3OWZkYTg3NCIsInN1YiI6IjY1MmYyOTYwZWE4NGM3MDEwYzFkYzYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tllRINCGQK3ug_vl1CgEERHfUuoXmbgBZ8X-3hswvEE",
    },
};
const API_TopRated = "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";
const API_NowPlaying = "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1";
const API_Popular = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";
const API_Upcoming = "https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1";
const API_MovieImage = "https://api.themoviedb.org/3/movie/961268/images";



// fetchThen 함수
function fetchThen(data) {
    // ---API---
    // HTML 초기세팅
    let _results = data["results"];
    movieCardList.innerHTML = "";

    // 영화 정보 보여주기
    _results.forEach((item) => {
        let _id = item["id"];
        let _overview = item["overview"];
        let _title = item["title"];
        let _poster_path = item["poster_path"];
        let _vote_average = item["vote_average"].toFixed(1);

        let temp_html = `
        <a data-id="${_id} "class="movieCard" href="./detailedpage.html">
			<div class="movieImage">
				<img src="${IMAGE_BASE_URL}${_poster_path}"/>
			</div>
			<div class="movieName">
				<h3>${_title}</h3>
			</div>
			<div class="movieExplanation">
				<p>${_overview}</p>
			</div>
			<div class="movieGrade">
				<p>★ ${_vote_average}</p>
			</div>
		</a>`;

        movieCardList.insertAdjacentHTML("beforeend", temp_html);
    });

    // feature_home 내용
    feature(data);

    // 영화 카드 클릭 시 ID 띄우기(초기 화면)
    const movieCards = document.querySelectorAll(".movieCard");
    movieCards.forEach((card) => {
        card.addEventListener("click", function () {
            let movieCardId = this.getAttribute("data-id");
            localStorage.setItem("clickID", movieCardId);
            // alert(`영화 ID : ${movieCardId}`);
            // location.href = `./detail.html?id=${movieCardId}`;
        });
    });

    // ---검색 기능---
    function search(event) {
        event.preventDefault();
        const searchWord = searchInput.value.toLowerCase();
        searchInput.value = "";

        // 데이터를 배열로 가져오고 title을 소문자로 변환
        let title_list = _results.map((item) => {
            return item.title.toLowerCase();
        });

        // 인풋값(searchWord)과 소문자로 변환한 값(title_list)을 비교 ,filter
        let find_title = title_list.filter((item) => {
            return item.includes(searchWord);
        });

        // 전체 title에서 title 인덱스번호 찾기
        let find_index = [];

        for (let i in find_title) {
            let idx = title_list.findIndex((item) => {
                return item === find_title[i];
            });
            find_index.push(idx);
        }

        // 값이 없으면 -> alert
        if (find_index.length === 0) {
            alert("검색 결과가 없습니다.");
            // 값이 있으면 -> 전체 데이터에서 일치한 데이터 뽑아와서 리스트 만들기
        } else {
            const match_movie = [];
            for (let a of find_index) {
                const movies = _results[a];
                match_movie.push(movies);
            }
            movieCardList.innerHTML = "";
            
            // alert("검색 결과 있음");
            // 채워넣기
            match_movie.forEach((result) => {
                const id = result["id"];
                const overview = result["overview"];
                const title = result["title"];
                const posterPath = result["poster_path"];
                const voteAverage = result["vote_average"].toFixed(1);

                const temp_html = `
				<a data-id="${id} "class="movieCard" href="./detailedpage.html">
					<div class="movieImage">
						<img src="${IMAGE_BASE_URL}${posterPath}"/>
					</div>
					<div class="movieName">
						<h3>${title}</h3>
					</div>
					<div class="movieExplanation">
						<p>${overview}</p>
					</div>
					<div class="movieGrade">
						<p>평점 : ${voteAverage}</p>
					</div>
				</a>`;

                movieCardList.insertAdjacentHTML("beforeend", temp_html);
                recommendMovieBox.classList.add("hidden");
                recommendMovieAll.classList.add("hidden");

                // 영화 카드 클릭 시 ID 띄우기(검색 화면)
                const movieCards = document.querySelectorAll(".movieCard");
                movieCards.forEach((card) => {
                    card.addEventListener("click", function () {
                        let movieCardId = this.getAttribute("data-id");
                        localStorage.setItem("clickID", movieCardId);
                        // location.href = `./index.html?id=${movieCardId}`;
                    });
                });
            });
        }
    }
    // 검색 기능 작동
    search_area.addEventListener("submit", search);
}

// feature_home 함수
function feature(data) {
    // HTML 초기세팅
    let _results = data["results"];
    let random = Math.floor(Math.random() * _results.length);
    let _id = _results[random]["id"];
    let _title = _results[random]["title"];
    let _overview = _results[random]["overview"];
    let _poster_path = _results[random]["poster_path"];

    feature_home.innerHTML = "";

    let temp_html = `
	<div class="movievisual_list">
	    <div class="tit_feature"><strong>${_title}</strong></div>
	    <div class="txt_feature"><p>${_overview}</p></div>
        <div class="goToMovieBox">
            <a data-id="${_id} "class="goToMovie" href="./detailedpage.html">
                <button class="w-btn-outline w-btn-indigo-outline">예고편 보기</button>
            </a>
            </div>
	    <div class="movievisual_BG"></div>
	</div>
	`;

    feature_home.style.backgroundImage = `url("${IMAGE_BASE_URL}${_poster_path}")`;
    feature_home.insertAdjacentHTML("beforeend", temp_html);
    
    const goToMovie = document.querySelector(".goToMovie");
    goToMovie.addEventListener("click", function () {
        let movieCardId = this.getAttribute("data-id");
        localStorage.setItem("clickID", movieCardId);
        // location.href = `./index.html?id=${movieCardId}`;
    });
}




// run
async function mainRun() {
    await fetch(API_Popular, options)
    .then(response => response.json())
    .then(data => fetchThen(data))
    .catch(err => console.error(err));
}

export const clickedID = localStorage.getItem("clickID")

mainRun()




