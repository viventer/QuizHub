const textLogo = document.querySelector(".text-logo");
const searchBar = document.querySelector(".search-bar");
const searchIconBox = document.querySelector(".search-icon-box");
const signInButton = document.querySelector(".sign-in-button");

searchBar.addEventListener("focus", () => {
  textLogo.style.display = "none";
});

searchBar.addEventListener("blur", () => {
  textLogo.style.display = "block";
  if (window.innerWidth < 350) {
    searchBar.style.display = "none";
  }
});

searchIconBox.addEventListener("click", () => {
  searchBar.style.display = "block";
  searchBar.focus();
});

if (window.innerWidth < 305) {
  signInButton.innerHTML = '<i class="icon-user"></i>';
  signInButton.style.padding = "0 0.1rem";
}
