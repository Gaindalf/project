Vue.component('cart', {
    props: ['items'],
    template: `<div class="formForBasket-item">
    
                    <cart-item v-for="item of items"
                        :key="item.id_product"
                        :prod="item"></cart-item>
                </div>`
});
Vue.component('cart-item', {
    props: ['prod'],
    template: ` <div class="product-item">
                    <div class="desc">
                        <h3>{{ prod.product_name }}</h3>
                        <p>{{ prod.price }}</p>
                    </div>
                </div>`
});