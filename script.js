// ✅ Firebase Config (ضع config الخاص بك من Firebase)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Init Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const products = [
  { name: "Emballage Noir", price: 18, img: "https://via.placeholder.com/100x100/000000/ffffff?text=Noir" },
  { name: "Emballage Blanc", price: 18, img: "https://via.placeholder.com/100x100/fafafa/000000?text=Blanc" },
  { name: "Emballage Rouge", price: 18, img: "https://via.placeholder.com/100x100/ff0000/ffffff?text=Rouge" },
  { name: "Emballage Bleu", price: 20, img: "https://via.placeholder.com/100x100/0000ff/ffffff?text=Bleu" }
];

let cart = [];
let total = 0;

function renderProducts() {
  const container = document.getElementById("products");
  products.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price} €</p>
      <button onclick="addToCart(${i})">Ajouter au panier</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(i) {
  cart.push(products[i]);
  total += products[i].price;
  document.getElementById("total").innerText = "Total : " + total + " €";
}

function validerCommande() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if (!name || !phone || !address || cart.length === 0) {
    alert("⚠️ Veuillez remplir tous les champs et ajouter des produits !");
    return;
  }

  db.collection("commandes").add({
    nom: name,
    telephone: phone,
    adresse: address,
    produits: cart,
    total: total,
    date: new Date()
  }).then(() => {
    alert("✅ Commande validée avec succès !");
    cart = [];
    total = 0;
    document.getElementById("total").innerText = "Total : 0 €";
  });
}

renderProducts();
