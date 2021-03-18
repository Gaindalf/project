Vue.component('cart', {
    props: ["items"],
    template: `<div class="formForBasket-item">
    
                    <div v-for="item of items">
                    <p>name </p>
                    </div>
                </div>`
});
