const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

const openDrawer = () => {
  drawer.style.transform = "translateX(0)";
  overlay.style.display = "unset";
};

export const closeDrawer = () => {
  drawer.style.transform = "translateX(-100%)";
  overlay.style.display = "none";
};

window.openDrawer = openDrawer;

openDrawer();

overlay.addEventListener("click", () => {
  closeDrawer();
});
