import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
// import DealMap from "@/components/deal/DealMap";
import DealDetail from "@/components/deal/DealDetail";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    // component: DealMap,
    // component: HomeView,
    component: DealDetail,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
