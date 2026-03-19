const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("primaryNav");

menuButton.addEventListener("click", () => {

nav.classList.toggle("open");

menuButton.textContent =
nav.classList.contains("open") ? "✖" : "☰";

});

window.addEventListener("resize", () => {

if (window.innerWidth > 768) {
nav.classList.remove("open");
menuButton.textContent = "☰";
}

});


const myDescription = document.querySelector('#weather-desc');
const myTemperature = document.querySelector('#current-temp');
const myForecast = document.querySelector('#forecast');

const myKey = "101fb8abaadc4c77473b26bd3a657be2";
const myLat = "19.4326";   
const myLong = "-99.1332"; 

const myURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&units=metric&appid=${myKey}`;

async function apiFetch() {
  try {
    const response = await fetch(myURL);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }

  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {

  myTemperature.innerHTML = `${data.list[0].main.temp}°C`;
  myDescription.innerHTML = data.list[0].weather[0].description;

  myForecast.innerHTML = "";

  for (let i = 8; i <= 24; i += 8) {
    const temp = data.list[i].main.temp;

    const p = document.createElement("p");
    p.textContent = `Day ${i / 8}: ${temp}°C`;

    myForecast.appendChild(p);
  }
}

apiFetch();

const spotlightContainer = document.getElementById("spotlight-container");

async function getSpotlights() {
    const response = await fetch("data/members.json");
    const data = await response.json();

    const filtered = data.members.filter(member =>
        member.membership === 2 ||
        member.membership === 3
    );
    const shuffled = filtered.sort(() => 0.5 - Math.random());

    const selected = shuffled.slice(0, 3);

    selected.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name}">
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p>${member.membership}</p>
        `;

        spotlightContainer.appendChild(card);
    });
}

getSpotlights();




const date = document.querySelector("#currentyear")
document.getElementById("lastModified").textContent = document.lastModified;