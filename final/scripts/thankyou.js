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

const savedUser = JSON.parse(localStorage.getItem('focusShootUser'));

if (savedUser) {
  document.getElementById('displayFirstName').textContent = savedUser.firstName;
  document.getElementById('displayLastName').textContent = savedUser.lastName;
  document.getElementById('displayEmail').textContent = savedUser.email;
  document.getElementById('displayUsername').textContent = savedUser.username;
  document.getElementById('displayGenre').textContent = savedUser.favoriteGenre;
} else {
  document.querySelector('.user-info').innerHTML = '<p>No signup information found.</p>';
}