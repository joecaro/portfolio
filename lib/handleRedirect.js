export default function handledRedirect(router, route) {
  let cover = document.getElementById("cover");
  cover.classList.remove("cover-inactive");
  cover.classList.add("cover-active");
  setTimeout(() => {
    router.push(route);
  }, 800);
}
