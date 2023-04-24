const recommendedQuizzes = document.querySelectorAll(
  ".recommended-quizzes .quiz"
);
let hiddenQuizzes = [];
const showMoreButton = document.querySelector(".show-more-button");
let defaultNumOfQuizzes = 0;
let showed = [];
let toShow = 0;

hideQuizzes();
window.addEventListener("resize", hideQuizzes);

function hideQuizzes() {
  hiddenQuizzes = [];
  recommendedQuizzes.forEach((quiz) => {
    if (!showed.includes(quiz)) {
      quiz.classList.add("hidden");
      hiddenQuizzes.push(quiz);
    }
  });

  if (window.innerWidth > 2222) {
    defaultNumOfQuizzes = 12;
    toShow = defaultNumOfQuizzes / 2;
  } else if (window.innerWidth > 1848) {
    defaultNumOfQuizzes = 10;
    toShow = defaultNumOfQuizzes / 2;
  } else if (window.innerWidth > 1475) {
    defaultNumOfQuizzes = 8;
    toShow = defaultNumOfQuizzes / 2;
  } else if (window.innerWidth > 1102) {
    defaultNumOfQuizzes = 6;
    toShow = defaultNumOfQuizzes / 2;
  } else if (window.innerWidth > 728) {
    defaultNumOfQuizzes = 4;
    toShow = defaultNumOfQuizzes + 2;
  } else {
    defaultNumOfQuizzes = 2;
    toShow = defaultNumOfQuizzes + 1;
  }

  for (let i = 0; i < defaultNumOfQuizzes; i++) {
    recommendedQuizzes[i].classList.remove("hidden");
    showed.push(recommendedQuizzes[i]);
    hiddenQuizzes.shift();
  }

  checkNumOfQuizzes();
}

showMoreButton.addEventListener("click", showMoreQuizzes);

function showMoreQuizzes() {
  for (let i = 0; i < toShow; i++) {
    hiddenQuizzes[0].classList.remove("hidden");
    showed.push(hiddenQuizzes[0]);
    hiddenQuizzes.shift();
  }
  checkNumOfQuizzes();
}

function checkNumOfQuizzes() {
  console.log(hiddenQuizzes.length);
  if (hiddenQuizzes.length < toShow) {
    if (hiddenQuizzes.length < defaultNumOfQuizzes / 2) {
      showMoreButton.style.display = "none";
    } else {
      toShow = hiddenQuizzes.length;
    }
  } else {
    showMoreButton.style.display = "flex";
  }
}
