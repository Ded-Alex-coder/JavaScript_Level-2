Vue.component('cart', {
   data() {
      return {
         bascet: [],
      }
   },
   methods: {
      addProduct(product) {
         let find = this.bascet.find(el => el.id_product === product.id_product);
         if (find) {
            this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, { quantity: 1 })
               .then(data => {
                  if (data.result) {
                     find.quantity++;
                  }
               })
         } else {
            let prod = Object.assign({ quantity: 1 }, product);
            this.$parent.postJson(`api/cart/${product.id_product}/${product.product_name}`, prod)
               .then(data => {
                  if (data.result) {
                     this.bascet.push(prod);
                  }
               })
         }
      },

      remove(product) {
         if (product.quantity > 1) {
            this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, { quantity: -1 })
               .then(data => {
                  if (data.result) {
                     product.quantity--;
                  }
               })
         } else {
            this.$parent.delJson(`/api/cart/${product.id_product}/${product.product_name}`, product)
               .then(data => {
                  if (data.result) {
                     this.bascet.splice(this.bascet.indexOf(product), 1);
                  } else {
                     console.log('error');
                  }
               })
         }
      },
   },

   mounted() {
      this.$parent.getJson(`/api/cart`)
         .then(data => {
            for (let el of data.contents) {
               this.bascet.push(el)
            }
         });
   },
   template: `
        <div class="cart">
               <p class="cart__empty" v-if="!bascet.length">Нет выбранных товаров</p>
               <cart-item v-for="product of bascet" :key="product.id_product" :cartItem="product"
               @remove="remove" @add-product="addProduct">
               </cart-item>
            <div class="total-block" v-if="bascet.length">
               <h3>Количество товара: {{ this.bascet.reduce((summ, item) => summ + item.quantity, 0) }} шт.</h3>
               <h3>Общая стоимость: {{ this.bascet.reduce((summ, item) => summ + item.quantity*item.price, 0) }} $</h3>
            </div>
        </div>
    `
});

Vue.component('cart-item', {
   props: ['cartItem'],
   template: `
    <div class="cart-item">
                    <div class="product-bio">
                  <img :src="cartItem.product_img" alt="Some img">
                  <div class="product-desc">
                     <p class="product-title">{{cartItem.product_name}}</p>
                     <p class="product-single-price">{{cartItem.price}} $</p>
                     <div class="quantity">
                        <button class="del-btn" @click="$emit('remove', cartItem)">-</button>
                        <p class="product-quantity">Количество: {{ cartItem.quantity }}</p>
                        <button class="del-btn" @click="$emit('add-product', cartItem)">+</button>
                     </div>
                  </div>
               </div>
               <div class="right-block">
                  <p class="product-price">{{ cartItem.price * cartItem.quantity}} $</p>
               </div>
            </div>
         </div>
    `
});

// export default cart
