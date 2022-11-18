const MarkInfo = {
  namespaced: true,
  state: {
    attLoc: [],
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
    getLocAttLoc: function (state) {
      return state.attLoc;
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
    ADD_ATT_LOC(state, item) {
      state.attLoc.push(item);
    },
    SUB_ATT_LOC(state, index) {
      state.attLoc.splice(index, 1);
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
