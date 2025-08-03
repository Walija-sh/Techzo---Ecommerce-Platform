import { deleteItemFromCart,increaseQty,decreaseQty } from "./utils.js";


const handleQuantity=()=>{
     const increaseBtns=document.querySelectorAll('.increaseQty');
        const decreaseBtns=document.querySelectorAll('.decreaseQty');
        increaseBtns.forEach(btn=>{
            btn.addEventListener('click',()=>{
                const card=btn.closest('.cart-card');
                if(card.dataset.id){
                    increaseQty(card.dataset.id)
                       PopulateCart()
                   
                }

                
            })
        })
        decreaseBtns.forEach(btn=>{
            btn.addEventListener('click',()=>{
                const card=btn.closest('.cart-card');
                if(card.dataset.id){
                    decreaseQty(card.dataset.id)
                       PopulateCart()
                   
                }
                
            })
        })
        
     
   
}
export const PopulateCart= async ()=>{
        const container=document.querySelector('.cart-cards');
        const cartSubtotal=document.querySelector('.cart-subtotal p span');
        const cartShipping=document.querySelector('.cart-shipping p span');
        const cartTotal=document.querySelector('.cart-total p span');
        const cartHeader=document.querySelector('.cart-header');
        let shipping=5.00;
        let subtotal=0
        let total=0
        
       const products=JSON.parse(localStorage.getItem('cart'))||[]
        if(!container) return
        if(products.length<=0){
            cartHeader.style.display='none'
            return
        } 
        
        let cartHtml=products.map((product)=>{
            return `   <article class="cart-card" data-id="${product.id}">
                <div class="cart-product">
                    <h4>Product</h4>
                    <div >
                        <div class="cart-prod-Img">
                            <img src="${product.thumbnail}" alt="">
                        </div>
                         <a href="./productDetail.html?id=${product.id}" >
                          <p>${product.title}</p>
                         </a>
                       
                    </div>
                </div>
                <div class="cart-price">
                    <h4>Price</h4>
                    <div>
                        <p>$ <span>${product.price.toFixed(2)}</span></p>
                    </div>
                </div>
                <div class="cart-qty">
                    <h4>Quantity</h4>
                    <div>
                        <p><i class="ri-subtract-line decreaseQty"></i></p>
                        <p>${product.quantity}</p>
                        <p> <i class="ri-add-line increaseQty"></i></p>
                    </div>
                </div>
                <div class="">
                    <h4>Subtotal</h4>
                    <div>
                        <p>$ <span>${(product.price * product.quantity).toFixed(2)}</span></p>
                    </div>
                </div>
                <div class="cart-del">
                     <h4>Edit</h4>
                    <div class='cart-del-btn' data-id='${product.id}'>
                        <p><i class="ri-delete-bin-line"></i></p>
                    </div>
                </div>
            </article>`
        }).join('')

        container.innerHTML=cartHtml;

        subtotal=products.reduce((total,item)=>total+(item.price*item.quantity),0).toFixed(2)
        
        total=products.length==0? 0:(parseFloat(subtotal) + shipping).toFixed(2);
        
        cartShipping.innerHTML=shipping;
        cartSubtotal.innerHTML=subtotal;

        
        cartTotal.innerHTML=total;
        
        handleQuantity()
        deleteItem()
        

    }


const deleteItem=()=>{
const cartDelBtns=document.querySelectorAll('.cart-del-btn')
        cartDelBtns.forEach(btn=>{
            btn.addEventListener('click',()=>{
               const productId=btn.dataset.id;
               if(productId){
                deleteItemFromCart(productId)
               }

               

                
                
            })
        })

}



 document.addEventListener('DOMContentLoaded', () => {
  PopulateCart();
  handleQuantity();
  deleteItem();
});


