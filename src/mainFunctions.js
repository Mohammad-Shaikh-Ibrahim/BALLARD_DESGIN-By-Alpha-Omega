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
  