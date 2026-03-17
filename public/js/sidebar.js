const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebarOverlay");

/* SIDEBAR TOGGLE */

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

/* ACTIVE LINK FROM URL */

const currentPage = window.location.pathname.split("/").pop();
const navItems = document.querySelectorAll(".sidebar-nav .nav-item");

navItems.forEach((item) => {
  const link = item.getAttribute("href");

  if (link === currentPage) {
    item.classList.add("active");
  }
});
