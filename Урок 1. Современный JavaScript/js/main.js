const products = [
    { id: 1, title: 'Notebook', price: 2000, img: 'images/products/LENOVO_LEGION.jpg' },
    { id: 2, title: 'Mouse', price: 20, img: 'images/products/Mouse.jpg' },
    { id: 3, title: 'Keyboard', price: 200, img: 'images/products/Keyboard.jpg' },
    { id: 4, title: 'Gamepad', price: 50, img: 'images/products/Gamepad.jpg' },
];
//Функция для формирования верстки каждого товара
const renderProduct = (product) => {
    return `<div class="product-item">
                <img src="${product.img}" alt="Pictures">
                <h3>${product.title}</h3>
                <p class="product-text">Здесь будет немного текста описывающего продукт. Здесь будет немного текста описывающего продукт. Здесь будет немного текста описывающего продукт.</p>
                <p>${product.price} $</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(...productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);