"use strict";

const themeBtn =
  document.getElementById("themeBtn");


function applyTheme(theme) {

  document.documentElement
    .setAttribute(
      "data-theme",
      theme
    );


  if (theme === "dark") {

    themeBtn.textContent = "☀️";

    themeBtn.title =
      "Switch to light mode";

  } else {

    themeBtn.textContent = "🌙";

    themeBtn.title =
      "Switch to dark mode";
  }
}


const savedTheme =
  localStorage.getItem("theme");


if (
  savedTheme === "dark" ||
  savedTheme === "light"
) {

  applyTheme(savedTheme);

} else {

  const prefersDark =
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

  applyTheme(
    prefersDark
      ? "dark"
      : "light"
  );
}


themeBtn.addEventListener(
  "click",
  () => {

    const current =
      document.documentElement
        .getAttribute("data-theme");


    const next =
      current === "dark"
        ? "light"
        : "dark";


    applyTheme(next);


    localStorage.setItem(
      "theme",
      next
    );
  }
);
