import { addItemToCart } from "./utils.js";

const fetchProduct = async (query, limit,sortBy = null) => {
  try {
    const res = await axios.get(`https://dummyjson.com/products/search?q=${query}&limit=${limit}&sortBy=${sortBy}`);
    return res.data.products || []; 
  } catch (err) {
    console.error(err);
    return []; 
  }
};


const insertProductCards=(products,container)=>{
            let productHtml=products.map((product)=>{
            return ` <article class="product-card">
               <a href="./productDetail.html?id=${product.id}" class="product">
                <div class="product-cir"></div>
                 <div class="product-img">
                    <img src="${product.thumbnail}" alt="">
                </div>
                <div class="product-content">
                    <h4>${product.title}</h4>
                    <p>$<span>${product.price.toFixed(2)}</span></p>
                    <div class="product-rating">
                        <div>
                        <i class="ri-star-s-fill"></i>
                        <i class="ri-star-s-fill"></i>
                        <i class="ri-star-s-fill"></i>
                        <i class="ri-star-s-fill"></i>
                        <i class="ri-star-s-fill"></i>
                        </div>
                        <p>${product.rating}</p>
                    </div>
                </div>
               </a>
                <button type="button" data-id="${product.id}" class="add-cart-btn">
                    <span><i class="ri-shopping-cart-2-line"></i> Add To Cart</span>
                </button>
            </article>`
        }).join(' ')
        container.innerHTML=productHtml;

        document.querySelectorAll('.add-cart-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const productId = btn.getAttribute('data-id');
    const product = products.find(p => p.id == productId);

    if (product) {
       addItemToCart(product)
    }
  });
});
}



const setProducts=  async (container,limit=null,search='device',cat=false)=>{

        
        if(!container) return


        const products=await fetchProduct(search, limit,'rating')  || []
if (cat) {
  const ctgContainer = document.querySelector('.prod-categories');
  if (!ctgContainer) return;

  let searchTerm = 'device';

  const ctgButtons = ctgContainer.querySelectorAll('.prod-category');
  ctgButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      searchTerm = btn.dataset.search;

      ctgButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const newProducts = await fetchProduct(searchTerm, limit, 'rating') || [];
      insertProductCards(newProducts, container);
    }, { once: true }); 
  });
}


insertProductCards(products,container)
        


        

    }


function generateStars(rating) {
    const stars = [];
    const filledStars = Math.floor(rating); 

    for (let i = 1; i <= 5; i++) {
        if (i <= filledStars) {
            stars.push('<i class="ri-star-s-fill s-fill"></i>');
        } else {
            stars.push('<i class="ri-star-s-fill"></i>');
        }
    }

    return stars.join('');
}

const handleProductDetailImages=()=>{
    const displayImage=document.querySelector('.pDisplay img');
    const subImages=document.querySelectorAll('.pImg')
    
    
    

    subImages.forEach(img=>{
        img.addEventListener('click',(e)=>{
            const clickImg=img.querySelector('img')
            displayImage.src=clickImg.src
            
        })
    })
}

const populateProductDetailPage=async ()=>{
const detailsContainer=document.querySelector('.p-details')
const reviewsContainer=document.querySelector('.review-cards')

if(!detailsContainer) return

const productId = new URLSearchParams(window.location.search).get('id');
let product={}
 try {
    const res= await axios.get(`https://dummyjson.com/products/${productId}`);
    product=res.data;
  } catch (err) {
    console.error(err);
  }
  if( !product) return
  let productHtml=`<div class="pImage-cont">
                <div class="pDisplay">
                    <img src="${product.thumbnail}" alt="">
                </div>
                <div class="pImgCards">
                    <div class="pImg">
                        <img src="${product.images[0]}" alt="">
                    </div>
                    <div class="pImg">
                        <img src="${product.images[1]}" alt="">
                    </div>
                    <div class="pImg">
                        <img src="${product.images[2]}" alt="">
                    </div>
                </div>
            </div>
            <!--  -->
            <div class="pdetail-content">
                <h2 class="pdet-title">${product.title}</h2>
                 <div class="pdetail-rating">
                        <div>
                       ${generateStars(product.rating)}
                        </div>
                        <p>( <span>${product.rating}</span> )</p>
                    </div>
                <p class="pdet-price">$ <span>${product.price}</span></p>
                <p class="pdet-desc">${product.description}</p>
                <div class="pdet-brand pdet-specs">
                    <h5>Brand:</h5>
                    <p>${product.brand}</p>
                </div>
                <div class="pdet-weight pdet-specs">
                    <h5>Weight:</h5>
                    <p>${product.weight}</p>
                </div>
                <div class="pdet-dim pdet-specs">
                    <h5>Dimensions:</h5>
                    <p>(<span>${product.dimensions.depth}</span>) X (<span>${product.dimensions.width}</span>) X (<span>${product.dimensions.height}</span>)</p>
                </div>
                <div class="pdet-warranty pdet-specs">
                    <h5>Warranty Information:</h5>
                    <p>${product.warrantyInformation}</p>
                </div>
                <div class="pdet-warranty pdet-specs">
                    <h5>Shipping Information:</h5>
                    <p>${product.shippingInformation}</p>
                </div>
                <div class="pdet-warranty pdet-specs">
                    <h5>Return Policy:</h5>
                    <p>${product.returnPolicy}</p>
                </div>
                 <button  class="pdet-add-to-cart primary-btn">
                Add To Cart
            </button>

            </div>`

      detailsContainer.innerHTML=productHtml;
      const addCartBtn=document.querySelector('.pdet-add-to-cart');
        addCartBtn.addEventListener('click', () => {
            
    if (product) {
       addItemToCart(product)
    }
        });

        if(!reviewsContainer || !product.reviews) return
    let reviewHtml=product.reviews.map(review=>{
        return `<article class="review-card">
                    <div class="review-h">
                        <div class="review-rating">
                                <div>
                                ${generateStars(review.rating)}
                                </div>
                                <p>( <span>${review.rating}</span> )</p>
                        </div>
                        <p class="review-date">published on <span>${new Date(review.date).toLocaleString()}</span></p>
                    </div>
                    <p class="review-content">
                       ${review.comment}
                    </p>
                    <h5 class="review-auth">
                        ${review.reviewerName}
                    </h5>
                </article>`
    }).join(' ')

    reviewsContainer.innerHTML=reviewHtml;

    handleProductDetailImages()

}


document.addEventListener('DOMContentLoaded',()=>{
    populateProductDetailPage();
    const featuredcontainer=document.querySelector('#featuredProducts');
    const maincontainer=document.querySelector('#allProducts');
    if(featuredcontainer) setProducts(featuredcontainer,6);
    if(maincontainer){
        setProducts(maincontainer,20,'device',true)
    }
} )

