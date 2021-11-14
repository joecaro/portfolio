export default function handledRedirect(router, route) {
  let cover = document.getElementById("cover");
  cover.classList.remove("cover-inactive");
  cover.classList.add("cover-transition");
  setTimeout(() => {
    cover.classList.remove("cover-transition");
    cover.classList.add("cover-active");
    router.push(route);
  }, 800);
}
