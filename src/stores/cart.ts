import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: [],
        storeInfo: {
            storeId: null,
        }
    }),
    getters: {
        cartTotal: (state) => {
            return state.cart.reduce((acc, item) => acc + parseFloat(item.price.replace("R$", "").replace(",", '.')) * item.quantity, 0);
        }
    },
    actions: {
        loadCartFromLocalStorage() {
            const cartData = localStorage.getItem('cart');
            if (cartData) {
                this.cart = JSON.parse(cartData);
            }

            const storeInfoData = localStorage.getItem('storeInfo');
            if (storeInfoData) {
                this.storeInfo = JSON.parse(storeInfoData);
            }
        },
        addToCart({ id, title, price, quantity }) {
            const item = this.cart.find(item => item.id === id);
            if (item) {
                item.quantity += quantity;
            } else {
                this.cart.push({ id, title, price, quantity });
            }
            this.saveCartToLocalStorage();
        },
        saveCartToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
            localStorage.setItem('storeInfo', JSON.stringify(this.storeInfo));
        },
        setStoreInfo(storeId) {
            this.storeInfo.storeId = storeId;
            this.saveCartToLocalStorage();
        },
        removeFromCart(productId) {
            const index = this.cart.findIndex(item => item.id === productId);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
            this.saveCartToLocalStorage();
        },
        clearCart() {
            this.cart = [];
            this.storeInfo = {
                storeId: null,
            };
            this.saveCartToLocalStorage();
        },
        
    }
});
