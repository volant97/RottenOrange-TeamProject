export function detailList(detailsListKR, creditsKR) {
    const detailsList = detailsListKR;
    const creditsList = creditsKR;

    const title = detailsList.title;
    const voteAverage = detailsList.vote_average;
    const releaseDate = detailsList.release_date;
    const runTime = detailsList.runtime;
    const genres = detailsList.genres[0].name;

    const director = creditsList.crew.find(item => {
        const job = item.job;
        if (job === "Director") {
            return true;
        }
    }).name;
    let actor = creditsList.cast.filter(item => {
        const department = item.known_for_department;
        if (department === "Acting") {
            return true;
        }
    }).slice(0, 4)
    // ----작성중-----

    

    

    // const actor4 = (actor) => {
    //     for(let i=0; i<actor.length; i++){
    //     actor[i]
    // }
 
    const overview = detailsList.overview;

    console.log(actor[0].id);
    // console.log(actor[0].name + actor[2].name);
}