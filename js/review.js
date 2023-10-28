import { clickedID } from "./script.js";

function showReview() {
  const review = document.querySelector(".review");
  const name = document.querySelector(".name");
  const password = document.querySelector(".password");
  const comment = document.querySelector(".comment");
  const user = document.querySelector(".user");
  const reviewList = document.querySelector(".review_list");
  const deleteModal = document.querySelector(".modal_container");
  const showTime = document.createElement("div");
  showTime.className = "time";

  // 재할당 가능하도록 let으로 선언
  let reviews = []; // 저장된 리뷰 리스트

  // localStorage에 리뷰 리스트 저장
  function saveReviews() {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  // localStorage에 저장된 리뷰 리스트 불러오기
  const savedReviews = localStorage.getItem("reviews");
  if (savedReviews !== null) {
    const parsedReviews = JSON.parse(savedReviews);
    reviews = parsedReviews;
    parsedReviews
      .filter((review) => {
        console.log(review.movieID, clickedID);
        return review.movieID === clickedID;
      })
      .forEach(drawReviews);
  }

  //시간 표시
  function generateTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const wDate = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const time =
      year + "-" + month + "-" + wDate + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  function drawReviews(newReview) {
    let temp_html = `
        <div id="${newReview.id}" class="review_content">
          <div>
            <p>${newReview.name}:</p>
            <p>${newReview.comment}</p>
          </div>
          <p class="time">${newReview.time}</p>
          <p id="password" class="password hidden" data-value="${newReview.password}">${newReview.password}</p>
          <button id="${newReview.id}" class="deleteBtn">삭제</button>          
        </div>
    `;
    reviewList.innerHTML += temp_html;
  }

  // 리뷰 삭제
  const deleteBtnAll = document.querySelectorAll(".deleteBtn");
  deleteBtnAll.forEach((item, index) => {
    item.addEventListener("click", function (event) {
      let reviewEl = event.target.parentElement; // 부모 요소
      const pwElement = reviewEl.querySelector("#password");
      const prevPw = pwElement.getAttribute("data-value"); // 저장된 password 값
      let savedID = parseInt(event.target.id); // 저장된 id 값
      handleModal(reviewEl, savedID, prevPw);
    });
  });

  function handleModal(reviewEl, savedID, prevPw) {
    deleteModal.classList.remove("hidden");

    const modalForm = document.querySelector(".modal_content");
    const input = document.querySelector(".modal_content input");
    input.focus();
    console.log(`저장된 pw: ${prevPw}`);

    modalForm.addEventListener("submit", function (event) {
      const inputPw = input.value;
      console.log(`입력된 pw: ${inputPw}`);
      input.value = "";

      if (inputPw === prevPw) {
        reviewEl.remove();
        // localstorage 삭제
        reviews = reviews.filter(
          (review) => review.id !== parseInt(reviewEl.id)
        );
        saveReviews();
        deleteModal.classList.add("hidden");
      } else {
        event.preventDefault();
        alert("비밀번호를 다시 입력해주세요.");
      }
    });
  }

  function handelReviews(event) {
    event.preventDefault();
    const newName = name.value;
    const newPwd = password.value;
    const newCmd = comment.value;
    const time = generateTime();
    name.value = "";
    password.value = "";
    comment.value = "";

    if (!newName || !newPwd || !newCmd) {
      alert("폼을 입력해주세요!");
    } else {
      const newReview = {
        movieID: clickedID,
        id: Date.now(),
        name: newName,
        password: newPwd,
        comment: newCmd,
        time: time,
      };

      reviews.push(newReview);
      drawReviews(newReview);
      user.classList.add("hidden");
      saveReviews();
      window.location.reload();
    }
  }

  comment.addEventListener("focus", function () {
    user.classList.remove("hidden");
  });

  review.addEventListener("submit", handelReviews);
}

// 스크롤 업 기능
const backToTop = () => {
  window.addEventListener("scroll", () => {
    if (document.querySelector("html").scrollTop > 100) {
      document.getElementById("go-top").style.display = "block";
    } else {
      document.getElementById("go-top").style.display = "none";
    }
  });

  document.getElementById("go-top").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
};
backToTop();

export { showReview, backToTop };
