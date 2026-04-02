const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');
const searchInput = document.getElementById('movieSearch');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();
    const movieCards = document.querySelectorAll('.movie-card');

    movieCards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      card.style.display = title.includes(value) ? 'block' : 'none';
    });
  });
}

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {

    filterButtons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');

    const selectedGenre = button.textContent.toLowerCase();
    const movieCards = document.querySelectorAll('.movie-card');

    movieCards.forEach(card => {
      const genreText = card.querySelector('.movie-info p').textContent.toLowerCase();

      if (
        selectedGenre === 'all' ||
        genreText.includes(selectedGenre)
      ) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

const trendingContainer = document.querySelector('#trending-container');

async function loadMovies() {
  try {
    const response = await fetch('./data/movies.json');

    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const movies = await response.json();
    console.log(movies);

    const trendingMovies = movies;

    trendingMovies.forEach(movie => {
      const card = document.createElement('article');
      card.classList.add('movie-card');
      card.dataset.title = movie.title;

      card.innerHTML = `
          <div class="movie-poster">
              <img src="${movie.poster}" alt="${movie.title} poster">
              <span class="movie-rating">★ ${movie.rating}</span>
          </div>

          <div class="movie-info">
              <h3>${movie.title}</h3>
              <p>${movie.genre}</p>
              <p>${movie.year}</p>
              <a href="#" class="movie-btn">View Details</a>
              <button class="favorite-btn">❤ Favorite</button>
          </div>
      `;

      const favoriteBtn = card.querySelector('.favorite-btn');

      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      let isFavorite = favorites.some(fav => fav.title === movie.title);

      function updateFavoriteButton() {
          if (isFavorite) {
              favoriteBtn.textContent = '❤';
              favoriteBtn.classList.add('active');
          } else {
              favoriteBtn.textContent = '♡';
              favoriteBtn.classList.remove('active');
          }
      }

      updateFavoriteButton();

      favoriteBtn.addEventListener('click', event => {
          event.stopPropagation();

          let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

          if (isFavorite) {
              favorites = favorites.filter(fav => fav.title !== movie.title);
              isFavorite = false;
          } else {
              favorites.push(movie);
              isFavorite = true;
          }

          localStorage.setItem('favorites', JSON.stringify(favorites));
          updateFavoriteButton();
      });

      card.addEventListener('click', () => {
          document.getElementById('modalPoster').src = movie.poster;
          document.getElementById('modalTitle').textContent = movie.title;
          document.getElementById('modalGenre').textContent = movie.genre;
          document.getElementById('modalRating').textContent = `★ ${movie.rating}`;
          document.getElementById('modalDescription').textContent = movie.description;

          document.getElementById('movieModal').classList.remove('hidden');
      });

      trendingContainer.appendChild(card);
  });

        const movieModal = document.getElementById('movieModal');
        const closeModal = document.getElementById('closeModal');

        closeModal.addEventListener('click', () => {
        movieModal.classList.add('hidden');
        });

        movieModal.addEventListener('click', event => {
        if (event.target === movieModal) {
            movieModal.classList.add('hidden');
        }
        });
  } catch (error) {
    console.error(error);
    trendingContainer.innerHTML = `<p>${error.message}</p>`;
  }
}

loadMovies();