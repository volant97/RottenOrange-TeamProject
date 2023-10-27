export function movie(moviesUS) {
    // console.log("moviesUS: ", moviesUS);
    const movies = moviesUS;

    const videoArea = document.querySelector(".video_area");

    // Type = Trailer 값 출력
    const TrailerType = movies.find((item) => {
        const type = item.type;
        if (type.includes("Trailer")) {
            return true;
        }
    });

    const KEY = TrailerType.key;
    const MOVIE_BASE_URL = `https://www.youtube.com/embed/${KEY}?autoplay=1&mute=1`;

    const tempHtml = `
        <iframe class="video" width="1100px" height="618.75px" src="${MOVIE_BASE_URL}" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
        `;
    videoArea.innerHTML = tempHtml;
}