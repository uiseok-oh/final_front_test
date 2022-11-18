const AroundInfo = {
  namespaced: true,
  state: {
    allList: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    list0: [],
    list1: [],
    list2: [],
    list3: [],
    list4: [],
    list5: [],
    list6: [],
    list7: [],
    list8: [],
    list9: [],
    list10: [],
    list11: [],
    list12: [],
    list13: [],
    list14: [],
    list15: [],
    list16: [],
    list17: [],
  },
  getters: {
    getAllList: function (state) {
      return state.allList;
    },
  },

  mutations: {
    SET_HOUSE_INFO(state, arr) {
      let index = arr[0];
      let list = arr[1];
      state.allList[index] = list;
      switch (index) {
        case 0:
          state.list0 = list;
          break;
        case 1:
          state.list1 = list;
          break;
        case 2:
          state.list2 = list;
          break;
        case 3:
          state.list3 = list;
          break;
        case 4:
          state.list4 = list;
          break;
        case 5:
          state.list5 = list;
          break;
        case 6:
          state.list6 = list;
          break;
        case 7:
          state.list7 = list;
          break;
        case 8:
          state.list8 = list;
          break;
        case 9:
          state.list9 = list;
          break;
        case 10:
          state.list10 = list;
          break;
        case 11:
          state.list11 = list;
          break;
        case 12:
          state.list12 = list;
          break;
        case 13:
          state.list13 = list;
          break;
        case 14:
          state.list14 = list;
          break;
        case 15:
          state.list15 = list;
          break;
        case 16:
          state.list16 = list;
          break;
        case 17:
          state.list17 = list;
          break;
      }
    },
  },
  actions: {
    getSearch({ commit }, arr) {
      let kakao = window.kakao;
      let places = new kakao.maps.services.Places();
      let code = arr[0];
      let index = arr[1];
      let lat = arr[2];
      let lng = arr[3];
      console.log(code);
      console.log(index);
      console.log(lat);
      console.log(lng);
      places.categorySearch(
        code,
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            console.log(result);
            commit("SET_HOUSE_INFO", [index, result]);
          }
        },
        {
          location: new kakao.maps.LatLng(lat, lng),
        }
      );
    },
  },
};
export default AroundInfo;
