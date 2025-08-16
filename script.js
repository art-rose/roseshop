// Config Firebase (remplace par tes vraies infos)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Liste de produits
const produits = [
  { nom: "Rose Rouge", prix: 10, image: "images/rose1.jpg" },
  { nom: "Rose Blanche", prix: 12, image: "images/rose2.jpg" },
  { nom: "Rose Rose", prix: 8, image: "images/rose3.jpg" }
];

let panier = [];

// Affichage produits
const produitsDiv = document.getElementById("products");
if(produitsDiv){
  produits.forEach((p,i) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.nom}">
      <h3>${p.nom}</h3>
      <p>${p.prix} €</p>
      <button onclick="ajouterAuPanier(${i})">Ajouter</button>
    `;
    produitsDiv.appendChild(div);
  });
}

// Ajouter au panier
function ajouterAuPanier(i){
  panier.push(produits[i]);
  majPanier();
}

// Mise à jour panier
function majPanier(){
  const total = panier.reduce((s,p)=>s+p.prix,0);
  document.getElementById("total").innerText = "Total : " + total + " €";
}

// Valider commande
const btnValider = document.getElementById("valider");
if(btnValider){
  btnValider.addEventListener("click", ()=>{
    const nom = document.getElementById("nom").value;
    const tel = document.getElementById("telephone").value;
    const adr = document.getElementById("adresse").value;
    const total = panier.reduce((s,p)=>s+p.prix,0);

    if(nom && tel && adr && panier.length>0){
      db.collection("commandes").add({
        nom: nom,
        telephone: tel,
        adresse: adr,
        total: total,
        panier: panier,
        date: new Date()
      }).then(()=>{
        alert("Commande envoyée !");
        panier = [];
        majPanier();
      });
    } else {
      alert("Complétez vos informations et ajoutez des produits.");
    }
  });
}

// Charger commandes (Admin)
function chargerCommandes(){
  const commandesDiv = document.getElementById("commandes");
  db.collection("commandes").orderBy("date","desc").onSnapshot(snap=>{
    commandesDiv.innerHTML="";
    snap.forEach(doc=>{
      const d = doc.data();
      const div = document.createElement("div");
      div.className="commande";
      div.innerHTML = `
        <p><strong>Nom:</strong> ${d.nom}</p>
        <p><strong>Téléphone:</strong> ${d.telephone}</p>
        <p><strong>Adresse:</strong> ${d.adresse}</p>
        <p><strong>Total:</strong> ${d.total} €</p>
        <div class="produits">
          ${d.panier.map(p=>`
            <div class="produit">
              <img src="${p.image}">
              <p>${p.nom}</p>
              <p>${p.prix} €</p>
            </div>
          `).join("")}
        </div>
        <button onclick="supprimerCommande('${doc.id}')">🗑 Supprimer</button>
      `;
      commandesDiv.appendChild(div);
    });
  });
}

// Supprimer commande
function supprimerCommande(id){
  if(confirm("Supprimer cette commande ?")){
    db.collection("commandes").doc(id).delete();
  }
}
