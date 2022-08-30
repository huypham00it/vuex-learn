<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h1>Cart</h1>

    <table v-if="cart.items.length > 0" class="table table-striped">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in cart.items" :key="index">
          <td>{{ item.name }}</td>
          <td>
            {{ item.quantity }} &nbsp;
            <button
              class="btn btn-success"
              @click="increaseQuantity(item)"
              :disabled="item.inStock == 0"
            >
              +
            </button>
            <button class="btn btn-danger" @click="decreaseQuantity(item)">
              -
            </button>
          </td>
          <td>
            {{ (item.quantity * item.product.price) | currency }}
          </td>
        </tr>

        <tr>
          <td class="text-right" colspan="2">
            <strong>Subtotal</strong>
          </td>

          <td>{{ cartTotal | currency }}</td>
        </tr>

        <tr>
          <td class="text-right" colspan="2">
            <strong>Taxes</strong>
          </td>

          <td>{{ taxAmount(10) | currency }}</td>
        </tr>

        <tr>
          <td class="text-right" colspan="2">
            <strong>Grand total</strong>
          </td>

          <td>{{ (cartTotal + taxAmount(10)) | currency }}</td>
        </tr>

        <tr>
          <td colspan="2"></td>
          <td>
            <button class="btn btn-success" @click="checkout">Checkout</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Your cart is currently empty.</p>
  </div>
</template>

<script>
// import CartMixin from "@/mixins/cart";

import { mapGetters, mapMutations } from "vuex";
import { CHECK_OUT } from "@/constants/mutationTypes";

export default {
  props: ["cart"],
  // mixins: [CartMixin],
  computed: {
    ...mapGetters(["cartTotal", "taxAmount"]),
    // cart() {
    //   return this.$store.state.cart;
    // },
    // cartTotal() {
    //   return this.$store.getters.cartTotal;
    // },
    // taxAmount() {
    //   return this.$store.getters.taxAmount(10);
    // },
  },
  beforeRouteLeave(to, from, next) {
    if (this.cart.items.length > 0) {
      if (!confirm("Are you sure you don't want to buy these products?")) {
        return next(false);
      }
    }

    next();
  },
  methods: {
    ...mapMutations([CHECK_OUT]),
    increaseQuantity(cartItem) {
      cartItem.product.inStock--;
      cartItem.quantity++;
    },

    decreaseQuantity(cartItem) {
      cartItem.quantity--;
      cartItem.product.inStock++;

      if (cartItem.quantity == 0) {
        this.removeItemFromCart(cartItem);
      }
    },
  },
};
</script>
