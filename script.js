// Exemple produits (tu peux remplacer par Firebase plus tard)
const products = [
  { name: "Rose Rouge", price: "15 TND", img: "images/rose-rouge.jpg" },
  { name: "Rose Blanche", price: "12 TND", img: "images/rose-blanche.jpg" },
  { name: "Rose Rose", price: "10 TND", img: "images/rose-rose.jpg" },
  { name: "Emballage Noir", price: "5 TND", img: "images/emballage-noir.jpg" }
];

const productList = document.getElementById("product-list");

products.forEach(p => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>${p.price}</p>
    <button onclick="order('${p.name}')">Commander</button>
  `;
  productList.appendChild(div);
});

function order(productName) {
  alert("Vous avez commandé : " + productName);
}