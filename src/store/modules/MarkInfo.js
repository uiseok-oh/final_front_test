const MarkInfo = {
  namespaced: true,
  state: {
    attLocX: 0.0,
    attLocY: 0.0,
    curLocX: 0.0,
    curLocY: 0.0,
    hospitals: [],
    restaurants: [],
    schools: [],
    stores: [],
    subs: [],
  },
  getters: {
    getLocHospitalInfo: function (state) {
      return state.hospitals;
    },
    getLocRestaurantInfo: function (state) {
      return state.restaurants;
    },
    getLocSchoolInfo: function (state) {
      return state.schools;
    },
    getLocStoreInfo: function (state) {
      return state.stores;
    },
    getLocSubInfo: function (state) {
      return state.subs;
    },
    getLocAttLocX: function (state) {
      return state.attLocX;
    },
    getLocAttLocY: function (state) {
      return state.attLocY;
    },
    getLocCurLocX: function (state) {
      return state.curLocX;
    },
    getLocCurLocY: function (state) {
      return state.curLocY;
    },
  },
  mutations: {
    SET_HOSPITAL_INFO(state, info) {
      state.hospitals = info;
    },
    SET_HOSPITAL_INIT(state) {
      state.hospitals = null;
    },
    SET_RESTAURANT_INFO(state, info) {
      state.restaurants = info;
    },
    SET_RESTAURANT_INIT(state) {
      state.restaurants = null;
    },
    SET_SCHOOL_INFO(state, info) {
      state.schools = info;
    },
    SET_SCHOOL_INIT(state) {
      state.schools = null;
    },
    SET_STORE_INFO(state, info) {
      state.stores = info;
    },
    SET_STORE_INIT(state) {
      state.stores = null;
    },
    SET_SUB_INFO(state, info) {
      state.subs = info;
    },
    SET_SUB_INIT(state) {
      state.subs = null;
    },
    SET_ATT_LOCX(state, x) {
      state.attLocX = x;
    },
    SET_ATT_LOCY(state, y) {
      state.attLocY = y;
    },
    SET_CUR_LOCX(state, x) {
      state.curLocX = x;
    },
    SET_CUR_LOCY(state, y) {
      state.curLocY = y;
    },
  },
  actions: {},
};

export default MarkInfo;
