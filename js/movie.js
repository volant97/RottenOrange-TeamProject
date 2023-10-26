// TMDB APT - Videos
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTU2NGFmZjVjMmQ2NTg5NjIzYmYwNTU3OWZkYTg3NCIsInN1YiI6IjY1MmYyOTYwZWE4NGM3MDEwYzFkYzYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tllRINCGQK3ug_vl1CgEERHfUuoXmbgBZ8X-3hswvEE'
    }
};



// 변수
const API_ID = 976573 // 엘리멘탈
const API_Videos_KR = `https://api.themoviedb.org/3/movie/${API_ID}/videos?language=ko-KR`;
const API_Videos_US = `https://api.themoviedb.org/3/movie/${API_ID}/videos?language=en-US`;

const videoArea = document.querySelector(".video_area");


// fetchThen 함수
function fetchThen(data) {
    const results = data["results"];

    const TrailerType = results.find(item => {
        let type = item["type"];
        if (type.includes("Trailer")) {
            return true
        }
    })

    const KEY = TrailerType["key"];
    const MOVIE_BASE_URL = `https://www.youtube.com/embed/${KEY}?autoplay=1&mute=1`

    let tempHtml = `
        <iframe class="video" width="1100px" height="618.75px" src="${MOVIE_BASE_URL}" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
        `
    videoArea.innerHTML = tempHtml;
}



// run
fetch(API_Videos_US, options)
    .then(response => response.json())
    // .then(response => console.log(response))
    .then(data => fetchThen(data))
    .catch(err => console.error(err));


