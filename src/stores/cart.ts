import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: [],
        storeInfo: {
            storeId: null,
            
        }
    }),
    getters:{
        cartTotal:(state) =>{
            return state.cart.reduce((acc, item) => acc + parseFloat(item.price.replace("R$","").replace(",",'.')) * item.quantity, 0);
        }
    },
    actions: {
        setStoreInfo(storeId) {
            this.storeInfo.storeId = storeId;      
        },
        addToCart(product) {
            const item = this.cart.find(item => item.id === product.id);
            if (item) {
                item.quantity += product.quantity;
            } else {
                this.cart.push(product);
            }
        },
        removeFromCart(productId) {
            const index = this.cart.findIndex(item => item.id === productId);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        },
        clearCart() {
            this.cart = [];
            this.storeInfo = {
              storeId: null,
              storeName: ''
            };
        }
    }
});