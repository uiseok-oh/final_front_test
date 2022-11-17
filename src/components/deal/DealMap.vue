<template>
  <div class="map_wrap" style="width: 100%; height: 500px">
    <div ref="map" style="width: 100%; height: 100%; position: relative; overflow: hidden"></div>

    <b-form-checkbox-group
      class="custom_typecontrol veltical"
      id="checkbox-group-1"
      v-model="selected"
      name="location"
    >
      <b-form-checkbox @click.native="setMapUpdate" value="hospital">병원</b-form-checkbox>
      <b-form-checkbox @click.native="setMapUpdate" value="restaurant">음식점</b-form-checkbox>
      <b-form-checkbox @click.native="setMapUpdate" value="school">학교</b-form-checkbox>
      <b-form-checkbox @click.native="setMapUpdate" value="mart">마트</b-form-checkbox>
      <b-form-checkbox @click.native="setMapUpdate" value="sub">지하철</b-form-checkbox>
    </b-form-checkbox-group>
    <div id="rightTag" class="overlab">테스트</div>
    <div class="overlab2">
      <vue-slider
        id="range"
        v-model="value"
        :order="false"
        :min="0"
        :max="10000"
        :clickable="false"
        @drag-end="rangeDrag"
      />
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import hospitalImg from "@/assets/images/hospital.png";
import restaurantImg from "@/assets/images/restaurant.png";
import schoolImg from "@/assets/images/school.png";
import storeImg from "@/assets/images/store.png";
import subImage from "@/assets/images/subway.png";
import { mapMutations, mapGetters } from "vuex";
const MarkInfo = "MarkInfo";

export default {
  name: "DealMap",

  data() {
    return {
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
  },

  computed: {
    ...mapGetters(MarkInfo, [
      "getLocHospitalInfo",
      "getLocRestaurantInfo",
      "getLocSchoolInfo",
      "getLocStoreInfo",
      "getLocSubInfo",
      "getLocAttLocX",
      "getLocAttLocY",
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

    kakao.maps.event.addListener(mapInstance, "rightclick", function (mouseEvent) {
      document
        .getElementById("rightTag")
        .setAttribute(
          "style",
          `position: absolute; top: ${mouseEvent.point.y}px;left: ${mouseEvent.point.x}px;z-index: 1; visibility: visible;`
        );
    });

    kakao.maps.event.addListener(mapInstance, "dragend", () => {
      let latlng = mapInstance.getCenter();
      let message = "변경된 지도 중심좌표는 " + latlng.getLat() + " 이고, ";
      message += "경도는 " + latlng.getLng() + " 입니다";
      this.SET_CUR_LOCX(latlng.getLat());
      this.SET_CUR_LOCY(latlng.getLng());
      console.log(message);
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
      "SET_ATT_LOCX",
      "SET_ATT_LOCY",
      "SET_CUR_LOCX",
      "SET_CUR_LOCY",
    ]),

    ///////////////////////다양한 옵션 설정///////////////////////
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
  top: 50px;
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
  visibility: hidden;
}

.overlab2 {
  position: absolute;
  width: 300px;
  top: 50px;
  left: 320px;
  z-index: 1;
  margin: 0;
  padding: 0;
}
</style>
