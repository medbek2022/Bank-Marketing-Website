"use strict";

// **************** Selecting Elements *****************
const header = document.getElementById("header");
const scrolToBtn = header.querySelector(".link");
const section1 = document.getElementById("section_1");
const tabs_container = document.querySelector(".tabs_container");
const tabs = document.querySelectorAll(".tab_item");
const contents = document.querySelectorAll(".tab_content");
const navbar = document.getElementById("navbar");
const navbarItems = navbar.querySelector(".navbar_items");
const nav_container = navbar.querySelector(".nav_container");
const arrowRight = document.querySelector(".arrow_btn_right");
const arrowLeft = document.querySelector(".arrow_btn_left");
const allSlides = document.querySelectorAll(".slide");
const threeDots = document.querySelector(".threeDots");

// **************** header link *****************
scrolToBtn.addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

// *************** navbar links ****************

navbarItems.addEventListener("click", function (e) {
  e.preventDefault();
  const linkClicked = e.target;
  if (linkClicked.classList.contains("nav_link")) {
    const id = linkClicked.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// ************** Three Tabs Componenet **************
tabs_container.addEventListener("click", function (e) {
  const clicked = e.target;

  if (!e.target.classList.contains("tab_item")) return;
  // remove the active class from the actuel actived tab
  tabs.forEach(function (el) {
    el.classList.remove("tab_item_active");
  });
  // add the active class to the target element
  clicked.classList.add("tab_item_active");
  // remove the active class from the tab_content
  contents.forEach(function (el) {
    el.classList.remove("tab_content--active");
  });
  // add the active class to the the appropriate tab content element
  document
    .querySelector(`.tab_content--${clicked.dataset.tab}`)
    .classList.add("tab_content--active");
});

// ************** Add Effect to Navbar **************
const handleHover = function (e) {
  if (e.target.classList.contains("nav_link")) {
    const linkOvered = e.target;
    const otherLinks = linkOvered
      .closest(".right_block")
      .querySelectorAll(".nav_link");
    const logo = linkOvered
      .closest(".nav_container")
      .querySelector(".navbar_logo");

    otherLinks.forEach((el) => {
      if (el !== e.target) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// bind method used to pass an argument to our handle function, this = argument
nav_container.addEventListener("mouseover", handleHover.bind(0.5));
nav_container.addEventListener("mouseout", handleHover.bind(1));

// ************** Add the Sticky Navbar **************
const section1_cordination = section1.getBoundingClientRect();
window.addEventListener("scroll", function () {
  if (window.scrollY > section1_cordination.top)
    nav_container.classList.add("sticky");
  else nav_container.classList.remove("sticky");
});

// ***************** Slider Effect *******************
let currentSlide = 0;

// Set the TranslateX to all slides, based on the index to push them away
allSlides.forEach(function (slide, index) {
  slide.style.transform = `translateX(${index * 200}%)`;
});
const moveSlide = function (currentSlide) {
  allSlides.forEach(function (slide, index) {
    slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
  });
  activeDot(currentSlide + 1);
};

// this function active a dot
const activeDot = function (current) {
  // remove the class dot_active from the previous active dot and the set it again to the appropriate dot.
  threeDots.querySelectorAll(".dot").forEach(function (dot) {
    if (dot.classList.contains("dot_active")) {
      dot.classList.remove("dot_active");
    }
    if (Number(dot.dataset.slide) === current) {
      dot.classList.add("dot_active");
    }
  });
};

// This Function Treat the both events, it does'nt matter which ArrowButton was clicked
const treatEvent = function (rightArrowClicked) {
  if (rightArrowClicked) {
    currentSlide++;
    if (currentSlide == allSlides.length) currentSlide = 0;
  } else {
    currentSlide--;
    if (currentSlide == -1) currentSlide = allSlides.length - 1;
  }
  moveSlide(currentSlide);
};
// Right Arrow clicked
arrowRight.addEventListener("click", function () {
  treatEvent(true);
});
// left Arrow clicked
arrowLeft.addEventListener("click", function () {
  treatEvent(false);
});

// Three Dots Event using Event Delegation
threeDots.addEventListener("click", function (e) {
  // we Treat the event just if the clicked element (Target) contains 'dot' class,otherwise we ignone the event
  const clicked = e.target;
  const clicked_SlideNr = e.target.dataset.slide;
  if (clicked.classList.contains("dot")) {
    moveSlide(clicked.dataset.slide - 1);
  }
  activeDot(Number(clicked_SlideNr));
});
