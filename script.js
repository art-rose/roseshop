const API_URL = "http://localhost:1337/api/products?populate=*";

async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const container = document.getElementById("products-container");
    container.innerHTML = "";

    data.data.forEach(product => {
      const name = product.attributes.name;
      const description = product.attributes.description || "";
      const price = product.attributes.price || "غير متوفر";
      const imgUrl = product.attributes.image?.data
        ? "http://localhost:1337" + product.attributes.image.data.attributes.url
        : "https://via.placeholder.com/300x200?text=No+Image";

      container.innerHTML += `
        <div class="product">
          <img src="${imgUrl}" alt="${name}">
          <h3>${name}</h3>
          <p>${description}</p>
          <p class="price">السعر: ${price} د.ت</p>
          <button>🛒 أضف إلى السلة</button>
        </div>
      `;
    });
  } catch (error) {
    console.error("❌ خطأ في جلب المنتجات:", error);
  }
}

fetchProducts();