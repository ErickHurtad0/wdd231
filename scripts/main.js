const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("primaryNav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.textContent = isOpen ? "✕" : "☰";
  menuButton.setAttribute("aria-expanded", isOpen);
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    nav.classList.remove("open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
  }
});

document.getElementById("currentYear").textContent =
  new Date().getFullYear();

document.getElementById("lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

const courses = [
  {
    code: "WDD130",
    name: "Web Fundamentals",
    credits: 2,
    subject: "WDD",
    completed: true
  },
  {
    code: "WDD131",
    name: "Dynamic Web Fundamentals",
    credits: 2,
    subject: "WDD",
    completed: true
  },
  {
    code: "WDD231",
    name: "Frontend Web Development",
    credits: 2,
    subject: "WDD",
    completed: false
  },
  {
    code: "CSE110",
    name: "Programming Building Blocks",
    credits: 2,
    subject: "CSE",
    completed: true
  },
  {
    code: "CSE111",
    name: "Programming with Functions",
    credits: 2,
    subject: "CSE",
    completed: true
  },
  {
    code: "CSE210",
    name: "Programming with Classes",
    credits: 2,
    subject: "CSE",
    completed: true
  }
];


const courseContainer = document.getElementById("courses");
const totalCreditsEl = document.getElementById("totalCredits");
const filterButtons = document.querySelectorAll(".course-controls button");


function renderCourses(courseArray) {

  courseContainer.innerHTML = "";

  courseArray.forEach(course => {

    const card = document.createElement("div");
    card.classList.add("course-card");

    if (course.completed) {
      card.classList.add("completed");
      card.innerHTML = `✓ ${course.code}`;
    } else {
      card.textContent = course.code;
    }

    courseContainer.appendChild(card);
  });

  const totalCredits = courseArray.reduce((sum, course) => sum + course.credits, 0);

  totalCreditsEl.textContent = `Total Credits: ${totalCredits}`;
}

renderCourses(courses);

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const filter = button.dataset.filter;

    if (filter === "all") {
      renderCourses(courses);
    } else {
      const filteredCourses = courses.filter(course =>
        course.subject.toLowerCase() === filter
      );
      renderCourses(filteredCourses);
    }

  });

});