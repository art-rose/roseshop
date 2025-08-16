const products = [
  {
    id: 1,
    name: "ورد أحمر",
    price: 50,
    image: "images/rose-red.jpg"
  },
  {
    id: 2,
    name: "ورد أبيض",
    price: 40,
    image: "images/rose-white.jpg"
  },
  {
    id: 3,
    name: "باقة ورد ملونة",
    price: 120,
    image: "images/bouquet.jpg"
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
