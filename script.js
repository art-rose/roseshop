const products = [
  {
    id: 1,
    name: "Emballage Rouge",
    price: 12,
    image: "images/Rouge.jpg"
  },
  {
    id: 2,
    name: "Emballage Blanc",
    price: 18,
    image: "images/Blanc.jpg"
  },
  {
    id: 3,
    name: "Emballage Noir",
    price:18,
    image: "images/Noir.jpg"
  }
   {
    id: 4,
    name: "Emballage Blue",
    price: 18,
    image: "images/Blue.jpg"
  }
];

// حاوية المنتجات
const productContainer = document.getElementById("products");

// عرض المنتجات
products.forEach(p => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>السعر: ${p.price} د</p>
    <button onclick="addToCart(${p.id})">أضف إلى السلة</button>
  `;
  productContainer.appendChild(div);
});

// دالة بسيطة لإضافة المنتج للسلة
function addToCart(id) {
  const product = products.find(p => p.id === id);
  alert(`تمت إضافة "${product.name}" إلى السلة ✅`);
}

