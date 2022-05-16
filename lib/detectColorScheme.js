export default function detectColorScheme() {
  var theme = "light"; //default to light

  //local storage is used to override OS theme settings
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") == "dark") {
      theme = "dark";
    }
  } else if (!window.matchMedia) {
    //matchMedia method not supported && no stored theme - set theme in local storage
    localStorage.setItem("theme", "light");
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //OS theme setting detected as dark - set local theme to dark
    localStorage.setItem("theme", "dark");
    theme = "dark";
  }

  //return detected theme
  return theme;
}
