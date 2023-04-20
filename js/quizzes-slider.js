let quizzes = document.querySelectorAll(".category-quiz");
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
let oldQuizzes = quizzes;
let intervalId;
let isCategorySwitching;
let mainIndex = 1;
let forward = true;
let rightIndex;
let secondRightIndex;
let leftIndex;
let secondLeftIndex;

categoryButtons.forEach((button) =>
  button.addEventListener("click", setCategory)
);

let leftButton = document.createElement("button");
leftButton.classList.add("left-quiz-button");
let rightButton = document.createElement("button");
rightButton.classList.add("right-quiz-button");

leftButton.addEventListener("click", () => {
  forward = false;
  sliderShift();
  clearInterval(intervalId);
  intervalId = setInterval(() => rightButton.click(), 4500);
});
rightButton.addEventListener("click", () => {
  forward = true;
  sliderShift();
  clearInterval(intervalId);
  intervalId = setInterval(() => rightButton.click(), 4500);
});

function setCategory() {
  filteredQuizzes = [];
  categoryButtons.forEach((button) => {
    button.classList.remove("active");
  });
  this.classList.add("active");
  category = this.textContent;
  category = category.trim().toLowerCase();
  category = categories[category];
  oldQuizzes.forEach((quiz) => {
    if (category != "all") {
      if (quiz.classList.contains(category)) {
        filteredQuizzes.push(quiz);
      }
    } else {
      filteredQuizzes.push(quiz);
    }
  });
  quizzes = filteredQuizzes;
  mainIndex = 2;
  isCategorySwitching = true;
  rightButton.click();
}

categoryButtons[0].click();

function sliderShift() {
  clearEarlier();
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

  if (mainIndex >= quizzes.length - 1) {
    rightIndex = 0;
    secondRightIndex = 1;
  } else if (mainIndex >= quizzes.length - 2) {
    secondRightIndex = 0;
  }

  if (isCategorySwitching == false) {
    let margin = 8;
    let animationInterval = setInterval(() => {
      leftButton.style.pointerEvents = "none";
      rightButton.style.pointerEvents = "none";
      if (forward == true) {
        quizzes[mainIndex].style.marginLeft = margin + "vw";
      } else {
        quizzes[mainIndex].style.marginRight = margin + "vw";
      }
      margin -= 0.1;
      if (margin <= 0) {
        clearInterval(animationInterval);
        leftButton.style.pointerEvents = "all";
        rightButton.style.pointerEvents = "all";
      }
    }, 3);
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

  quizzes[mainIndex].appendChild(rightButton);
  quizzes[mainIndex].appendChild(leftButton);

  isCategorySwitching = false;
}

function clearEarlier() {
  oldQuizzes.forEach((quiz) => {
    quiz.classList.add("other-quiz");
    quiz.classList.remove("second-left-quiz");
    quiz.classList.remove("left-quiz");
    quiz.classList.remove("right-quiz");
    quiz.classList.remove("second-right-quiz");
    quiz.classList.remove("main-quiz");
    try {
      quiz.removeChild(leftButton);
      quiz.removeChild(rightButton);
    } catch (error) {}
  });
}
