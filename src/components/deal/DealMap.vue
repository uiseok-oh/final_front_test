<template>
  <div class="map_wrap" style="width: 100%; height: 500px">
    <div ref="map" style="width: 100%; height: 100%; position: relative; overflow: hidden"></div>

    <b-form-checkbox-group
      class="custom_typecontrol veltical"
      id="checkbox-group-1"
      v-model="selected"
      name="location"
      style="background: white; height: 15px; width: 210px"
    >
      <b-form-checkbox @click.native="setMapUpdate" value="hospital">병원</b-form-checkbox>
      <b-form-checkbox @click.native="setMapUpdate" value="restaurant">음식점</b-form-checkbox>
      <b-form-checkbox @click.native="setMapUpdate" value="school">학교</b-form-checkbox>
      <b-form-checkbox @click.native="setMapUpdate" value="mart">마트</b-form-checkbox>
      <b-form-checkbox @click.native="setMapUpdate" value="sub">지하철</b-form-checkbox>
    </b-form-checkbox-group>
    <div class="overlab3">
      <b-button pill variant="outline-secondary" @click="onOff" size="sm">매매 필터</b-button>
    </div>
    <div id="rightTag" class="overlab" v-show="tabView">
      <b-button pill variant="danger" size="sm" @click="addAtt">내 관심지역 추가</b-button>
    </div>
    <div class="overlab2" style="background-color: white">
      <vue-slider
        id="range"
        v-model="value"
        v-show="slideView"
        :order="false"
        :min="0"
        :max="10000"
        :clickable="false"
        @drag-end="rangeDrag"
      />
    </div>
    <DealDetailVue class="overlab4" v-if="modalView" />
    <b-form-input
      v-model="keyword"
      @keyup="searchFunc"
      class="overlab5"
      size="sm"
      placeholder="검색"
    ></b-form-input>
    <b-list-group v-show="searchView" class="overlab6" id="placesList">
      <b-list-group-item v-for="item in searchList" :key="item.id" @click="moveMap(item)" href="#">
        <div style="display: flex">
          <div style="width: 70%">{{ item.place_name }}</div>
          <div style="width: 30%; font-size: 10pt; line-height: 10pt">
            {{ item.category_group_name }}
          </div>
        </div>
        <div style="font-size: 10pt">{{ item.address_name }}</div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import DealDetailVue from "./DealDetail.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import hospitalImg from "@/assets/images/hospital.png";
import restaurantImg from "@/assets/images/restaurant.png";
import schoolImg from "@/assets/images/school.png";
import storeImg from "@/assets/images/store.png";
import subImage from "@/assets/images/subway.png";
import { mapMutations, mapGetters } from "vuex";
const MarkInfo = "MarkInfo";
const optionNames = ["hospital", "restaurant", "school", "mart", "sub"];

function searchDetailAddrFromCoords(coords, callback) {
  let kakao = window.kakao;
  let geocoder = new kakao.maps.services.Geocoder();
  geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

export default {
  name: "DealMap",

  data() {
    return {
      searchList: [],
      keyword: "",
      searchView: false,
      rightLoc: { city: "", gu: "" },
      tabView: false,
      slideView: false,
      modalView: false,
      map: null, //mapInstance 저장값 가장 중요!!!
      selected: [],
      value: [0, 10000],
      locX: 37.53386598076245, //초기값. 단 한 번 사용함. map 생성시에만
      locY: 126.98038139595434, //초기값. 단 한 번 사용함. map 생성시에만
      hospitalMarker: [],
      restaurantMarker: [],
      schoolMarker: [],
      storeMarker: [],
      subMarker: [],
    };
  },
  components: {
    VueSlider,
    DealDetailVue,
  },

  computed: {
    ...mapGetters(MarkInfo, [
      "getLocHospitalInfo",
      "getLocRestaurantInfo",
      "getLocSchoolInfo",
      "getLocStoreInfo",
      "getLocSubInfo",
      "getLocAttLoc",
      "getLocCurLocX",
      "getLocCurLocY",
    ]),
  },
  mounted() {
    let kakao = window.kakao;
    console.log(this.$refs.map); //should be not null
    let mapContainer = this.$refs.map;
    let startX = this.locX;
    let startY = this.locY;

    let mapOption = {
      center: new kakao.maps.LatLng(startX, startY), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const mapInstance = new kakao.maps.Map(mapContainer, mapOption);
    console.log(mapInstance);
    this.map = mapInstance;

    kakao.maps.event.addListener(mapInstance, "rightclick", (mouseEvent) => {
      document
        .getElementById("rightTag")
        .setAttribute(
          "style",
          `position: absolute; top: ${mouseEvent.point.y}px;left: ${mouseEvent.point.x}px;z-index: 1; `
        );
      this.tabView = true;
      this.modalView = false;
      this.searchView = false;
      // console.log(mouseEvent.latLng);
      this.coordToLocationStore(mouseEvent.latLng);
    });
    kakao.maps.event.addListener(mapInstance, "click", () => {
      this.tabView = false;
      this.modalView = false;

      this.searchView = false;
    });

    kakao.maps.event.addListener(mapInstance, "dragend", () => {
      let latlng = mapInstance.getCenter();
      let message = "변경된 지도 중심좌표는 " + latlng.getLat() + " 이고, ";
      message += "경도는 " + latlng.getLng() + " 입니다";
      this.SET_CUR_LOCX(latlng.getLat());
      this.SET_CUR_LOCY(latlng.getLng());
      this.tabView = false;
      this.modalView = false;
      this.searchView = false;
      console.log(message);
      this.allOptionCheck();
    });
  },

  methods: {
    ...mapMutations(MarkInfo, [
      "SET_HOSPITAL_INFO",
      "SET_HOSPITAL_INIT",
      "SET_RESTAURANT_INFO",
      "SET_RESTAURANT_INIT",
      "SET_SCHOOL_INFO",
      "SET_SCHOOL_INIT",
      "SET_STORE_INFO",
      "SET_STORE_INIT",
      "SET_SUB_INFO",
      "SET_SUB_INIT",
      "ADD_ATT_LOC",
      "SET_CUR_LOCX",
      "SET_CUR_LOCY",
    ]),

    ///////////////////////다양한 옵션 설정///////////////////////
    allOptionCheck() {
      for (let i = 0; i < optionNames.length; i++) {
        console.log(optionNames[i]);
        console.log(this.selected.includes(optionNames[i]));
        let info = optionNames[i];
        let boolean = this.selected.includes(optionNames[i]);
        if (boolean === true) {
          switch (info) {
            case "hospital":
              this.eraseHospitalMarkers();
              this.getHospitalMarkers();
              break;
            case "restaurant":
              this.eraseRestaurantMarkers();
              this.getRestaurantMarkers();
              break;
            case "school":
              this.eraseSchoolMarkers();
              this.getSchoolMarkers();
              break;
            case "mart":
              this.eraseStoreMarkers();
              this.getStoreMarkers();
              break;
            case "sub":
              this.eraseSubMarkers();
              this.getSubMarkers();
              break;
          }
        } else {
          switch (info) {
            case "hospital":
              this.eraseHospitalMarkers();
              this.SET_HOSPITAL_INIT();
              break;
            case "restaurant":
              this.eraseRestaurantMarkers();
              this.SET_RESTAURANT_INIT();
              break;
            case "school":
              this.eraseSchoolMarkers();
              this.SET_SCHOOL_INIT();
              break;
            case "mart":
              this.eraseStoreMarkers();
              this.SET_STORE_INIT();
              break;
            case "sub":
              this.eraseSubMarkers();
              this.SET_SUB_INIT();
              break;
          }
        }
      }
    },

    rangeDrag() {
      console.log(this.value);
    },
    setMapUpdate(evt) {
      let boolean = !this.selected.includes(evt.target.value);
      let info = evt.target.value;
      if (!this.isEmpty(info)) {
        if (boolean === true) {
          switch (info) {
            case "hospital":
              this.eraseHospitalMarkers();
              this.getHospitalMarkers();
              break;
            case "restaurant":
              this.eraseRestaurantMarkers();
              this.getRestaurantMarkers();
              break;
            case "school":
              this.eraseSchoolMarkers();
              this.getSchoolMarkers();
              break;
            case "mart":
              this.eraseStoreMarkers();
              this.getStoreMarkers();
              break;
            case "sub":
              this.eraseSubMarkers();
              this.getSubMarkers();
              break;
          }
        } else {
          switch (info) {
            case "hospital":
              this.eraseHospitalMarkers();
              this.SET_HOSPITAL_INIT();
              break;
            case "restaurant":
              this.eraseRestaurantMarkers();
              this.SET_RESTAURANT_INIT();
              break;
            case "school":
              this.eraseSchoolMarkers();
              this.SET_SCHOOL_INIT();
              break;
            case "mart":
              this.eraseStoreMarkers();
              this.SET_STORE_INIT();
              break;
            case "sub":
              this.eraseSubMarkers();
              this.SET_SUB_INIT();
              break;
          }
        }
      }
    },

    ///////////////////마커 불러오기
    getHospitalMarkers() {
      let kakao = window.kakao;
      const mapInstance = this.map;

      let ps = new window.kakao.maps.services.Places(mapInstance);

      const placesSearchCB = (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let tmp = [];
          for (var i = 0; i < data.length; i++) {
            tmp.push(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          this.SET_HOSPITAL_INFO(tmp);
        }
        //마커생성관련 만들기
        this.createHospitalMarkers();
      };
      ps.categorySearch("HP8", placesSearchCB, { useMapBounds: true });
    },
    getRestaurantMarkers() {
      let kakao = window.kakao;
      const mapInstance = this.map;

      let ps = new window.kakao.maps.services.Places(mapInstance);

      const placesSearchCB = (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let tmp = [];
          for (var i = 0; i < data.length; i++) {
            tmp.push(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          this.SET_RESTAURANT_INFO(tmp);
        }
        //마커생성관련 만들기
        this.createRestaurantMarkers();
      };
      ps.categorySearch("FD6", placesSearchCB, { useMapBounds: true });
    },
    getSchoolMarkers() {
      let kakao = window.kakao;
      const mapInstance = this.map;

      let ps = new window.kakao.maps.services.Places(mapInstance);

      const placesSearchCB = (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let tmp = [];
          for (var i = 0; i < data.length; i++) {
            tmp.push(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          this.SET_SCHOOL_INFO(tmp);
        }
        //마커생성관련 만들기
        this.createSchoolMarkers();
      };
      ps.categorySearch("SC4", placesSearchCB, { useMapBounds: true });
    },
    getStoreMarkers() {
      let kakao = window.kakao;
      const mapInstance = this.map;

      let ps = new window.kakao.maps.services.Places(mapInstance);

      const placesSearchCB = (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let tmp = [];
          for (var i = 0; i < data.length; i++) {
            tmp.push(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          this.SET_STORE_INFO(tmp);
        }
        //마커생성관련 만들기
        this.createStoreMarkers();
      };
      ps.categorySearch("CS2", placesSearchCB, { useMapBounds: true });
    },
    getSubMarkers() {
      let kakao = window.kakao;
      const mapInstance = this.map;

      let ps = new window.kakao.maps.services.Places(mapInstance);

      const placesSearchCB = (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let tmp = [];
          for (var i = 0; i < data.length; i++) {
            tmp.push(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          this.SET_SUB_INFO(tmp);
        }
        //마커생성관련 만들기
        this.createSubMarkers();
      };
      ps.categorySearch("SW8", placesSearchCB, { useMapBounds: true });
    },
    /////////////////////마커 생성
    createHospitalMarkers() {
      let markerImageSrc = hospitalImg;
      let kakao = window.kakao;
      let hospitalInfo = this.getLocHospitalInfo;

      if (hospitalInfo === null) return;
      this.hospitalMarker = [];
      for (var i = 0; i < hospitalInfo.length; i++) {
        let imageSize = new kakao.maps.Size(44, 44),
          imageOptions = {};

        let markerImage = this.createMarkerImage(markerImageSrc, imageSize, imageOptions);
        let marker = this.createMarker(hospitalInfo[i], markerImage);

        this.hospitalMarker.push(marker);
        this.hospitalMarker[i].setMap(this.map);
      }
    },
    createRestaurantMarkers() {
      let markerImageSrc = restaurantImg;
      let kakao = window.kakao;
      let restaurantInfo = this.getLocRestaurantInfo;

      if (restaurantInfo === null) return;
      this.restaurantMarker = [];
      for (var i = 0; i < restaurantInfo.length; i++) {
        let imageSize = new kakao.maps.Size(44, 44),
          imageOptions = {};

        let markerImage = this.createMarkerImage(markerImageSrc, imageSize, imageOptions);
        let marker = this.createMarker(restaurantInfo[i], markerImage);

        this.restaurantMarker.push(marker);
        this.restaurantMarker[i].setMap(this.map);
      }
    },
    createSchoolMarkers() {
      let markerImageSrc = schoolImg;
      let kakao = window.kakao;
      let schoolInfo = this.getLocSchoolInfo;

      if (schoolInfo === null) return;
      this.schoolMarker = [];
      for (var i = 0; i < schoolInfo.length; i++) {
        let imageSize = new kakao.maps.Size(44, 44),
          imageOptions = {};

        let markerImage = this.createMarkerImage(markerImageSrc, imageSize, imageOptions);
        let marker = this.createMarker(schoolInfo[i], markerImage);

        this.schoolMarker.push(marker);
        this.schoolMarker[i].setMap(this.map);
      }
    },
    createStoreMarkers() {
      let markerImageSrc = storeImg;
      let kakao = window.kakao;
      let storeInfo = this.getLocStoreInfo;

      if (storeInfo === null) return;
      this.storeMarker = [];
      for (var i = 0; i < storeInfo.length; i++) {
        let imageSize = new kakao.maps.Size(44, 44),
          imageOptions = {};

        let markerImage = this.createMarkerImage(markerImageSrc, imageSize, imageOptions);
        let marker = this.createMarker(storeInfo[i], markerImage);

        this.storeMarker.push(marker);
        this.storeMarker[i].setMap(this.map);
      }
    },
    createSubMarkers() {
      let markerImageSrc = subImage;
      let kakao = window.kakao;
      let subInfo = this.getLocSubInfo;

      if (subInfo === null) return;
      this.subMarker = [];

      for (var i = 0; i < subInfo.length; i++) {
        let imageSize = new kakao.maps.Size(44, 44),
          imageOptions = {};

        let markerImage = this.createMarkerImage(markerImageSrc, imageSize, imageOptions);
        let marker = this.createMarker(subInfo[i], markerImage);

        this.subMarker.push(marker);
        this.subMarker[i].setMap(this.map);
      }
    },
    ////////////////마커제거/////////////////
    eraseSubMarkers() {
      let markers = this.subMarker;
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    },
    eraseHospitalMarkers() {
      let markers = this.hospitalMarker;
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    },
    eraseRestaurantMarkers() {
      let markers = this.restaurantMarker;
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    },
    eraseSchoolMarkers() {
      let markers = this.schoolMarker;
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    },
    eraseStoreMarkers() {
      let markers = this.storeMarker;
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    },

    /////////////////////////////// 잡다한 ETC 함수
    isEmpty(str) {
      if (typeof str == "undefined" || str == null || str == "") return true;
      else return false;
    },
    createMarkerImage(src, size, options) {
      let kakao = window.kakao;
      var markerImage = new kakao.maps.MarkerImage(src, size, options);
      return markerImage;
    },
    createMarker(position, image) {
      let kakao = window.kakao;
      var marker = new kakao.maps.Marker({
        position: position,
        image: image,
      });

      return marker;
    },
    onOff() {
      this.slideView = !this.slideView;
    },

    coordToLocationStore(latLng) {
      let kakao = window.kakao;
      searchDetailAddrFromCoords(latLng, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result[0]);
          this.rightLoc.city = result[0].address.region_1depth_name;
          this.rightLoc.gu = result[0].address.region_2depth_name;
        }
      });
    },
    addAtt() {
      let tmpObj = { city: this.rightLoc.city, gu: this.rightLoc.gu };
      this.ADD_ATT_LOC(tmpObj);
      this.tabView = false;
      alert("관심지역이 추가되었습니다.");
    },
    setMarkClickEvent(marker) {
      let kakao = window.kakao;
      kakao.maps.event.addListener(marker, "click", (evt) => {
        console.log(evt);
        this.modalView = true;
      });
    },
    moveCenter(x, y) {
      let kakao = window.kakao;
      let moveLatLon = new kakao.maps.LatLng(x, y);
      this.SET_CUR_LOCX(x);
      this.SET_CUR_LOCY(y);
      this.map.panTo(moveLatLon);
    },
    searchFunc(event) {
      let kakao = window.kakao;
      this.searchView = true;
      console.log(event);
      let ps = new kakao.maps.services.Places();
      ps.keywordSearch(this.keyword, (places, status) => {
        if (status === kakao.maps.services.Status.OK) {
          this.searchList = places;
          console.log(places);
        }
      });
    },
    moveMap(e) {
      console.log(e.x);
      console.log(e.y);
      this.moveCenter(e.y, e.x);
    },
  },
};
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.map_wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 350px;
}

.custom_typecontrol {
  position: absolute;
  top: 5px;
  left: 10px;
  overflow: hidden;
  width: 300px;
  height: 30px;
  margin: 0;
  padding: 0;
  z-index: 1;
  font-size: 12px;
  line-height: 12px;
  font-family: "Malgun Gothic", "맑은 고딕", sans-serif;
}
.veltical {
  display: flex;
}

.overlab {
  position: absolute;
  top: 100px;
  left: 100px;
  z-index: 1;
}

.overlab2 {
  position: absolute;
  width: 300px;
  top: 35px;
  left: 150px;
  z-index: 1;
  margin: 0;
  padding: 0;
}
.overlab3 {
  position: absolute;
  width: 80px;
  top: 0px;
  left: 250px;
  z-index: 1;
  margin: 0;
  padding: 0;
  background-color: white;
}
.overlab4 {
}
.overlab5 {
  position: absolute;
  width: 300px;
  top: 60px;
  left: 5px;
  z-index: 1;
  margin: 0;
  padding: 0;
  background-color: white;
}
.overlab6 {
  position: absolute;
  width: 290px;
  top: 100px;
  left: 10px;
  height: 300px;
  z-index: 1;
  margin: 0;
  padding: 0;
  background-color: white;
  overflow-y: auto;
}
</style>
