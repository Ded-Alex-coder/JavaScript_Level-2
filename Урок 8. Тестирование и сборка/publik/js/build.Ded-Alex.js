/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/BascetComponent.js":
/*!***********************************!*\
  !*** ./src/js/BascetComponent.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('cart', {\r\n   data() {\r\n      return {\r\n         bascet: [],\r\n      }\r\n   },\r\n   methods: {\r\n      addProduct(product) {\r\n         let find = this.bascet.find(el => el.id_product === product.id_product);\r\n         if (find) {\r\n            this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, { quantity: 1 })\r\n               .then(data => {\r\n                  if (data.result) {\r\n                     find.quantity++;\r\n                  }\r\n               })\r\n         } else {\r\n            let prod = Object.assign({ quantity: 1 }, product);\r\n            this.$parent.postJson(`api/cart/${product.id_product}/${product.product_name}`, prod)\r\n               .then(data => {\r\n                  if (data.result) {\r\n                     this.bascet.push(prod);\r\n                  }\r\n               })\r\n         }\r\n      },\r\n\r\n      remove(product) {\r\n         if (product.quantity > 1) {\r\n            this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, { quantity: -1 })\r\n               .then(data => {\r\n                  if (data.result) {\r\n                     product.quantity--;\r\n                  }\r\n               })\r\n         } else {\r\n            this.$parent.delJson(`/api/cart/${product.id_product}/${product.product_name}`, product)\r\n               .then(data => {\r\n                  if (data.result) {\r\n                     this.bascet.splice(this.bascet.indexOf(product), 1);\r\n                  } else {\r\n                     console.log('error');\r\n                  }\r\n               })\r\n         }\r\n      },\r\n   },\r\n\r\n   mounted() {\r\n      this.$parent.getJson(`/api/cart`)\r\n         .then(data => {\r\n            for (let el of data.contents) {\r\n               this.bascet.push(el)\r\n            }\r\n         });\r\n   },\r\n   template: `\r\n        <div class=\"cart\">\r\n               <p class=\"cart__empty\" v-if=\"!bascet.length\">Нет выбранных товаров</p>\r\n               <cart-item v-for=\"product of bascet\" :key=\"product.id_product\" :cartItem=\"product\"\r\n               @remove=\"remove\" @add-product=\"addProduct\">\r\n               </cart-item>\r\n            <div class=\"total-block\" v-if=\"bascet.length\">\r\n               <h3>Количество товара: {{ this.bascet.reduce((summ, item) => summ + item.quantity, 0) }} шт.</h3>\r\n               <h3>Общая стоимость: {{ this.bascet.reduce((summ, item) => summ + item.quantity*item.price, 0) }} $</h3>\r\n            </div>\r\n        </div>\r\n    `\r\n}));\r\n\r\nVue.component('cart-item', {\r\n   props: ['cartItem'],\r\n   template: `\r\n    <div class=\"cart-item\">\r\n                    <div class=\"product-bio\">\r\n                  <img :src=\"cartItem.product_img\" alt=\"Some img\">\r\n                  <div class=\"product-desc\">\r\n                     <p class=\"product-title\">{{cartItem.product_name}}</p>\r\n                     <p class=\"product-single-price\">{{cartItem.price}} $</p>\r\n                     <div class=\"quantity\">\r\n                        <button class=\"del-btn\" @click=\"$emit('remove', cartItem)\">-</button>\r\n                        <p class=\"product-quantity\">Количество: {{ cartItem.quantity }}</p>\r\n                        <button class=\"del-btn\" @click=\"$emit('add-product', cartItem)\">+</button>\r\n                     </div>\r\n                  </div>\r\n               </div>\r\n               <div class=\"right-block\">\r\n                  <p class=\"product-price\">{{ cartItem.price * cartItem.quantity}} $</p>\r\n               </div>\r\n            </div>\r\n         </div>\r\n    `\r\n});\r\n\n\n//# sourceURL=webpack://lesson-8/./src/js/BascetComponent.js?");

/***/ }),

/***/ "./src/js/ProductComponent.js":
/*!************************************!*\
  !*** ./src/js/ProductComponent.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('products', {\r\n   data() {\r\n      return {\r\n         products: [],\r\n      }\r\n   },\r\n   methods: {\r\n      filter(userSearch) {\r\n         let regexp = new RegExp(userSearch, 'i');\r\n         this.products = this.products.filter(el => regexp.test(el.product_name));\r\n      },\r\n   },\r\n   mounted() {\r\n      this.$parent.getJson(`/api/products`)\r\n         .then(data => {\r\n            for (let el of data) {\r\n               this.products.push(el);\r\n            }\r\n         });\r\n   },\r\n   template: `<div class=\"products\">\r\n                <h1>Каталог товаров</h1>\r\n                <product v-for=\"item of products\"\r\n                :key=\"item.id_product\"\r\n                :product=\"item\"\r\n                ></product>\r\n               </div>`\r\n}));\r\n\r\nVue.component('product', {\r\n   props: ['product'],\r\n   template: `\r\n            <div class=\"product-item\">\r\n                <img :src=\"product.product_img\" alt=\"Some img\">\r\n                <div class=\"desc\">\r\n                    <h3>{{product.product_name}}</h3>\r\n                    <p class=\"product-text\">Здесь будет немного текста описывающего продукт. Здесь будет немного\r\n                     текста описывающего\r\n                     продукт. Здесь будет немного текста описывающего продукт.</p>\r\n                    <p>{{product.price}} $</p>\r\n                    <button class=\"buy-btn\" @click=\"$root.$refs.cart.addProduct(product)\">Купить</button>\r\n                </div>\r\n            </div>\r\n    `\r\n});\r\n\n\n//# sourceURL=webpack://lesson-8/./src/js/ProductComponent.js?");

/***/ }),

/***/ "./src/js/SearchComponent.js":
/*!***********************************!*\
  !*** ./src/js/SearchComponent.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('search', {\r\n   data() {\r\n      return {\r\n         userSearch: ''\r\n      }\r\n   },\r\n   template: `\r\n         <form action=\"#\" class=\"search-form\" @submit.prevent='$parent.$refs.products.filter(userSearch)'>\r\n            <input type=\"text\" class=\"search-field\"\r\n            v-model=\"userSearch\">\r\n            <button class=\"btn-search\" type=\"submit\">\r\n               <i class=\"fas fa-search\"></i></button>\r\n         </form>\r\n   `\r\n}));\r\n\n\n//# sourceURL=webpack://lesson-8/./src/js/SearchComponent.js?");

/***/ }),

/***/ "./src/js/errorComponent.js":
/*!**********************************!*\
  !*** ./src/js/errorComponent.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('error', {\r\n   props: ['visibility'],\r\n   template: `\r\n      <div class=\"error-block\" v-show=\"visibility\">\r\n         <h4>Не удаётся выполнить запрос к серверу!</h4>\r\n      </div>\r\n   `\r\n}));\r\n\n\n//# sourceURL=webpack://lesson-8/./src/js/errorComponent.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ProductComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductComponent */ \"./src/js/ProductComponent.js\");\n/* harmony import */ var _BascetComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BascetComponent */ \"./src/js/BascetComponent.js\");\n/* harmony import */ var _SearchComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchComponent */ \"./src/js/SearchComponent.js\");\n/* harmony import */ var _errorComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errorComponent */ \"./src/js/errorComponent.js\");\n// import Vue from './vue'\r\n\r\n\r\n\r\n\r\n\r\n// import '../style/style.css';\r\n\r\nconst app = new Vue({\r\n   el: '#app',\r\n   data: {\r\n      showError: false,\r\n   },\r\n   components: {\r\n      products: _ProductComponent__WEBPACK_IMPORTED_MODULE_0__.default,\r\n      cart: _BascetComponent__WEBPACK_IMPORTED_MODULE_1__.default,\r\n      search: _SearchComponent__WEBPACK_IMPORTED_MODULE_2__.default,\r\n      error: _errorComponent__WEBPACK_IMPORTED_MODULE_3__.default,\r\n   },\r\n   methods: {\r\n\r\n      getJson(url) {\r\n         return fetch(url)\r\n            .then(result => result.json())\r\n            .catch(error => {\r\n               this.showError = true;\r\n            })\r\n      },\r\n\r\n      postJson(url, data) {\r\n         return fetch(url, {\r\n            method: 'POST',\r\n            headers: {\r\n               \"Content-Type\": \"application/json\"\r\n            },\r\n            body: JSON.stringify(data)\r\n         })\r\n            .then(result => result.json())\r\n            .catch(error => this.$refs.error.setText(error))\r\n      },\r\n      putJson(url, data) {\r\n         return fetch(url, {\r\n            method: 'PUT',\r\n            headers: {\r\n               \"Content-Type\": \"application/json\"\r\n            },\r\n            body: JSON.stringify(data)\r\n         })\r\n            .then(result => result.json())\r\n            .catch(error => this.$refs.error.setText(error))\r\n      },\r\n\r\n      delJson(url, data) {\r\n         return fetch(url, {\r\n            method: 'DELETE',\r\n            headers: {\r\n               \"Content-Type\": \"application/json\"\r\n            },\r\n            body: JSON.stringify(data)\r\n         })\r\n            .then(result => result.json())\r\n            .catch(error => this.$refs.error.setText(error))\r\n      },\r\n\r\n      showCart() {\r\n         document.querySelector('.cart').classList.toggle('cart-click');\r\n      },\r\n\r\n      error() {\r\n         let error = document.querySelector('main');\r\n         let errorMsg = document.createElement('div');\r\n         errorMsg.classList.add('error-block');\r\n         errorMsg.innerHTML = ` Не удаётся выполнить запрос к серверу!`;\r\n         error.appendChild(errorMsg);\r\n      }\r\n   },\r\n})\r\n\n\n//# sourceURL=webpack://lesson-8/./src/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/js/main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;