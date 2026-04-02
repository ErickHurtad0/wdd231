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

const favoritesContainer = document.getElementById('favoritesContainer');

const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

if (favorites.length === 0) {
  favoritesContainer.innerHTML = `
    <p class="empty-message">You have no favorite movies yet.</p>
  `;
} else {
  favorites.forEach(movie => {
    const card = document.createElement('article');
    card.classList.add('movie-card');

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <div class="movie-info">
        <h2>${movie.title}</h2>
        <p>${movie.year}</p>
        <p>${movie.genre}</p>

        <button class="remove-btn">Remove</button>
      </div>
    `;

    const removeBtn = card.querySelector('.remove-btn');

    removeBtn.addEventListener('click', () => {
      let updatedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

      updatedFavorites = updatedFavorites.filter(
        fav => fav.title !== movie.title
      );

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      card.remove();

      if (updatedFavorites.length === 0) {
        favoritesContainer.innerHTML = `
          <p class="empty-message">You have no favorite movies yet.</p>
        `;
      }
    });

    favoritesContainer.appendChild(card);
  });
}