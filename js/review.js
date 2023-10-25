export function showReview() {
  const review = document.querySelector(".review");
  const name = document.querySelector(".name");
  const password = document.querySelector(".password");
  const comment = document.querySelector(".comment");
  const user = document.querySelector(".user");
  const reviewList = document.querySelector(".review_list");

  let reviews = []; // 저장된 감상평 리스트

  // localstorage에 리뷰 리스트 저장
  function saveReviews() {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  const showReviews = (newReview) => {
    console.log(reviews);
    let temp_html = `
        <div class="review_content">
            <p>${newReview.name}:</p>
            <p>${newReview.comment}</p>
            <button class="deleteBtn">삭제</button>
        </div>       
    `;
    reviewList.innerHTML += temp_html;

    // 수정 이벤트
    // const editBtn = document.querySelector(".editBtn");
    // editBtn.addEventListener("click", editReview);

    // 삭제 이벤트 (패스워드가 있어야 삭제 가능)
    const deleteBtn = document.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", deleteReview);
  };

  function deleteReview(event) {
    const clickedReview = event.target.parentElement; // 클란한 요소의 부모요소
    clickedReview.remove();
    alert("삭제!");
  }

  function editReview() {
    alert("수정");
  }

  const handleWriteReview = (event) => {
    event.preventDefault();
    const newName = name.value;
    const newPwd = password.value;
    const newCmd = comment.value;
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
      };

      reviews.push(newReview);
      showReviews(newReview);
      user.classList.add("hidden");
      saveReviews();
    }
  };

  comment.addEventListener("focus", function () {
    user.classList.remove("hidden");
  });

  review.addEventListener("submit", handleWriteReview);
}

showReview();

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
