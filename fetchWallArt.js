fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Breadcrumbs
    const breadcrumbs = data.wallArt.breadcrumbs;
    const breadcrumbHTML = breadcrumbs
      .map((item, index) =>
        index === breadcrumbs.length - 1
          ? `<a id="basePosition" href="#">${item}</a>`
          : `<a class="bold" href="#">${item}</a>`
      )
      .join(" > ");
    document.getElementById("breadcrumbs").innerHTML = breadcrumbHTML;

    // Categories 
    const categoriesHTML = data.wallArt.categories
      .map(
        (category) => `
        <div class="category">
          <img src="${category.image}" alt="${category.name}">
          <a href="#">${category.name}</a>
        </div>
      `
      )
      .join("");
    document.getElementById("categories").innerHTML = categoriesHTML;
  })
  .catch((error) => console.error("Error:", error));

