// localStorage에 저장할 때, id(new Date())를 지정
// 댓글리스트 출력 -> map()~~ : 하나하나마다 고유의 id를 지정
// 지금 : id에 비밀번호
// 변경 : id에 ID

// delete button -> click -> 'id'얻어올 수 있어
// setItem("revies", ~~~~~~);
// ~~~~~~ -> 기존의 리뷰 중 id가 그놈이 아닌 것들만 filter
//

export function showReview() {
  const review = document.querySelector(".review");
  const name = document.querySelector(".name");
  const password = document.querySelector(".password");
  const comment = document.querySelector(".comment");
  const user = document.querySelector(".user");
  const reviewList = document.querySelector(".review_list");
  const deleteModal = document.querySelector(".modal_container");
  const showTime = document.createElement('div');
  showTime.className = 'time';

  // 재할당 가능하도록 let으로 선언
  let reviews = []; // 저장된 리뷰 리스트

  // localStorage에 리뷰 리스트 저장
  function saveReviews() {
    localStorage.setItem("reviews", JSON.stringify(reviews));
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
  
    const time = year + '-' + month + '-' + wDate + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }

  // localStorage에 저장된 리뷰 리스트 불러오기
  const savedReviews = localStorage.getItem("reviews");
  if (savedReviews !== null) {
    const parsedReviews = JSON.parse(savedReviews);
    reviews = parsedReviews;
    parsedReviews.forEach(drawReviews);
  }

  function drawReviews(newReview) {
    let temp_html = `
        <div id="${newReview.id}" class="review_content">
            <p>${newReview.name}:</p>
            <p>${newReview.comment}</p>
            <p class="hidden">${newReview.password}</p>
            <button id="${newReview.password}" class="deleteBtn">삭제</button>
            <h1>${newReview.time}</h1>
            
        </div>
    `;
    reviewList.innerHTML += temp_html;

    // (1)삭제 (패스워드가 일치해야 삭제 가능)
    // const deleteBtn = document.querySelector(".deleteBtn");
    // deleteBtn.addEventListener("click", function (event) {
    //   event.preventDefault();
    //   let reviewElement = event.target.parentElement;
    //   let prevPw = event.target.id;
    //   handleModal(prevPw);

    //   li.remove();
    //   reviews = reviews.filter((review) => review.id !== parseInt(li.id)); // 선택한 값을 제외한 배열 반환
    //   saveReviews();
    // });
  }

  // 리뷰 삭제
  const deleteBtnAll = document.querySelectorAll(".deleteBtn");
  console.log(deleteBtnAll);
  deleteBtnAll.forEach((item, index) => {
    item.addEventListener("click", function (event) {
      let list = event.target.parentElement;
      let prevPw = parseInt(event.target.id);
      handleModal(index, prevPw);

      // list.remove();
      // reviews = reviews.filter((review) => {
      //   review.id !== parseInt(list.id);
      // }); // 선택한 값을 제외한 배열 반환
      // saveReviews();
    });
  });

  function handleModal(list, prevPw) {
    deleteModal.classList.remove("hidden");
    const modalForm = document.querySelector(".modal_content");
    const input = document.querySelector(".modal_content input");
    input.focus();
    console.log(`저장된 pw: ${prevPw}`);

    modalForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const inputPw = input.value;
      console.log(`입력된 pw: ${inputPw}`);
      input.value = "";

      // 리뷰 리스트 필터링
      // filteredReviews = reviews.filter((review) => {
      //   review.id !== parseInt(prevPw);
      // });

      // 비밀번호 검증
      // 저장된 패스워드와 입력받은 패스워드가 일치할 경우
      if (inputPw === prevPw) {
        deleteModal.classList.add("hidden");
        console.log(index);
      } else {
        alert("비밀번호를 입력해주세요");
      }
    });
    // reviewList.innerHTML = "";

    // deleteModal.classList.add("hidden");
    // drawReviews(filteredReviews);
  }

  function handleWriteReview(event) {
    // event.preventDefault(); // 왜 새로고침을 해야만 삭제가 되는지
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
        id: Date.now(),
        name: newName,
        password: newPwd,
        comment: newCmd,
        time: time
      };

      reviews.push(newReview);
      drawReviews(newReview);
      user.classList.add("hidden");
      saveReviews();
    }
  }

  comment.addEventListener("focus", function () {
    user.classList.remove("hidden");
  });

  review.addEventListener("submit", handleWriteReview);
}

showReview();


// 스크롤 업 기능
const backToTop = () => {
  document.getElementById("go-top").addEventListener("click", () => {
    console.log("click");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
};
backToTop();

// 참고
// const handleReviews = function (reviews) {
//   // (1) draw

//   // (2) localStorage에 저장
// }

