import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
import MarkInfo from "@/store/modules/MarkInfo";
import ApartInfo from "@/store/modules/ApartInfo";
import AroundInfo from "@/store/modules/AroundInfo";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    APIKey: "5e0611bca47cd2e27cdfec522bab2371",
  },
  getters: {
    getterAPIKey(state) {
      return state.APIKey;
    },
  },
  mutations: {},
  actions: {},
  modules: { MarkInfo, ApartInfo, AroundInfo },
});
