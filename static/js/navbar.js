// Profile menu
const userButton = document.querySelector("#user-menu-button");
const menu = document.querySelector('[role="menu"]');

userButton.addEventListener("click", () => {
  menuController(menu);
});

menu.addEventListener("mouseleave", () => {
  menuController(menu);
});

function menuController(element) {
  if (!element.classList.contains("hidden")) {
    element.classList.remove(
      "ease-out",
      "duration-200",
      "scale-100",
      "opacity-100",
    );
    element.classList.add("ease-in", "duration-75", "scale-95", "opacity-0");

    setTimeout(() => {
      element.classList.add("hidden");
      element.classList.remove("absolute");
    }, 300);
    return;
  }
  element.classList.remove("hidden");
  element.classList.add("absolute", "transform", "transition");
  element.classList.remove("ease-in", "duration-75", "scale-95", "opacity-0");
  element.classList.add("ease-out", "duration-200", "scale-100", "opacity-100");
}
