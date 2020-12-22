class Catalog {
    count = 1

    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000, img: 'images/products/LENOVO_LEGION.jpg' },
            { id: 2, title: 'Mouse', price: 20, img: 'images/products/Mouse.jpg' },
            { id: 3, title: 'Keyboard', price: 200, img: 'images/products/Keyboard.jpg' },
            { id: 4, title: 'Gamepad', price: 50, img: 'images/products/Gamepad.jpg' },
        ];
    }

    SumGoods() {
        const sum = this.goods.reduce((sum, good) => {
            return sum + good.price * good.count
        }, 0)

        const block = document.createElement('div')
        block.classList.add('cart__sum')
        block.innerHTML = `Суммарная цена: ${sum} $`
    }


    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
    }

    render() {
        const { img, title, price, } = this
        return `<div class="product-item">
                    <img src="${img}" alt="Pictures">
                    <h3>${title}</h3>
                    <p class="product-text">Здесь будет немного текста описывающего продукт. Здесь будет немного текста описывающего продукт. Здесь будет немного текста описывающего продукт.</p>
                    <p>${price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>`
    }
}


class CartItem {
    constructor() {

    }

    render() {

    }
}

class Cart {
    constructor() {
        this.init();
    }

    init() {
        const link = document.querySelector('.btn-cart')

        const block = document.querySelector('main')
        const list = document.createElement('div')
        list.classList.add('cart')

        link.addEventListener('click', () => {
            list.classList.toggle('cart-click')
        })

        block.insertBefore(list, block.children[0])

        this.render()
    }

    getEmptyTemplate() {
        const block = document.createElement('div')
        block.classList.add('cart__empty')
        block.innerHTML = `Нет выбранных товаров`

        return block
    }


    render() {
        const placeToRender = document.querySelector('.cart')
        if (!placeToRender) {
            return
        }

        if (this.length) {
            placeToRender.appendChild(this.SumGoods())
        } else {
            placeToRender.appendChild(this.getEmptyTemplate())
        }
    }
}

const MyCart = new Cart();

let list = new Catalog();
list.render();