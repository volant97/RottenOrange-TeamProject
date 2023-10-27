export function detailList(detailsListKR, creditsKR) {
    const detail_Top_Inner = document.querySelector(".detail_Top_Inner");
    
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
    const actors = `${actor[0].name}, ${actor[1].name}, ${actor[2].name}, ${actor[3].name}`;
    const overview = detailsList.overview;



    <div class="detail_Top_Inner">
                    <p>★평점</p>
                    <p>개봉</p>
                    <p>러닝타임</p>
                    <p>장르</p>
                </div>

    // ----작성중-----

    

    

    
        // for(let i=0; i<actor.length; i++){
        // actor = actor[i].name
        // }
    
 
    

    console.log(overview);
    // console.log(actor[0].name + actor[2].name);
}