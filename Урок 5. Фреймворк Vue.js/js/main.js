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
      quantity: 1,

      userSearch: '',


   },
   methods: {

      getJson(url) {
         return fetch(url)
            .then(result => result.json())
            .catch(error => {
               console.log(error);
            })
      },

      notGoods() { // как правильно его вызывать я не понял. В переменной this.bascet получается пусто, и работает не правильно. Правильно сработало, только, когда обратился к этому методу из метода showCart(). Но тогда с каждым нажатием выводится Нет выбранных товаров.
         if (this.bascet.length) {
            const block = document.querySelector('.cart')
            const text = document.createElement('div')
            text.classList.add('cart__empty')
            text.innerHTML = `Нет выбранных товаров`
            block.appendChild(text)
         } else {
            // тут будет блок подсчета общей стоимости Я так думаю.
         }
      },

      addProduct(product) {
         console.log(product.id_product);
         let find = this.bascet.find(el => el.id_product === product.id_product);
         if (find) {
            find.quantity++;
            // this._updateCart(find);
         }
      },

      showCart() {
         document.querySelector('.cart').classList.toggle('cart-click');
      },

      // _updateCart(product) {
      //    let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
      //    block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
      //    block.querySelector('.product-price').textContent = `= ${product.quantity * product.price} $`;
      // }

      filter(value) {
         const regexp = new RegExp(value, 'i');
         this.filtered = this.products.filter(product => regexp.test(product.product_name));
         console.log(this.filtered);
         this.products.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if (!this.filtered.includes(el)) {
               block.classList.add('invisible');
            } else {
               block.classList.remove('invisible');
            }
         })
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
      //         this.bascet.push(el);
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

      document.querySelector('.search-form').addEventListener('submit', e => {
         e.preventDefault();
         this.filter(document.querySelector('.search-field').value)
      })
   }
})