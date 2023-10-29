// 제작사 추천 영화
const API_ID1 = 976573; //976573 엘리멘탈 : 창근
const API_ID2 = 165213; //165213 신세계 : 상욱
const API_ID3 = 597; //597 타이타닉 : 현진
const API_ID4 = 862; //862 토이스토리 : 은비
// const producerName = [{ "name": "창근" }, { "name": "상욱" }, { "name": "현진" }, { "name": "은비" }];
// const producerNames = ["창근", "상욱", "현진", "은비"];

const API_Details_KR1 = `https://api.themoviedb.org/3/movie/${API_ID1}?language=ko-KR`;
const API_Details_KR2 = `https://api.themoviedb.org/3/movie/${API_ID2}?language=ko-KR`;
const API_Details_KR3 = `https://api.themoviedb.org/3/movie/${API_ID3}?language=ko-KR`;
const API_Details_KR4 = `https://api.themoviedb.org/3/movie/${API_ID4}?language=ko-KR`;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const recMCL = document.querySelector(".recommendMovieCardList");

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTU2NGFmZjVjMmQ2NTg5NjIzYmYwNTU3OWZkYTg3NCIsInN1YiI6IjY1MmYyOTYwZWE4NGM3MDEwYzFkYzYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tllRINCGQK3ug_vl1CgEERHfUuoXmbgBZ8X-3hswvEE",
    },
};

function recMovie() {
   
    // const newMDatas = MDatas.map(data => {
    //     let newMD = data
    //     newMD["member"] = producerNames;
        
    //     return newMD
    //     })
    
    // console.log(newMDatas);


    MDatas.forEach(data => {
        const recId = data["id"];
        const recPosterPath = data["poster_path"];
        const recTitle = data["title"];
        const recOverview = data["overview"];
        const recVoteAverage = data["vote_average"].toFixed(1);
        
        const tempHtmlRec = `
        <a data-id="${recId} "class="recMovieCard" href="./detailedpage.html">
            <div class="movieImage">
                <img src="${IMAGE_BASE_URL}${recPosterPath}"/>
            </div>
            <div class="movieName">
                <h3>${recTitle}</h3>
            </div>
            <div class="movieExplanation">
                <p>${recOverview}</p>
            </div>
            <div class="movieGrade">
                <p>★ ${recVoteAverage}</p>
            </div>
        </a>`;
        
        recMCL.insertAdjacentHTML("beforeend", tempHtmlRec);
    })

    // const producer = document.querySelector(".producer");
    // producerName.forEach(pro => {
    //     const tempHtmlName = `
    //         <h2>${pro.name}</h2>
    //     `
    //     producer.insertAdjacentHTML("beforeend", tempHtmlName);
    // });

    const movieCards = document.querySelectorAll(".recMovieCard");
    movieCards.forEach((card) => {
        card.addEventListener("click", function () {
            const movieCardId = this.getAttribute("data-id");
            localStorage.setItem("clickID", movieCardId);
        });
    });
}

const [MData1, MData2, MData3, MData4] = await Promise.all([
    fetch(API_Details_KR1, options)
        .then(res => res.json())
        .catch((err) => console.error(err)),
    fetch(API_Details_KR2, options)
        .then(res => res.json())
        .catch((err) => console.error(err)),
    fetch(API_Details_KR3, options)
        .then(res => res.json())
        .catch((err) => console.error(err)),
    fetch(API_Details_KR4, options)
        .then(res => res.json())
        .catch((err) => console.error(err)),
])

const MDatas = [MData1, MData2, MData3, MData4];
recMovie()