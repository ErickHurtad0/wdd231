const menuButton = document.getElementById("menuToggle");
const nav = document.getElementById("primaryNav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");

    menuButton.textContent = nav.classList.contains("open")
      ? "✖"
      : "☰";
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      nav.classList.remove("open");
      menuButton.textContent = "☰";
    }
  });
}

const form = document.getElementById('signupForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const userData = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    username: document.getElementById('username').value,
    favoriteGenre: document.getElementById('favoriteGenre').value
  };

  localStorage.setItem('focusShootUser', JSON.stringify(userData));

  window.location.href = 'thankyou.html';
});