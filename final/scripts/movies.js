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
      const genreIds = card.dataset.genreIds.split(',').map(Number);
      const genreNames = getGenres(genreIds).map(g => g.toLowerCase());

      if (
        selectedGenre === 'all' ||
        genreNames.includes(selectedGenre)
      ) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

const trendingContainer = document.querySelector('#trending-container');
const apiKey = '3a52cca85c987e2f8f5298f6f230d976';

async function loadMovies() {
  try {
    trendingContainer.innerHTML = '<p class="loading-text">Loading movies...</p>';

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`
    );

    if (!response.ok) {
      throw new Error('Unable to load movies from TMDb');
    }

    const data = await response.json();
    const movies = data.results;

    trendingContainer.innerHTML = '';

    movies.forEach(movie => {
      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'images/no-poster.jpg';

      const card = document.createElement('article');
      card.classList.add('movie-card');

      card.dataset.title = movie.title.toLowerCase();
      card.dataset.genreIds = movie.genre_ids.join(',');

      card.innerHTML = `
        <div class="movie-poster">
          <img src="${poster}" alt="${movie.title} poster">
          <span class="movie-rating">★ ${movie.vote_average.toFixed(1)}</span>
        </div>

        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p class="movie-year">
            ${movie.release_date ? movie.release_date.slice(0, 4) : 'Unknown'}
          </p>

          <div class="movie-actions">
            <button class="movie-btn">View Details</button>
            <button class="favorite-btn">❤</button>
          </div>
        </div>
      `;

      const favoriteBtn = card.querySelector('.favorite-btn');

      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      let isFavorite = favorites.some(fav => fav.id === movie.id);

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
          favorites = favorites.filter(fav => fav.id !== movie.id);
          isFavorite = false;
        } else {
          favorites.push({
            id: movie.id,
            title: movie.title,
            poster,
            rating: movie.vote_average,
            year: movie.release_date?.slice(0, 4),
            overview: movie.overview
          });
          isFavorite = true;
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteButton();
      });

      card.addEventListener('click', () => {
        document.getElementById('modalPoster').src = poster;
        document.getElementById('modalTitle').textContent = movie.title;
        document.getElementById('modalGenre').textContent =
          getGenres(movie.genre_ids).join(', ');
        document.getElementById('modalRating').textContent =
          `★ ${movie.vote_average.toFixed(1)}`;
        document.getElementById('modalDescription').textContent =
          movie.overview || 'No description available.';

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

const genreMap = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  53: 'Thriller',
  10752: 'War'
};

function getGenres(ids) {
  return ids.map(id => genreMap[id]).filter(Boolean);
}

loadMovies();