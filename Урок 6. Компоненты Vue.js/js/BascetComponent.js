Vue.component('cart', {
   props: ['bascet', 'img'],
   template: `
        <div class="cart">  
            <p class="cart__empty" v-if="!bascet.length">Нет выбранных товаров</p>         
            <cart-item v-for="product of bascet" :key="product.id_product" :img="img" :cartItem="product">
         </cart-item>
        </div>
    `
});

Vue.component('cart-item', {
   props: ['cartItem', 'img'],
   template: `
    <div class="cart-item">
                    <div class="product-bio">
                  <img :src="img" alt="Some img">
                  <div class="product-desc">
                     <p class="product-title">{{cartItem.product_name}}</p>
                     <p class="product-single-price">{{cartItem.price}} $</p>
                     <div class="quantity">
                        <button class="del-btn" @click="$parent.$emit('remove', cartItem)">-</button>
                        <p class="product-quantity">Quantity: {{ cartItem.quantity }}</p>
                        <button class="del-btn" @click="$parent.$emit('add-product', cartItem)">+</button>
                     </div>
                  </div>
               </div>
               <div class="right-block">
                  <p class="product-price">{{ cartItem.price * cartItem.quantity}} $</p>
               </div>
            </div>
         </div>
    `
})