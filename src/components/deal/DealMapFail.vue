<template>
  <div class="map_wrap" style="width: 100%; height: 100%">
    <div id="map2" style="width: 100%; height: 100%; position: relative; overflow: hidden"></div>
    <!-- <div class="custom_typecontrol radius_border">
      <button @click="setMapUpdate">테스트</button>
      <b-form-checkbox value="orange" @click="setMapUpdate">Orange</b-form-checkbox>
    </div> -->
    <!--class="custom_typecontrol radius_border veltical"-->
    <b-form-checkbox-group
      class="custom_typecontrol veltical"
      id="checkbox-group-1"
      v-model="selected"
      name="location"
    >
      <b-form-checkbox @click.native="setMapUpdate" value="sub">지하철</b-form-checkbox>
      <b-form-checkbox @click.native="setMapUpdate" value="mart">마트</b-form-checkbox>
      <b-form-checkbox @click.native="setMapUpdate" value="hospital">병원</b-form-checkbox>
      <b-form-checkbox @click.native="setMapUpdate" value="restaurant">음식점</b-form-checkbox>
      <b-form-checkbox @click.native="setMapUpdate" value="school">학교</b-form-checkbox>
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
import { mapGetters } from "vuex";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { mapActions, mapMutations } from "vuex";

const subway = "subway";
export default {
  name: "DealMapFail",
  data() {
    return {
      map: null,
      selected: [],
      value: [0, 10000],
      subs: [],
      kakao: null,
    };
  },
  components: {
    VueSlider,
  },
  computed: {
    ...mapGetters({
      getterAPIKey: "getterAPIKey",
    }),
    ...mapGetters(subway, ["getLocSubMarker"]),
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&libraries=services&appkey=${this.getterAPIKey}`;
      document.head.appendChild(script);
    }
  },

  methods: {
    ...mapActions(subway, ["getSubMarker"]),
    ...mapMutations(subway, ["SET_SUB_INIT"]),

    initMap() {
      const container = document.getElementById("map2");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 2,
      };
      this.map = new kakao.maps.Map(container, options);
      let tmpMap = this.map;
      kakao.maps.event.addListener(tmpMap, "rightclick", function (mouseEvent) {
        document
          .getElementById("rightTag")
          .setAttribute(
            "style",
            `position: absolute; top: ${mouseEvent.point.y}px;left: ${mouseEvent.point.x}px;z-index: 1; visibility: visible;`
          );
      });

      kakao.maps.event.addListener(tmpMap, "dragend", function () {
        let latlng = tmpMap.getCenter();
        let message = "변경된 지도 중심좌표는 " + latlng.getLat() + " 이고, ";
        message += "경도는 " + latlng.getLng() + " 입니다";
        console.log(message);
      });

      this.kakao = kakao;
    },
    setMapUpdate(evt) {
      let boolean = !this.selected.includes(evt.target.value);
      let info = evt.target.value;
      if (!this.isEmpty(info)) {
        if (boolean === true) {
          switch (info) {
            case "sub":
              this.getSubMarkers();
              break;
          }
        } else {
          switch (info) {
            case "sub":
              this.SET_SUB_INIT();
              break;
          }
        }
        console.log(info);
        console.log(boolean);
      }
    },

    getSubMarkers() {
      var ps = new window.kakao.maps.services.Places(this.map);

      // 카테고리로 은행을 검색합니다
      ps.categorySearch("BK9", placesSearchCB, { useMapBounds: true });

      // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      function placesSearchCB(data, status) {
        if (status === kakao.maps.services.Status.OK) {
          for (var i = 0; i < data.length; i++) {
            this.subs = data;
          }
        }
      }
    },
    isEmpty(str) {
      if (typeof str == "undefined" || str == null || str == "") return true;
      else return false;
    },
    rangeDrag() {
      console.log(this.value);
    },
    displayMarker(markerPositions, markers) {
      //makers는 좌표..
      if (markers.length > 0) {
        markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map((position) => new kakao.maps.LatLng(...position));

      if (positions.length > 0) {
        markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
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
