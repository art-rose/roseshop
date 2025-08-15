import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// إعداد Firebase
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

// المنتجات
const products = [
  {name:"Emballage Noir", price:18, image:"https://raw.githubusercontent.com/mahdi/roseshop/main/noir.jpg", color:"Noir"},
  {name:"Emballage Blanc", price:18, image:"https://raw.githubusercontent.com/mahdi/roseshop/main/blanc.jpg", color:"Blanc"},
  {name:"Emballage Rouge", price:18, image:"https://raw.githubusercontent.com/mahdi/roseshop/main/rouge.jpg", color:"Rouge"},
  {name:"Emballage Bleu", price:20, image:"https://raw.githubusercontent.com/mahdi/roseshop/main/bleu.jpg", color:"Bleu"}
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

// إضافة للسلة
function addToCart(name, price){
  cart.push({name, price});
  total += price;
  saveCart(); updateCart();
}

// تحديث السلة
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

// حذف من السلة
function removeFromCart(index){
  total -= cart[index].price;
  cart.splice(index,1);
  saveCart(); updateCart();
}

// حفظ السلة
function saveCart(){
  localStorage.setItem('cart',JSON.stringify(cart));
  localStorage.setItem('total',total);
}

// عرض المنتجات
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
      <button onclick="addToCart('${p.name}',${p.price})">إضافة للسلة</button>
    `;
    productList.appendChild(div);
  });
}
window.addToCart = addToCart; // مهم للـ onclick

// فلترة المنتجات
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

// Checkout
document.getElementById('checkout').addEventListener('click', async ()=>{
  if(cart.length===0){ alert("سلتك فارغة!"); return; }
  const name=prompt("أدخل اسمك:");
  const phone=prompt("📞 أدخل رقم هاتفك:");
  const address=prompt("📍 أدخل عنوانك:");

  if(!name || !phone || !address){
    alert("يجب إدخال الاسم، الهاتف و العنوان");
    return;
  }

  try {
    await addDoc(collection(db, "clients"), {
      name, phone, address,
      cart, total,
      date:new Date().toLocaleString()
    });
    alert("✅ تم حفظ بياناتك بنجاح في قاعدة البيانات");
    cart=[]; total=0; saveCart(); updateCart();
  } catch(err){
    console.error("❌ خطأ:", err);
    alert("حدث خطأ أثناء حفظ بياناتك!");
  }
});

// زر إفراغ السلة
document.getElementById('clear-cart').addEventListener('click',()=>{
  cart=[]; total=0; saveCart(); updateCart();
});

// زر الأدمن
document.getElementById("admin-login").addEventListener("click", async ()=>{
  const password=prompt("أدخل كلمة سر الأدمن:");
  if(password==="12345"){ // غير كلمة السر
    document.getElementById("clients-section").style.display="block";
    loadClients();
  } else {
    alert("❌ كلمة السر غير صحيحة!");
  }
});

// تحميل الحرفاء
async function loadClients(){
  const querySnapshot=await getDocs(collection(db,"clients"));
  const clientsList=document.getElementById("clients-list");
  clientsList.innerHTML="";
  querySnapshot.forEach(doc=>{
    const c=doc.data();
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.address}</td>
      <td>${c.cart.length}</td>
      <td>${c.total} D</td>
      <td>${c.date}</td>
    `;
    clientsList.appendChild(tr);
  });
}

// تحميل أولي
window.onload=()=>{ filterProducts(); updateCart(); }
