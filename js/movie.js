export function movie(moviesUS, moviesKR) {
  console.log("us: ", moviesUS);
  console.log("kr: ", moviesKR);
  const movies = moviesUS;

  const videoArea = document.querySelector(".video_area");

  // fetchThen 함수
  function fetchThen() {
    const TrailerType = movies.find((item) => {
      // true인 첫번째 값 출력
      let type = item.type;
      if (type.includes("Trailer")) {
        return true;
      }
    });

    const KEY = TrailerType.key;
    console.log(KEY);
    const MOVIE_BASE_URL = `https://www.youtube.com/embed/${KEY}?autoplay=1&mute=1`;

    let tempHtml = `
              <iframe class="video" width="1100px" height="618.75px" src="${MOVIE_BASE_URL}" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
              `;
    videoArea.innerHTML = tempHtml;
  }
}
