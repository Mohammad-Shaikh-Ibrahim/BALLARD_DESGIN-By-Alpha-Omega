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

    const categoriesHTML = categories
      .map((category) => {
        return `
          <div class="category">
            <img src="${category.image}" alt="${category.name}">
            <a href="#">${category.name}</a>
          </div>
        `;
      })
      .join("");

    document.getElementById("categories").innerHTML = categoriesHTML;

    // Products
    const container = document.getElementById("productContainer");

    const cards = data.products.map((product) => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img class="main-img" src="${product.image}" alt="${product.name}">
        <div class="new-label">${product.isNew}</div>
        <div class="thumbnails">
          ${product.images
            .map((img) => `<img src="${img}" alt="Thumbnail">`)
            .join("")}
        </div>
        <div class="title">${product.name}</div>
        <div class="old-price">${product.oldPrice}</div>
        <div class="new-price">Sale ${product.newPrice}</div>
      `;

      return card;
    });

    cards.forEach((card) => container.appendChild(card));
  })
  .catch((error) => console.error("Error:", error));
