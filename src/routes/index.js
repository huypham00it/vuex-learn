import {
  ProductList,
  ViewProduct,
  Cart,
  Product,
  ProductReviews,
  SpecialOffer,
  ViewProfile,
} from "@/components";

export const routes = [
  {
    path: "",
    components: {
      default: ProductList,
      discount: SpecialOffer,
    },
  },
  {
    path: "/products/:productId",
    name: "product",
    props: true,
    component: Product,
    children: [
      {
        path: "details",
        name: "viewProduct",
        props: true,
        component: ViewProduct,
      },
      {
        path: "reviews",
        name: "productReviews",
        props: true,
        component: ProductReviews,
      },
    ],
  },
  {
    path: "/user/profile",
    name: "viewProfile",
    component: ViewProfile,
    meta: {
      isAuthRequired: true,
    },
  },
  { path: "/cart", component: Cart },
  { path: "*", component: { template: "<h1>Page Not Found!</h1>" } },
];
