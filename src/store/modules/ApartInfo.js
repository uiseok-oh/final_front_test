const ApartInfo = {
  namespaced: true,
  state: {
    attHouse: [],
    houseInfo: {
      //   houseCode: 0,
      //   houseName: "",
      //   buildYear: 0,
      //   jibun: "",
      //   lat: 0.0,
      //   lng: 0.0,
      houseCode: 0,
      houseName: "더펜트하우스청담",
      buildYear: 2022,
      jibun: "서울특별시 강남구 청담동 129",
      lat: 37.525458, //x?
      lng: 127.0537, //y???
    },
    houseDeal: [
      {
        dealCode: "0",
        dealPrice: "1680000",
        dealYear: "2022",
        dealMonth: "1",
        dealday: "22",
        area: "145m",
        floor: "2층",
      },
      {
        dealCode: "0",
        dealPrice: "1680000",
        dealYear: "2022",
        dealMonth: "1",
        dealday: "22",
        area: "145m",
        floor: "2층",
      },
      {
        dealCode: "0",
        dealPrice: "1680000",
        dealYear: "2022",
        dealMonth: "1",
        dealday: "22",
        area: "145m",
        floor: "2층",
      },
      {
        dealCode: "0",
        dealPrice: "1680000",
        dealYear: "2022",
        dealMonth: "1",
        dealday: "22",
        area: "145m",
        floor: "2층",
      },
    ],
  },
  getters: {
    getHouseInfo: function (state) {
      return state.houseInfo;
    },
    getHouseDeal: function (state) {
      return state.houseDeal;
    },
    getAttHouse: function (state) {
      return state.attHouse;
    },
  },

  mutations: {
    SET_HOUSE_INFO(state, info) {
      state.houseInfo = info;
    },
    SET_HOUSE_DEAL(state, deal) {
      state.houseDeal = deal;
    },
    ADD_ATT_HOUSE(state, house) {
      state.attHouse.push(house);
    },

    SUB_ATT_HOUSE(state, house) {
      for (let i = 0; i < state.attHouse.length; i++) {
        if (state.attHouse[i].dealCode == house.dealCode) {
          state.attHouse.splice(i, 1);
        }
      }
    },
  },
};
export default ApartInfo;
