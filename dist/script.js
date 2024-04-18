"use strict";

//****************** Sctipt Start ******************
//---Header---
const header = document.getElementById("header");
const scrolToBtn = header.querySelector(".link");
//---section 1---
const section1 = document.getElementById("section_1");

// ****************** Sctipt Start ******************
// ---Smooth Scroling---
scrolToBtn.addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});
