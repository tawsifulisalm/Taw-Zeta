/* Place your JavaScript in this file */

//Loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-con");

  console.log("LOADED NOW!!!");

  setTimeout(() => {
    console.log("BUT DISAPPEARED NOW!!!");
    loader.classList.add("hidden");
  }, 1000);
});

// toggle icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// scroll sections
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      // active navbar links
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });

      // Active Sections For Animation On Scroll
      sec.classList.add("show-animate");
    }

    // If Want To Use Animation That Repeats On Scroll Use This
    else {
      sec.classList.remove("show-animate");
    }
  });

  // sticky header
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  // Remove toggle icon and navbar when click navbar links (scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// Homepage Spidermna Dots

let banner = document.getElementById("home");
let canvas = document.getElementById("dotsCanvas");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const ctx = canvas.getContext("2d");

let dots = [];
let arrayColors = ["#eee", "#545454", "#596d91", "#bb5a68", "#696541"];

for (let index = 0; index < 50; index++) {
  dots.push({
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    size: Math.random() * 3 + 5,
    color: arrayColors[Math.floor(Math.random() * 5)],
  });
}

const drawDots = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach((dot) => {
    ctx.fillStyle = dot.color;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
    ctx.fill();
  });
};

drawDots();

let animationFrameId;
let lastMouse = null;

const handleInteraction = (event) => {
  if (event.touches) {
    // Mobile touch event
    const touch = event.touches[0];
    lastMouse = {
      x: touch.pageX - banner.getBoundingClientRect().left,
      y: touch.pageY - banner.getBoundingClientRect().top,
    };
  } else {
    // Mouse event
    lastMouse = {
      x: event.pageX - banner.getBoundingClientRect().left,
      y: event.pageY - banner.getBoundingClientRect().top,
    };
  }

  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(drawInteraction);
  }
};

const drawInteraction = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDots();

  if (lastMouse) {
    dots.forEach((dot) => {
      let distance = Math.sqrt(
        (lastMouse.x - dot.x) ** 2 + (lastMouse.y - dot.y) ** 2
      );

      if (distance < 300) {
        ctx.strokeStyle = dot.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(lastMouse.x, lastMouse.y);
        ctx.stroke();
      }
    });
  }

  animationFrameId = null;
};

banner.addEventListener("mousemove", handleInteraction);
banner.addEventListener("touchmove", handleInteraction);

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDots();
  lastMouse = null;
};

banner.addEventListener("mouseout", clearCanvas);
banner.addEventListener("touchend", clearCanvas);
banner.addEventListener("touchcancel", clearCanvas);
