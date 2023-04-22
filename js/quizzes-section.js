const recommendedQuizzes = document.querySelectorAll(
  ".recommended-quizzes .quiz"
);
let hiddenQuizzes = [];
const showMoreButton = document.querySelector(".show-more-button");
let defaultNumOfQuizzes = 0;
let showed = 0;

hideQuizzes();
window.addEventListener("resize", hideQuizzes);

function hideQuizzes() {
  hiddenQuizzes = [];
  recommendedQuizzes.forEach((quiz) => {
    quiz.classList.add("hidden");
    hiddenQuizzes.push(quiz);
  });

  if (window.innerWidth > 2222) {
    defaultNumOfQuizzes = 12;
  } else if (window.innerWidth > 1848) {
    defaultNumOfQuizzes = 10;
  } else if (window.innerWidth > 1475) {
    defaultNumOfQuizzes = 8;
  } else if (window.innerWidth > 1102) {
    defaultNumOfQuizzes = 6;
  } else if (window.innerWidth > 728) {
    defaultNumOfQuizzes = 4;
  } else {
    defaultNumOfQuizzes = 2;
  }

  for (let i = 0; i < defaultNumOfQuizzes; i++) {
    recommendedQuizzes[i].classList.remove("hidden");
    hiddenQuizzes.shift();
  }

  checkNumOfQuizzes();
}

showMoreButton.addEventListener("click", showMoreQuizzes);

function showMoreQuizzes() {
  let toShow = defaultNumOfQuizzes / 2;
  for (let i = 0; i < toShow; i++) {
    hiddenQuizzes[0].classList.remove("hidden");
    hiddenQuizzes.shift();
  }
  showed += toShow;
  checkNumOfQuizzes();
}

function checkNumOfQuizzes() {
  console.log(hiddenQuizzes.length);
  if (hiddenQuizzes.length < defaultNumOfQuizzes / 2) {
    showMoreButton.style.display = "none";
  } else {
    showMoreButton.style.display = "block";
  }
}
