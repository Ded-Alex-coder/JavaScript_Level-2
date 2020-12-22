const API = 'https://raw.githubusercontent.com/Ded-Alex-coder/JavaScript_Level-2/main/responses';

const app = new Vue({
   el: '#app',
   data: {
      catalogUrl: '/catalogData.json',
      bascetUrl: '/getBasket.json',
      products: [],
      bascet: [],
      imgCatalog: 'https://placehold.it/200x150',
      imgCart: 'https://placehold.it/100x100',
      userSearch: '',
      showError: false,
   },
   methods: {

      getJson(url) {
         return fetch(url)
            .then(result => result.json())
            .catch(error => {
               this.showError = true;
            })
      },

      addProduct(product) {
         let find = this.bascet.find(el => el.id_product === product.id_product);
         if (find) {
            find.quantity++;
         } else {
            const prod = Object.assign({ quantity: 1 }, product);//создание нового объекта на основе двух, указанных в параметрах
            this.bascet.push(prod)
         }
      },

      remove(product) {
         if (product.quantity > 1) {
            product.quantity--;
         } else {
            this.bascet.splice(this.bascet.indexOf(product), 1);
         }
      },

      showCart() {
         document.querySelector('.cart').classList.toggle('cart-click');
      },

      filter(userSearch) {
         let regexp = new RegExp(userSearch, 'i');
         this.products = this.products.filter(el => regexp.test(el.product_name));
      },

      error() {
         let error = document.querySelector('main');
         let errorMsg = document.createElement('div');
         errorMsg.classList.add('error-block');
         errorMsg.innerHTML = ` Не удаётся выполнить запрос к серверу!`;
         error.appendChild(errorMsg);
      }
   },
   mounted() {
      // this.getJson(`${API + this.catalogUrl}`)
      //    .then(data => {
      //       for (let el of data) {
      //          this.products.push(el);
      //       }
      //    });

      // this.getJson(`${API + this.bascetUrl}`)
      //    .then(data => {
      //       for (let el of data.contents) {
      //          this.bascet.push(el);
      //       }
      //    });

      this.getJson(`responses/catalogData.json`)
         .then(data => {
            for (let el of data) {
               this.products.push(el);
            }
         })

      this.getJson(`responses/getBasket.json`)
         .then(data => {
            for (let el of data.contents) {
               this.bascet.push(el);
            }
         })
   }
})