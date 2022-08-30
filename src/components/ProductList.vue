<template>
  <div id="products" class="row list-group">
    <div
      v-for="(product, index) in products"
      class="item col-xs-4"
      :key="index"
    >
      <div class="thumbnail">
        <img
          @click="clickedImage(product)"
          class="group list-group-image"
          src="//cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png?format=webp&v=1530129113"
        />
        <div class="caption">
          <router-link
            :to="{
              name: 'viewProduct',
              params: { productId: product.id },
              hash: '#related',
            }"
            tag="h4"
            class="group inner list-group-item-heading"
          >
            <a>{{ product.name }}</a>
          </router-link>

          <p class="group inner list-group-item-text">
            {{ product.description }}
          </p>
          <br />

          <div class="row flex flex-row align-center">
            <div class="col-xs-4">
              <p class="lead">{{ product.price | currency }}</p>
            </div>

            <div class="col-xs-8 flex flex-row align-center justify-right">
              <div
                class="number-in-stock"
                :class="{
                  few: product.inStock < 10 && product.inStock > 0,
                  none: product.inStock == 0,
                }"
              >
                {{ product.inStock }} in stock
              </div>
              <button
                class="btn btn-success"
                @click="addProductToCart(product)"
                :disabled="product.inStock == 0"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import products from "@/data/products";
import { ADD_PRODUCT_TO_CART } from "@/constants/mutationTypes";

export default {
  mounted() {
    console.log(products);
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
  data() {
    return {
      products: products,
    };
  },
  methods: {
    [ADD_PRODUCT_TO_CART](product) {
      this.$store.commit("addProductToCart", { product });
    },
    clickedImage(product) {
      this.$router.push({
        name: "viewProduct",
        params: {
          productId: product.id,
        },
        query: {
          discount: 10,
        },
      });
    },
  },
};
</script>

<style>
#products .item img {
  background-color: #000;
}
#products .item p.lead {
  margin-bottom: 0;
}
#products .item .number-in-stock {
  margin-right: 10px;
}
#products .item .number-in-stock.few {
  color: #e0a14f;
}
#products .item .number-in-stock.none {
  color: #c45e5e;
}
</style>
