import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDbEHFvX2fzhCwpZZAyGW2IGcudRZ_SV-w",
  authDomain: "roseshop-9471d.firebaseapp.com",
  projectId: "roseshop-9471d",
  storageBucket: "roseshop-9471d.firebasestorage.app",
  messagingSenderId: "291783054639",
  appId: "1:291783054639:web:0628582f9f4f41a8bb3dda",
  measurementId: "G-FP7CWDFGP2"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Produits
const products = [
  {name:"Emballage Noir", price:18, image:"https://raw.githubusercontent.com/mahdi/roseshop/main/noir.jpg", color:"Noir"},
  {name:"Emballage Blanc", price:18, image:"https://raw.githubusercontent.com/mahdi/roseshop/main/blanc.jpg", color:"Blanc"},
  {name:"Emballage Rouge", price:18, image:"https://raw.githubusercontent.com/mahdi/roseshop/main/rouge.jpg", color:"Rouge"},
  {name:"Emballage Bleu", price:20, image:"https://raw.githubusercontent.com/mahdi/roseshop/main/bleu.jpg", color:"Bleu"}
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

// Ajouter au panier
function addToCart(name, price){
  cart.push({name, price});
  total += price;
  saveCart(); updateCart();
}

// Mise à jour panier
function updateCart(){
  const cartItems=document.getElementById('cart-items');
  cartItems.innerHTML='';
  cart.forEach((item,index)=>{
    const li=document.createElement('li');
    li.textContent=`${item.name} - ${item.price} D`;
    const removeBtn=document.createElement('button');
    removeBtn.textContent='❌';
    removeBtn.onclick=()=>{ removeFromCart(index); };
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
  const tva=total*0.19;
  document.getElementById('total').textContent=total.toFixed(2);
  document.getElementById('tva').textContent=tva.toFixed(2);
  document.getElementById('grand-total').textContent=(total+tva).toFixed(2);
}

// Supprimer du panier
function removeFromCart(index){
  total -= cart[index].price;
  cart.splice(index,1);
  saveCart(); updateCart();
}

// Sauvegarde panier
function saveCart(){
  localStorage.setItem('cart',JSON.stringify(cart));
  localStorage.setItem('total',total);
}

// Afficher produits
function displayProducts(list){
  const productList=document.getElementById('product-list');
  productList.innerHTML='';
  list.forEach(p=>{
    const div=document.createElement('div');
    div.className='product';
    div.innerHTML=`
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price} D</p>
      <button onclick="addToCart('${p.name}',${p.price})">Ajouter au Panier</button>
    `;
    productList.appendChild(div);
  });
}
window.addToCart = addToCart;

// Filtrer
function filterProducts() {
  const searchText=document.getElementById('search').value.toLowerCase();
  const priceVal=document.getElementById('price-filter').value;
  const colorVal=document.getElementById('color-filter').value;
  const sortVal=document.getElementById('sort-filter').value;

  let filtered=products.filter(p => p.name.toLowerCase().includes(searchText));
  if(priceVal){
    const [min,max]=priceVal.split('-').map(Number);
    filtered=filtered.filter(p => p.price >= min && p.price <= max);
  }
  if(colorVal){ filtered=filtered.filter(p => p.color===colorVal); }
  if(sortVal){
    if(sortVal==='price-asc') filtered.sort((a,b)=>a.price-b.price);
    else if(sortVal==='price-desc') filtered.sort((a,b)=>b.price-a.price);
    else if(sortVal==='name-asc') filtered.sort((a,b)=>a.name.localeCompare(b.name));
    else if(sortVal==='name-desc') filtered.sort((a,b)=>b.name.localeCompare(a.name));
  }
  displayProducts(filtered);
}

document.getElementById('search').addEventListener('input', filterProducts);
document.getElementById('price-filter').addEventListener('change', filterProducts);
document.getElementById('color-filter').addEventListener('change', filterProducts);
document.getElementById('sort-filter').addEventListener('change', filterProducts);

// Commander
document.getElementById('checkout').addEventListener('click', async ()=>{
  if(cart.length===0){ alert("Votre panier est vide !"); return; }
  const name=prompt("Entrez votre Nom:");
  const phone=prompt("📞 Entrez votre Téléphone:");
  const address=prompt("📍 Entrez votre Adresse:");

  if(!name || !phone || !address){
    alert("Vous devez remplir tous les champs !");
    return;
  }

  try {
    await addDoc(collection(db, "clients"), {
      name, phone, address,
      cart, total,
      date:new Date().toLocaleString()
    });
    alert("✅ Commande enregistrée avec succès !");
    cart=[]; total=0; saveCart(); updateCart();
  } catch(err){
    console.error("❌ Erreur:", err);
    alert("Une erreur est survenue !");
  }
});

// Vider panier
document.getElementById('clear-cart').addEventListener('click',()=>{
  cart=[]; total=0; saveCart(); updateCart();
});

// Admin
document.getElementById("admin-login").addEventListener("click", async ()=>{
  const password=prompt("Entrez le mot de passe Admin:");
  if(password==="12345"){ // changer le mot de passe
    document.getElementById("clients-section").style.display="block";
    loadClients();
  } else {
    alert("❌ Mot de passe incorrect !");
  }
});

// Charger clients
async function loadClients(){
  const querySnapshot=await getDocs(collection(db,"clients"));
  const clientsList=document.getElementById("clients-list");
  clientsList.innerHTML="";
  querySnapshot.forEach(d=>{
    const c=d.data();
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.address}</td>
      <td>${c.cart.length}</td>
      <td>${c.total} D</td>
      <td>${c.date}</td>
      <td><button onclick="deleteClient('${d.id}')">🗑️ Supprimer</button></td>
    `;
    clientsList.appendChild(tr);
  });
}

// Supprimer client
window.deleteClient = async function(id){
  if(confirm("Voulez-vous supprimer ce client ?")){
    await deleteDoc(doc(db,"clients",id));
    loadClients();
  }
}

// Initialiser
window.onload=()=>{ filterProducts(); updateCart(); }
