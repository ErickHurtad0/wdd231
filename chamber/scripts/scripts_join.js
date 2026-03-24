document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("timestamp").value = new Date().toISOString();
});

const modalButtons = document.querySelectorAll("[data-modal]");
modalButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = document.getElementById(btn.dataset.modal);
    modal.showModal();
  });
});

const closeButtons = document.querySelectorAll(".close");
closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest("dialog").close();
  });
});

const date = document.querySelector("#currentyear")
document.getElementById("lastModified").textContent = document.lastModified;