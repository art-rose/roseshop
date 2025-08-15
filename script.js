// Produits
const products = [
  {name:"Emballage Noir", price:18, image:"images/noir.jpg", class:"titre-noir"},
  {name:"Emballage Blanc", price:18, image:"images/blanc.jpg", class:"titre-blanc"},
  {name:"Emballage Rouge", price:18, image:"images/rouge.jpg", class:"titre-rouge"},
  {name:"Emballage Bleu", price:20, image:"images/bleu.jpg", class:"titre-bleu"}
];

const productsContainer = document.getElementById("products");
const cartList = document.getElementById("cart-list");
const totalDisplay = document.getElementById("total");

let cart = [];

// Afficher les produits
products.forEach((p,i) => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3 class="${p.class}">${p.name}</h3>
    <p>${p.price} €</p>
    <button onclick="addToCart(${i})">Ajouter au panier</button>
  `;
  productsContainer.appendChild(div);
});

function addToCart(index){
  cart.push(products[index]);
  renderCart();
}

function renderCart(){
  cartList.innerHTML="";
  let total=0;
  cart.forEach((item)=>{
    total+=item.price;
    const li=document.createElement("li");
    li.textContent=`${item.name} - ${item.price} €`;
    cartList.appendChild(li);
  });
  totalDisplay.textContent=`Total : ${total} €`;
}

// Valider la commande
document.getElementById("valider").addEventListener("click",()=>{
  const name=document.getElementById("client-name").value;
  const phone=document.getElementById("client-phone").value;
  const address=document.getElementById("client-address").value;
  if(!name || !phone || !address || cart.length===0){
    alert("⚠️ Veuillez remplir toutes les informations et ajouter au moins un produit.");
    return;
  }
  const total = cart.reduce((s,i)=>s+i.price,0);
  const date = new Date().toLocaleString();

  db.collection("clients").add({
    nom: name,
    telephone: phone,
    adresse: address,
    produits: cart.map(c=>c.name).join(", "),
    total: total,
    date: date
  });

  alert("✅ Commande validée !");
  cart=[];
  renderCart();
  document.getElementById("client-name").value="";
  document.getElementById("client-phone").value="";
  document.getElementById("client-address").value="";
});

// Admin
document.getElementById("admin-login").addEventListener("click",()=>{
  const mdp=prompt("Mot de passe admin :");
  if(mdp==="12345"){ // ⚠️ غيّر كلمة السر هنا
    document.getElementById("clients-section").style.display="block";
    loadClients();
  } else {
    alert("❌ Mot de passe incorrect !");
  }
});

function loadClients(){
  const tbody=document.getElementById("clients-list");
  tbody.innerHTML="";
  db.collection("clients").get().then(snapshot=>{
    snapshot.forEach(doc=>{
      const c=doc.data();
      const tr=document.createElement("tr");
      tr.innerHTML=`
        <td>${c.nom}</td>
        <td>${c.telephone}</td>
        <td>${c.adresse}</td>
        <td>${c.produits}</td>
        <td>${c.total} €</td>
        <td>${c.date}</td>
      `;
      tbody.appendChild(tr);
    });
  });
}
