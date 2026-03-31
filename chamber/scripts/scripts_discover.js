import { places } from '../data/data/places.mjs';

const grid = document.querySelector('#discover-grid');
const visitMessage = document.querySelector('#visit-message');

places.forEach(place => {
  const card = document.createElement('article');
  card.classList.add('discover-card');

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="${place.image}" alt="${place.alt}" loading="lazy" width="300" height="200">
    </figure>
    <div class="discover-card-content">
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button>Learn More</button>
    </div>
  `;

  grid.appendChild(card);
});

const lastVisit = localStorage.getItem('lastVisit');
const currentVisit = Date.now();

if (!lastVisit) {
  visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
} else {
  const difference = currentVisit - Number(lastVisit);
  const daysBetween = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (daysBetween < 1) {
    visitMessage.textContent = 'Back so soon! Awesome!';
  } else if (daysBetween === 1) {
    visitMessage.textContent = 'You last visited 1 day ago.';
  } else {
    visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
  }
}

localStorage.setItem('lastVisit', currentVisit);

document.getElementById('lastModified').textContent = document.lastModified;