import Vue from './vue'
import products from './ProductComponent'
import cart from './BascetComponent'
import search from './SearchComponent'
import error from './errorComponent'

// import '../style/style.css';

const app = new Vue({
   el: '#app',
   data: {
      showError: false,
   },
   components: {
      products,
      cart,
      search,
      error,
   },
   methods: {

      getJson(url) {
         return fetch(url)
            .then(result => result.json())
            .catch(error => {
               this.showError = true;
            })
      },

      postJson(url, data) {
         return fetch(url, {
            method: 'POST',
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
         })
            .then(result => result.json())
            .catch(error => this.$refs.error.setText(error))
      },
      putJson(url, data) {
         return fetch(url, {
            method: 'PUT',
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
         })
            .then(result => result.json())
            .catch(error => this.$refs.error.setText(error))
      },

      delJson(url, data) {
         return fetch(url, {
            method: 'DELETE',
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
         })
            .then(result => result.json())
            .catch(error => this.$refs.error.setText(error))
      },

      showCart() {
         document.querySelector('.cart').classList.toggle('cart-click');
      },

      error() {
         let error = document.querySelector('main');
         let errorMsg = document.createElement('div');
         errorMsg.classList.add('error-block');
         errorMsg.innerHTML = ` Не удаётся выполнить запрос к серверу!`;
         error.appendChild(errorMsg);
      }
   },
})
