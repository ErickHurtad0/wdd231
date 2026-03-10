const url = "data/members.json";

document.addEventListener("DOMContentLoaded", () => {

const container = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

async function getMembers() {
  try {

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const data = await response.json();

    displayMembers(data.members); 

  } catch (error) {
    console.error("Error loading members:", error);
  }
}


function displayMembers(members) {

  container.innerHTML = "";

  members.forEach(member => {

    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;

    container.appendChild(card);

  });

}

gridButton.addEventListener("click", () => {
  container.classList.add("grid");
  container.classList.remove("list");
});

listButton.addEventListener("click", () => {
  container.classList.add("list");
  container.classList.remove("grid");
});


getMembers();

});



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

document.getElementById("year").textContent =
new Date().getFullYear();

document.getElementById("lastModified").textContent =
"Last Modification: " + document.lastModified;