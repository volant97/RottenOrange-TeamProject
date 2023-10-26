const a = document.querySelector(".a");
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTU2NGFmZjVjMmQ2NTg5NjIzYmYwNTU3OWZkYTg3NCIsInN1YiI6IjY1MmYyOTYwZWE4NGM3MDEwYzFkYzYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tllRINCGQK3ug_vl1CgEERHfUuoXmbgBZ8X-3hswvEE'
    }
  };
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";
const KEY = 575264
function fetchThen(data) {
    let backDrops = data["backdrops"];
    a.innerHTML = "";
    backDrops.forEach(item => {
        let filePath = item["file_path"];
        console.log("hi");
        let temHtml = `
        <div>
            <div class="movieImage">
                <img src="${IMAGE_BASE_URL}${filePath}"/>
            </div>
        </div>
        `;
    a.insertAdjacentHTML("beforeend", temHtml);
    })
}
  fetch(`https://api.themoviedb.org/3/movie/${KEY}/images`, options)
    .then(response => response.json())
    .then(data => fetchThen(data))
    .catch(err => console.error(err));