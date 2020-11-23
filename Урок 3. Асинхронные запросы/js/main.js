const API = 'https://raw.githubusercontent.com/Ded-Alex-coder/JavaScript_Level-2/main/responses';

class List {

    constructor(url, container, list = list2) {
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this._init();
    }
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    handleData(data) {
        this.goods = [...data];
        this.render();
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new this.list[this.constructor.name](product);//мы сделали объект товара либо CartItem, либо ProductItem
            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    _init() {
        return false
    }
}

class Item {
    constructor(el, img = 'https://placehold.it/200x150') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }
    render() {//генерация товара для каталога товаров
        const { img, product_name, price, id_product } = this
        return `<div class="product-item" data-id="${id_product}">
                <img src="${img}" alt="Some img">
                <div class="desc">
                    <h3>${product_name}</h3>
                    <p class="product-text">Здесь будет немного текста описывающего продукт. Здесь будет немного текста описывающего продукт. Здесь будет немного текста описывающего продукт.</p>
                    <p>${price} $</p>
                    <button class="buy-btn"
                    data-id="${id_product}"
                    data-name="${product_name}"
                    data-price="${price}">Купить</button>
                </div>
            </div>`
    }
}

class Catalog extends List {

    constructor(cart, container = '.products', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                //                console.log(e.target);
                this.cart.addProduct(e.target);
            }
        });

    }
}

class ProductItem extends Item { }

class Cart extends List {
    constructor(container = ".cart", url = "/getBasket.json") {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }
    addProduct(element) {

        let productId = +element.dataset['id'];
        let find = this.allProducts.find(product => product.id_product === productId);
        if (find) {
            find.quantity++;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price: +element.dataset['price'],
                product_name: element.dataset['name'],
                quantity: 1
            };
            this.goods = [product];
            this.render();
        }

    }
    removeProduct(element) {

        let productId = +element.dataset['id'];
        let find = this.allProducts.find(product => product.id_product === productId);
        if (find.quantity > 1) {
            find.quantity--;
            this._updateCart(find);
        } else {
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
        }

    }
    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `= ${product.quantity * product.price} $`;
    }

    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('cart-click');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target);
            }
        })
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('add-btn')) {
                this.addProduct(e.target);
            }
        })
    }

}

class CartItem extends Item {
    constructor(el, img = 'https://placehold.it/100x100') {
        super(el, img);
        this.quantity = el.quantity;
    }
    render() {
        const { img, product_name, price, id_product, quantity } = this
        return `<div class="cart-item" data-id="${id_product}">
            <div class="product-bio">
            <img src="${img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${product_name}</p>
            <p class="product-single-price">$${price}</p>  
            <div class="quantity">
            <button class="del-btn" data-id="${id_product}">-</button>
            <p class="product-quantity">Quantity: ${quantity}</p>
            <button class="add-btn" data-id="${id_product}">+</button>            
            </div>      
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">= ${quantity * price} $</p>
        </div>
        </div>`
    }
}
const list2 = {
    Catalog: ProductItem,
    Cart: CartItem
};
let cart = new Cart();
let products = new Catalog(cart);