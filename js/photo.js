export function photo() {
  const imgbox = document.querySelector(".imgbox");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGMxYmU2YTczNjk5NTEwM2E3YmUxZjA4ODlkM2ViMCIsInN1YiI6IjY1MzA4YmIyOWQ1OTJjMDBlY2NhNTFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HF5V0mA4wTGE3E-06jSiTT6eS-X9FYYsBKxv0zEgZc8",
    },
  };
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200/";
  const KEY = 575264;

  function fetchThen(data) {
    let backDrops = data["backdrops"];
    imgbox.innerHTML = "";
    backDrops.forEach((item) => {
      let filePath = item["file_path"];
      let temHtml = `
            <div class="movieImage">
                <img src="${IMAGE_BASE_URL}${filePath}"/>
            </div>
        `;
      imgbox.insertAdjacentHTML("beforeend", temHtml);
    });
  }

  fetch(`https://api.themoviedb.org/3/movie/${KEY}/images`, options)
    .then((response) => response.json())
    .then((data) => fetchThen(data))
    .catch((err) => console.error(err));
}
