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

const trendingContainer = document.querySelector('#trending-container');
const randomMovieContainer = document.querySelector('#random-movie');

const apiKey = 'YOUR_TMDB_API_KEY';

async function loadMovies() {
  try {
    // Trending movies
    const trendingResponse = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
    );

    if (!trendingResponse.ok) {
      throw new Error('Failed to fetch trending movies');
    }

    const trendingData = await trendingResponse.json();

    trendingContainer.innerHTML = '';

    // Only show the first 5 trending movies
    trendingData.results.slice(0, 5).forEach(movie => {
      const card = document.createElement('article');
      card.classList.add('movie-card');

      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'images/no-poster.jpg';

      card.innerHTML = `
        <img src="${poster}" alt="${movie.title} poster">
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p>⭐ ${movie.vote_average.toFixed(1)}</p>
          <p>${movie.release_date ? movie.release_date.slice(0, 4) : 'Unknown'}</p>
        </div>
      `;

      trendingContainer.appendChild(card);
    });

    // Random "Movie of the Week"
    const randomMovie =
      trendingData.results[
        Math.floor(Math.random() * trendingData.results.length)
      ];

    const randomPoster = randomMovie.poster_path
      ? `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`
      : 'images/no-poster.jpg';

    randomMovieContainer.innerHTML = `
      <article class="movie-card">
        <img src="${randomPoster}" id="ranimg" alt="${randomMovie.title} poster">

        <div class="movie-info">
          <h3>${randomMovie.title}</h3>
          <p>${randomMovie.release_date ? randomMovie.release_date.slice(0, 4) : 'Unknown Year'}</p>
          <p>⭐ ${randomMovie.vote_average.toFixed(1)}</p>
          <p>${randomMovie.overview.slice(0, 120)}...</p>
        </div>
      </article>
    `;
  } catch (error) {
    trendingContainer.innerHTML = '<p>Unable to load trending movies.</p>';
    randomMovieContainer.innerHTML = '<p>Unable to load movie of the week.</p>';
    console.error(error);
  }
}

loadMovies();