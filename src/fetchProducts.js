let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  const resultsCountElement = document.getElementById("resultsCount");
  const appliedFiltersContainer = document.getElementById("appliedFilters");
  const resetFiltersButton = document.getElementById("resetFiltersButton");

  fetch("data.json")
    .then((res) => res.json())
    .then(({ products }) => {
      allProducts = products;
      initialize();
    })
    .catch((err) => console.error("Error fetching data:", err));

  function initialize() {
    renderProducts(allProducts);
    updateResultsCount(allProducts.length);
    updateResetButtonVisibility();
    bindCheckboxEvents();
    bindResetButton();
  }

  function bindCheckboxEvents() {
    const checkboxes = document.querySelectorAll('#priceFilters input[type="checkbox"]');
    checkboxes.forEach((checkbox) =>
      checkbox.addEventListener("change", handleFilterChange)
    );
  }

  function handleFilterChange() {
    const filtered = filterProductsByPrice();
    renderProducts(filtered);
    updateResultsCount(filtered.length);
    updateAppliedFilters();
    updateResetButtonVisibility();
  }

  function bindResetButton() {
    if (!resetFiltersButton) {
      return console.warn("Reset Filters button not found.");
    }

    resetFiltersButton.addEventListener("click", () => {
      const checkboxes = document.querySelectorAll('#priceFilters input[type="checkbox"]');
      checkboxes.forEach((cb) => (cb.checked = false));
      renderProducts(allProducts);
      updateResultsCount(allProducts.length);
      updateAppliedFilters();
      updateResetButtonVisibility();
    });
  }

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
          ${product.images.map((img) => `<img class="thumbnail" src="${img}" alt="Thumbnail">`).join("")}
        </div>
        <div class="title">${product.name}</div>
        <div class="old-price">${product.oldPrice}</div>
        <div class="new-price">Sale ${product.newPrice}</div>
      `;

      setupImageHover(productCard, product.image);
      container.appendChild(productCard);
    });
  }

  function setupImageHover(card, originalSrc) {
    const mainImg = card.querySelector(".main-img");
    const thumbnails = card.querySelectorAll(".thumbnail");

    thumbnails.forEach((thumb) => {
      thumb.addEventListener("mouseover", () => (mainImg.src = thumb.src));
      thumb.addEventListener("mouseleave", () => (mainImg.src = originalSrc));
    });
  }

  function filterProductsByPrice() {
    const checked = document.querySelectorAll('#priceFilters input[type="checkbox"]:checked');
    const selectedRanges = Array.from(checked).map((cb) => cb.value);

    if (selectedRanges.length === 0) return allProducts;

    return allProducts.filter((product) => {
      const price = parseFloat(product.newPrice.replace("$", ""));
      return selectedRanges.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return price >= min && price <= max;
      });
    });
  }

  function updateResultsCount(count) {
    if (resultsCountElement) {
      resultsCountElement.textContent = `${count} Results`;
    }
  }

  function updateAppliedFilters() {
    appliedFiltersContainer.innerHTML = "";

    const checkboxes = document.querySelectorAll('#priceFilters input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
      const tag = document.createElement("div");
      tag.classList.add("filter-tag");

      const text = document.createElement("span");
      text.textContent = `$${checkbox.value.replace("-", " - $")}`;

      const removeBtn = document.createElement("span");
      removeBtn.textContent = "x";
      removeBtn.classList.add("remove-filter");

      removeBtn.addEventListener("click", () => {
        checkbox.checked = false;
        handleFilterChange();
      });

      tag.appendChild(text);
      tag.appendChild(removeBtn);
      appliedFiltersContainer.appendChild(tag);
    });
  }

  function updateResetButtonVisibility() {
    const checked = document.querySelectorAll('#priceFilters input[type="checkbox"]:checked');
    resetFiltersButton.style.display = checked.length > 0 ? "block" : "none";
  }
});
