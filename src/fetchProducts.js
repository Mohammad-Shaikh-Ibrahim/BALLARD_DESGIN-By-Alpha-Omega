let allProducts = [];
const resultsCountElement = document.getElementById("resultsCount");
const appliedFiltersContainer = document.getElementById("appliedFilters"); // Get the container

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    allProducts = data.products;
    renderProducts(allProducts);
    updateResultsCount(allProducts.length);

    const checkboxes = document.querySelectorAll('#priceFilters input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const filteredProducts = filterProductsByPrice();
        renderProducts(filteredProducts);
        updateResultsCount(filteredProducts.length);
        updateAppliedFilters(); // Update the displayed filter tags
      });
    });
  })
  .catch((error) => console.error("Error loading JSON data:", error));

function renderProducts(products) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
      <img class="main-img" src="${product.image}" alt="${product.name}">
      <div class="new-label">${product.isNew ? "New" : ""}</div>
      <div class="thumbnails">
        ${product.images
          .map((img) => `<img class="thumbnail" src="${img}" alt="Thumbnail">`)
          .join("")}
      </div>
      <div class="title">${product.name}</div>
      <div class="old-price">${product.oldPrice}</div>
      <div class="new-price">Sale ${product.newPrice}</div>
    `;

    const mainImg = productCard.querySelector(".main-img");
    const thumbnails = productCard.querySelectorAll(".thumbnail");
    const originalSrc = product.image;

    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("mouseover", () => {
        mainImg.src = thumbnail.src;
      });
      thumbnail.addEventListener("mouseleave", () => {
        mainImg.src = originalSrc;
      });
    });

    container.appendChild(productCard);
  });
}

function filterProductsByPrice() {
  const checkboxes = document.querySelectorAll('#priceFilters input[type="checkbox"]:checked');
  const selectedRanges = Array.from(checkboxes).map((cb) => cb.value);

  if (selectedRanges.length === 0) {
    return allProducts;
  }

  const filtered = allProducts.filter((product) => {
    const price = parseFloat(product.newPrice.replace("$", ""));
    return selectedRanges.some((range) => {
      const [min, max] = range.split("-").map(Number);
      return price >= min && price <= max;
    });
  });

  return filtered;
}

function updateResultsCount(count) {
  if (resultsCountElement) {
    resultsCountElement.textContent = `${count} Results`;
  } else {
    console.warn("Results count element not found in the HTML.");
  }
}

function updateAppliedFilters() {
  appliedFiltersContainer.innerHTML = ""; // Clear previous filters

  const priceCheckboxes = document.querySelectorAll('#priceFilters input[type="checkbox"]:checked');
  priceCheckboxes.forEach((checkbox) => {
    const filterValue = checkbox.value;
    const filterTag = document.createElement("div");
    filterTag.classList.add("filter-tag"); // You'll need to style this class

    const filterText = document.createElement("span");
    filterText.textContent = `$${filterValue.replace("-", " - $")} `; // Format the price range

    const removeButton = document.createElement("span");
    removeButton.textContent = "x";
    removeButton.classList.add("remove-filter"); 
    removeButton.addEventListener("click", () => {
      checkbox.checked = false;
      const filteredProducts = filterProductsByPrice(); 
      renderProducts(filteredProducts); 
      updateResultsCount(filteredProducts.length); 
      updateAppliedFilters(); 
    });

    filterTag.appendChild(filterText);
    filterTag.appendChild(removeButton);
    appliedFiltersContainer.appendChild(filterTag);
  });


}