.product {
  background:white; border-radius:12px; padding:15px; text-align:center;
  box-shadow:0 2px 6px rgba(0,0,0,0.1); transition: transform 0.3s, box-shadow 0.3s;
}
.product:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow:0 4px 15px rgba(0,0,0,0.2);
}
.product img { width:100%; border-radius:10px; transition: transform 0.3s; }
.product img:hover { transform: scale(1.05); }
.product h3 { margin:10px 0 5px; font-size:1.1em; }
.product p { font-size:0.9em; color:#333; margin-bottom:10px; }
.product button {
  margin-top:5px; padding:8px 15px; background:#ff4081; color:white;
  border:none; border-radius:6px; cursor:pointer; transition: background 0.3s, transform 0.2s;
}
.product button:hover {
  background:#e91e63; transform: scale(1.05);
}
.cart { flex:1; background:white; padding:20px; border-radius:12px; margin-left:25px;
  height:max-content; box-shadow:0 3px 12px rgba(0,0,0,0.15);
}
.cart button {
  margin-top:8px; padding:10px; width:100%; border:none; border-radius:6px; cursor:pointer;
  transition: background 0.3s, transform 0.2s;
}
