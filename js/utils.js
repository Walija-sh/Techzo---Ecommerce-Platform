import { PopulateCart } from "./cart.js";
function updateCart(){
       let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartSpan= document.querySelector('.cart-li span');
cartSpan.textContent= cart.reduce((total, item) => total + item.quantity, 0) || 0;
}

export const addItemToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItemIndex = cart.findIndex(item => item.id === product.id);

  if (existingItemIndex === -1) {
    cart.push({ ...product, quantity: 1 });
    // alert(`${product.title} added to cart!`);
  } else {
    cart[existingItemIndex].quantity += 1;
    // alert(`${product.title} quantity increased!`);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  
  updateCart()
 
};


export const deleteItemFromCart=(productId)=>{
    let cart=JSON.parse(localStorage.getItem('cart'))||[];
                cart=cart.filter(item=>item.id !=productId)
                localStorage.setItem('cart',JSON.stringify(cart))

updateCart()
location.reload();

}

export const increaseQty=(productId)=>{
  let cart=JSON.parse(localStorage.getItem('cart'))||[];

  const itemIndex = cart.findIndex(item => item.id == productId);
  if (itemIndex !== -1) {
   cart[itemIndex].quantity += 1;
  }
localStorage.setItem('cart',JSON.stringify(cart))

updateCart()

}
export const decreaseQty=(productId)=>{
  let cart=JSON.parse(localStorage.getItem('cart'))||[];

  const itemIndex = cart.findIndex(item => item.id == productId);
  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity === 1) {
      cart = cart.filter(item => item.id != productId);
      location.reload()
    } else {
      cart[itemIndex].quantity -= 1;
    }
  }
                localStorage.setItem('cart',JSON.stringify(cart))

updateCart()

}


document.addEventListener('DOMContentLoaded',updateCart)