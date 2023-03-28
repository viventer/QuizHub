const textLogo = document.querySelector(".text-logo");
const searchBar = document.querySelector(".search-bar");

searchBar.addEventListener("focus", () => {
  textLogo.style.display = "none";
});

searchBar.addEventListener("blur", () => {
  textLogo.style.display = "block";
});
