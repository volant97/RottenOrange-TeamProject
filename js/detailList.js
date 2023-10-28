export function detailList(detailsListKR, creditsKR) {
  const detailsList = detailsListKR;
  const creditsList = creditsKR;

  const title = detailsList.title;
  const voteAverage = detailsList.vote_average;
  const releaseDate = detailsList.release_date;
  const runTime = detailsList.runtime;
  const genres = detailsList.genres[0].name;

  const director = creditsList.crew.find((item) => {
    const job = item.job;
    if (job === "Director") {
      return true;
    }
  }).name;

  // department === "Acting" 인 경우 배열로 반환
  let actors = creditsList.cast
    .filter((item) => {
      const department = item.known_for_department;
      if (department === "Acting") {
        return true;
      }
    })
    .slice(0, 4)
    .map((actor) => {
      return actor.name;
    })
    .join(", ");

  const overview = detailsList.overview;
}
