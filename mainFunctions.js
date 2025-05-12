document.addEventListener("DOMContentLoaded", () => {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const parent = this.closest('.filter-dropdown');
        parent.classList.toggle('open');
      });
    });
  
    document.addEventListener('click', function (e) {
      document.querySelectorAll('.filter-dropdown').forEach(drop => {
        if (!drop.contains(e.target)) {
          drop.classList.remove('open');
        }
      });
    });
  });

const header = document.querySelector("header");
const breadcrumbs = document.querySelector("#breadcrumbs");

const observer = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];
    if (!entry.isIntersecting) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  },
  {
    root: null,
    threshold: 0,
  }
);

observer.observe(breadcrumbs);


const toggleBtn = document.getElementById('menu-toggle');
const closeBtn = document.getElementById('menu-close');
const sideMenu = document.getElementById('side-menu');

toggleBtn.addEventListener('click', () => {
  sideMenu.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('show');
});
