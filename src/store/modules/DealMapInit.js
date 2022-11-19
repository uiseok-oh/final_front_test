const DealMapInit = {
  namespaced: true,
  state: {
    initLocX: 37.53386598076245, //초기값. 단 한 번 사용함. map 생성시에만,
    initLocY: 126.98038139595434, //초기값. 단 한 번 사용함. map 생성시에만
  },
  getters: {
    getInitLocX(state) {
      return state.initLocX;
    },
    getInitLocY(state) {
      return state.initLocY;
    },
  },

  mutations: {
    SET_INIT_LOCX(state, x) {
      state.initLocX = x;
    },
    SET_INIT_LOCY(state, y) {
      state.initLocY = y;
    },
  },
};
export default DealMapInit;
