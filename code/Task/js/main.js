const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        search: "",
        catalogUrl: '/catalogData.json',
        basketgUrl: '/getBasket.json',
        products: [],
        productsInBasket: [],
        filtered: [],
        imgCatalog: 'img/Keyboard.jpg',
        show: false,
        value: 1,
        getAllprice: 1,
        allSum: 0
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            if (this.productsInBasket.length == 0) {
                const block = document.getElementsByClassName("ifBasketEmpty")[0];
                const buyBtn = document.getElementsByClassName("buy-btn-in-basket")[0];
                block.classList.add('invisible');
                buyBtn.classList.remove('invisible');
                console.log(block);
            }
            let match = 0;
            this.productsInBasket.forEach(el => {
                if (el.id_product == product.id_product) {
                    match++;
                };
            });
            if (match == 0) {
                this.productsInBasket.push({
                    id_product: product.id_product,
                    product_name: product.product_name,
                    price: product.price,
                    quantity: 1
                });
            } else {
                alert("товар уже в корзине");
            }
        },
        searchItem() {
            const regexp = new RegExp(this.search, 'i');
            filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(element => {
                const block = document.getElementById(element.id_product);
                if (!filtered.includes(element)) {

                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            });
            const search = document.getElementsByClassName("ifNothingFound")[0];
            if (filtered.length == 0) {
                search.classList.remove('invisible');
            } else {
                search.classList.add('invisible');
            }
        },
        deleteItemFromBasket(product) {
            for (let i = 0; i < this.productsInBasket.length; i++) {
                if (this.productsInBasket[i].id_product == product.id_product) {
                    this.productsInBasket.splice(i, 1);
                }
            }
            if (this.productsInBasket.length == 0) {
                const block = document.getElementsByClassName("ifBasketEmpty")[0];
                const buyBtn = document.getElementsByClassName("buy-btn-in-basket")[0];
                block.classList.remove('invisible');
                buyBtn.classList.add('invisible');
                console.log(block);
            }
        },
        showQuantity(item) {
            return item.quantity * item.price;
        },
        AllSum() {
            this.allSum = 0;
            this.productsInBasket.forEach(el => {
                this.allSum += +el.quantity * +el.price;
            });
            return this.allSum;
        },
        numberOfItems() {
            return this.productsInBasket.length;
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`${API + this.basketgUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.productsInBasket.push(el);
                }
            });
    }
})
