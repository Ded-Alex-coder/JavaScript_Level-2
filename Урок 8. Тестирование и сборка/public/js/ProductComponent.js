Vue.component('products', {
   data() {
      return {
         products: [],
      }
   },
   methods: {
      filter(userSearch) {
         let regexp = new RegExp(userSearch, 'i');
         this.products = this.products.filter(el => regexp.test(el.product_name));
      },
   },
   mounted() {
      this.$parent.getJson(`/api/products`)
         .then(data => {
            for (let el of data) {
               this.products.push(el);
            }
         });
   },
   template: `<div class="products">
                <h1>Каталог товаров</h1>
                <product v-for="item of products"
                :key="item.id_product"
                :product="item"
                ></product>
               </div>`
});

Vue.component('product', {
   props: ['product'],
   template: `
            <div class="product-item">
                <img :src="product.product_img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p class="product-text">Здесь будет немного текста описывающего продукт. Здесь будет немного
                     текста описывающего
                     продукт. Здесь будет немного текста описывающего продукт.</p>
                    <p>{{product.price}} $</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>
    `
});

// export default products
