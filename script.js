import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// ✅ بيانات Firebase (بدل القيم ببيانات مشروعك)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXX"
};

// تشغيل Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// تسجيل دخول مؤقت (Anonymous)
signInAnonymously(auth)
  .then(() => console.log("✅ Logged in anonymously"))
  .catch((error) => console.error("Auth error:", error));

const productContainer = document.getElementById("products");

// جلب المنتجات من Firestore
async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    const p = doc.data();
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="price">${p.price} د</div>
      <div class="actions">
        <input type="number" min="1" value="1" id="qty-${doc.id}">
        <button class="add-cart" onclick="addToCart('${doc.id}', '${p.name}', ${p.price})">أضف إلى السلة</button>
        <button class="buy-now" onclick="buyNow('${doc.id}', '${p.name}', ${p.price})">اشترِ الآن</button>
      </div>
    `;
    productContainer.appendChild(div);
  });
}

loadProducts();

// 🛒 إضافة للسلة (تنبيه فقط)
window.addToCart = function(id, name, price) {
  const qty = document.getElementById(`qty-${id}`).value;
  alert(`تمت إضافة ${qty} × "${name}" إلى السلة ✅ (المجموع: ${price * qty} د)`);
};

// 🛍 إنشاء طلب في Firestore
window.buyNow = async function(id, name, price) {
  const qty = document.getElementById(`qty-${id}`).value;
  const total = price * qty;

  try {
    await addDoc(collection(db, "orders"), {
      productId: id,
      productName: name,
      quantity: qty,
      totalPrice: total,
      createdAt: new Date().toISOString()
    });
    alert(`✅ تم إنشاء الطلب: ${qty} × "${name}" بمبلغ ${total} د`);
  } catch (e) {
    console.error("خطأ في إنشاء الطلب:", e);
  }
};
