"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getProductInfo(product) {
    return `Товар: ${product.title}, ціна: ${product.price} грн, в наявності: ${product.stock ? 'Так' : 'Ні'}`;
}
console.log(getProductInfo({ title: 'Ноутбук', price: 15000, stock: true }));
console.log(getProductInfo({ title: 'Мишка', price: 500, stock: false }));
