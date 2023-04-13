let quizzes = document.querySelectorAll(".quiz");
const categoryButtons = document.querySelectorAll(".nav-category-button");
let category = "all";
let categories = {
  wszystkie: "all",
  geografia: "geography",
  sport: "sport",
  informatyka: "computer_science",
  programowanie: "programming",
  gry: "games",
};
let filteredQuizzes = [];

categoryButtons.forEach((button) =>
  button.addEventListener("click", setCategory)
);

// nie działa jeszcze
function setCategory() {
  categoryButtons.forEach((button) => {
    button.classList.remove("active");
  });
  this.classList.add("active");
  category = this.textContent;
  category = category.trim().toLowerCase();
  category = categories[category];
  quizzes.forEach((quiz) => {
    if (quiz.classList.contains(category)) {
      filteredQuizzes.push(quiz);
    }
  });
}

let mainIndex = 1;
let previousMainIndex = 2;
let leftButton;
let rightButton;
let forward = true;
let rightIndex;
let secondRightIndex;
let leftIndex;
let secondLeftIndex;

sliderShift();

function sliderShift() {
  if (forward == true) {
    mainIndex += 1;
  } else {
    mainIndex -= 1;
  }
  if (mainIndex == -1) {
    mainIndex = quizzes.length - 1;
  }
  if (mainIndex == quizzes.length) {
    mainIndex = 0;
  }
  rightIndex = mainIndex + 1;
  secondRightIndex = mainIndex + 2;
  secondLeftIndex = mainIndex - 2;
  leftIndex = mainIndex - 1;

  if (mainIndex == 1) {
    secondLeftIndex = quizzes.length - 1;
  }
  if (mainIndex == 0) {
    secondLeftIndex = quizzes.length - 2;
    leftIndex = quizzes.length - 1;
  }

  if (mainIndex == quizzes.length - 2) {
    secondRightIndex = 0;
  }
  if (mainIndex == quizzes.length - 1) {
    rightIndex = 0;
    secondRightIndex = 1;
  }

  quizzes[secondLeftIndex].classList.remove("other-quiz");
  quizzes[leftIndex].classList.remove("other-quiz");
  quizzes[mainIndex].classList.remove("other-quiz");
  quizzes[rightIndex].classList.remove("other-quiz");
  quizzes[secondRightIndex].classList.remove("other-quiz");

  quizzes[secondLeftIndex].classList.add("second-left-quiz");
  quizzes[leftIndex].classList.add("left-quiz");
  quizzes[mainIndex].classList.add("main-quiz");
  quizzes[rightIndex].classList.add("right-quiz");
  quizzes[secondRightIndex].classList.add("second-right-quiz");

  leftButton = document.createElement("button");
  leftButton.classList.add("left-quiz-button");
  rightButton = document.createElement("button");
  rightButton.classList.add("right-quiz-button");

  quizzes[mainIndex].appendChild(leftButton);
  quizzes[mainIndex].appendChild(rightButton);

  leftButton.addEventListener("click", () => {
    forward = false;
    previousMainIndex = mainIndex;
    clearEarlier();
    sliderShift();
  });
  rightButton.addEventListener("click", () => {
    forward = true;
    previousMainIndex = mainIndex;
    clearEarlier();
    sliderShift();
  });
}

function clearEarlier() {
  quizzes[secondLeftIndex].classList.add("other-quiz");
  quizzes[leftIndex].classList.add("other-quiz");
  quizzes[mainIndex].classList.add("other-quiz");
  quizzes[rightIndex].classList.add("other-quiz");
  quizzes[secondRightIndex].classList.add("other-quiz");

  quizzes[secondLeftIndex].classList.remove("second-left-quiz");
  quizzes[leftIndex].classList.remove("left-quiz");
  quizzes[mainIndex].classList.remove("main-quiz");
  quizzes[rightIndex].classList.remove("right-quiz");
  quizzes[secondRightIndex].classList.remove("second-right-quiz");

  quizzes[mainIndex].removeChild(leftButton);
  quizzes[mainIndex].removeChild(rightButton);
}
