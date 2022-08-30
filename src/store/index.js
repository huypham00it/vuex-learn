import Vue from "vue";
import Vuex from "vuex";

import { ADD_PRODUCT_TO_CART, CHECK_OUT } from "@/constants/mutationTypes";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: {
      items: [],
    },
  },
  getters: {
    cartTotal: (state) => {
      return state.cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
    },
    taxAmount: (state, getters) => (percent) => {
      return getters.cartTotal * (percent / 100);
    },
    getCartItem() {
      return null;
    },
  },
  mutations: {
    [CHECK_OUT](state) {
      state.cart.items = [];
    },
    [ADD_PRODUCT_TO_CART](state, payload) {
      let cartItem = null;

      for (let i = 0; i < state.cart.items.length; i++) {
        if (state.cart.items[i].product.id === payload.product.id) {
          cartItem = state.cart.items[i];
        }
      }

      if (cartItem != null) {
        cartItem.quantity++;
      } else {
        state.cart.items.push({ product: payload.product, quantity: 1 });
      }

      payload.product.inStock--;
    },
  },
  actions: {
    [ADD_PRODUCT_TO_CART]({ commit }, payload) {
      commit(ADD_PRODUCT_TO_CART, { product: payload.product });
    },
  },
  modules: {},
});
