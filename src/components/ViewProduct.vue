<template>
  <div>
    <p><strong>ID:</strong> {{ product.id }}</p>
    <p>
      <strong>Price:</strong> {{ (product.price - discount) | currency }}
      <span v-if="discount > 0">(save {{ discount | currency }})</span>
    </p>
    <p><strong>In stock:</strong> {{ product.inStock }}</p>
    <p>{{ product.description }}</p>

    <button @click="addProductToCart">Add to cart</button>
  </div>
</template>

<script>
import products from "@/data/products";
import { ADD_PRODUCT_TO_CART } from "@/constants/mutationTypes";

export default {
  props: {
    productId: {
      required: true,
    },
  },
  data() {
    return {
      products: products,
      product: null,
      discount: 0,
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
  created() {
    this.product = this.getProduct(this.productId);

    if (typeof this.$route.query.discount !== "undefined") {
      this.discount = this.getDiscount(
        this.product.price,
        this.$route.query.discount
      );
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.discount = this.getDiscount(this.product.price, to.query.discount);
    this.product = this.getProduct(to.params.productId);

    next();
  },
  methods: {
    getProduct(productId) {
      let match = null;

      this.products.forEach(function (product) {
        if (product.id == productId) {
          match = product;
        }
      });

      return match;
    },
    getDiscount(originalPrice, percentage) {
      if (!percentage) {
        return 0;
      }

      return (originalPrice * percentage) / 100;
    },
    [ADD_PRODUCT_TO_CART]() {
      this.$store.dispatch(ADD_PRODUCT_TO_CART, { product: this.product });
    },
  },
};
</script>
