fetch("data.json")
  .then((response) => response.json())
  // breadcrumbs
  .then((data) => {
    const breadcrumbs = data.wallArt.breadcrumbs;

    const breadcrumbHTML = breadcrumbs
      .map((item, index) => {
        if (index === breadcrumbs.length - 1) {
          return `<a id="basePosition" href="#">${item}</a>`;
        } else {
          return `<a class="bold" href="#">${item}</a>`;
        }
      })
      .join(" > ");

    document.getElementById("breadcrumbs").innerHTML = breadcrumbHTML;

    // Categories
    const categories = data.wallArt.categories;

    const categoriesHTML = categories.map(category => {
        return `
          <div class="category">
            <img src="${category.image}" alt="${category.name}">
            <a href="#">${category.name}</a>
          </div>
        `;
      }).join("");

      document.getElementById("categories").innerHTML = categoriesHTML;
  })
  .catch((error) => console.error("Error:", error));
