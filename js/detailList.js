export function detailList(detailsListKR, creditsKR) {

    const detailTop = document.querySelector(".detail_Top");
    const detailBottom = document.querySelector(".detail_Bottom");

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

    const actors = creditsList.cast
        .filter(item => {
            const department = item.known_for_department;
            if (department === "Acting") {
                return true;
            }
        })
        .slice(0, 4)
        .map(actor => {
            return actor.name;
        })
        .join(", ");

    const overview = detailsList.overview;


    const tempHtmlTop = `
        <h1 class="detail_Top_Header">${title}</h1>
        <div class="detail_Top_Inner">
            <p>★${voteAverage}</p>
            <p>${releaseDate}</p>
            <p>${runTime}</p>
            <p>${genres}</p>
        </div>`;

    const tempHtmlBottom = `
        <div class="detail_Bottom_Inner">
            <p class="detail_Bottom_Header">감독</p>
            <p class="detail_Bottom_Text">${director}</p>
        </div>
        <div class="detail_Bottom_Inner">
            <p class="detail_Bottom_Header">출연</p>
            <p class="detail_Bottom_Text">${actors}</p>
        </div>
        <div class="detail_Bottom_Inner">
            <p class="detail_Bottom_Header">소개</p>
            <p class="detail_Bottom_Intro">${overview}</p>
        </div>`;

    detailTop.innerHTML = tempHtmlTop;
    detailBottom.innerHTML = tempHtmlBottom;


    //     <div class="detail_Top_Inner">
    // <p>★평점</p>
    // <p>개봉</p>
    // <p>러닝타임</p>
    // <p>장르</p>
    //                 </div>

    // <div class="detail_Bottom">
    // <div class="detail_Bottom_Inner">
    //     <p class="detail_Bottom_Header">감독</p>
    //     <p class="detail_Bottom_Text">내용</p>
    // </div>
    // <div class="detail_Bottom_Inner">
    //     <p class="detail_Bottom_Header">출연</p>
    //     <p class="detail_Bottom_Text">내용</p>
    // </div>
    // <div class="detail_Bottom_Inner">
    //     <p class="detail_Bottom_Header">소개</p>
    //     <p class="detail_Bottom_Intro">불, 물, 공기, 흙 4개의 원소들이 살고 있는 ‘엘리멘트 시티’ 재치 있고 불처럼 열정 넘치는 ‘앰버'는 어느 날 우연히
    //         유쾌하고 감성적이며 물 흐르듯 사는 '웨이드'를 만나 특별한 우정을 쌓으며, 지금껏 믿어온 모든 것들이 흔들리는 새로운 경험을 하게 되는데... 웰컴 투 ‘엘리멘트 시티’!
    //     </p>
    // </div>
    // </div>

    // ----작성중-----

}
