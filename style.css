// Firebase initialization
const firebaseConfig = { /* إعداداتك هنا */ };
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let cart = [];
let total = 0;

// التحقق من حالة المستخدم
auth.onAuthStateChanged(user => {
  if (!user) {
    auth.signInWithEmailAndPassword('youremail@example.com','yourpassword')
      .catch(console.error);
  } else {
    checkIfAdmin(user);
    loadProducts();
    updateCart();
  }
});

async function checkIfAdmin(user) {
  const doc = await db.collection('users').doc(user.uid).get();
  if (doc.exists && doc.data().role === 'ADMIN') {
    document.getElementById('admin-panel').style.display = 'block';
    loadOrders();
  }
}

// تحميل المنتجات من Firestore
async function loadProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  const snapshot = await db.collection('products').get();
  snapshot.forEach(doc => {
    const p = doc.data();
    productList.innerHTML += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price} D</p>
        <button onclick="addToCart('${p.name}',${p.price})">إضافة للسلة</button>
      </div>`;
  });
}

// السلة وتحديثها
function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCart();
}

function updateCart() {
  const ul = document.getElementById('cart-items');
  ul.innerHTML = cart.map((item, i) => `
    <li>${item.name} - ${item.price} D <button onclick="removeFromCart(${i})">❌</button></li>
  `).join('');
  const tva = total * 0.19;
  document.getElementById('total').textContent = total.toFixed(2);
  document.getElementById('tva').textContent = tva.toFixed(2);
  document.getElementById('grand-total').textContent = (total + tva).toFixed(2);
}

window.removeFromCart = function(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
};

document.getElementById('clear-cart').onclick = () => {
  cart = []; total = 0;
  updateCart();
};

// إتمام الشراء → حفظ الطلب
document.getElementById('checkout').onclick = async () => {
  const user = auth.currentUser;
  if (!user) return alert('لا يمكنك الشراء بدون تسجيل الدخول.');

  await db.collection('orders').add({
    userId: user.uid,
    userEmail: user.email,
    items: cart,
    total,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  alert('تمّ حفظ الطلب بنجاح');
  cart = []; total = 0;
  updateCart();
  if (document.getElementById('admin-panel').style.display === 'block')
    loadOrders();
};

// عرض الطلبات في لوحة الأدمين
async function loadOrders() {
  const container = document.getElementById('orders-list');
  container.innerHTML = '';
  const snapshot = await db.collection('orders').orderBy('createdAt', 'desc').get();
  snapshot.forEach(doc => {
    const o = doc.data();
    container.innerHTML += `
      <div style="border:1px solid #ddd; padding:10px; margin-bottom:10px;">
        <strong>الحرفي:</strong> ${o.userEmail} <br/>
        <strong>المجموع:</strong> ${o.total.toFixed(2)} D <br/>
        <strong>القطع:</strong> ${o.items.map(i => i.name).join(', ')}
      </div>`;
  });
}
