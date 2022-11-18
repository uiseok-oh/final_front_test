<template>
  <div>
    <div style="display: flex; height: 800px">
      <div style="width: 15%; height: 100%"></div>
      <div id="map" style="width: 70%; height: 100%"></div>
      <div style="width: 15%; height: 100%"></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import geojson from "./sig.json";
import { mapGetters } from "vuex";

export default {
  name: "MainMap",
  data() {
    return { map: null };
  },
  computed: {
    ...mapGetters({
      getterAPIKey: "getterAPIKey",
    }),
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${this.getterAPIKey}`;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(35.95, 128.25),
        level: 12,
      };
      this.map = new kakao.maps.Map(container, options);

      this.DrawPolygon();
    },

    displayArea(name, code, coordinates, multi) {
      let polygon;
      if (multi) {
        polygon = this.makeMultiPolygon(coordinates);
        // console.log("multi + " + name + " " + code);
      } else {
        polygon = this.makePolygon(coordinates);
        // console.log("only + " + name + " " + code);
      }

      polygon.setMap(this.map);

      // 다각형에 마우스오버 이벤트가 발생했을 때 변경할 채우기 옵션입니다
      let mouseoverOption = {
        fillColor: "#EFFFED", // 채우기 색깔입니다
        fillOpacity: 0.8, // 채우기 불투명도 입니다
      };

      let mouseoutOption = {
        fillColor: "#A2FF99", // 채우기 색깔입니다
        fillOpacity: 0.7, // 채우기 불투명도 입니다
      };

      // 다각형에 마우스오버 이벤트를 등록합니다
      kakao.maps.event.addListener(polygon, "mouseover", function () {
        // 다각형의 채우기 옵션을 변경합니다
        polygon.setOptions(mouseoverOption);
      });

      kakao.maps.event.addListener(polygon, "mouseout", function () {
        // 다각형의 채우기 옵션을 변경합니다
        polygon.setOptions(mouseoutOption);
      });

      // 다각형에 마우스다운 이벤트를 등록합니다

      kakao.maps.event.addListener(polygon, "mousedown", function () {
        console.log(polygon);
      });
    },

    DrawPolygon() {
      let data = geojson.features;
      let name = ""; //행정구 명
      let code = "";

      data.map((val) => {
        name = val.properties.SIG_KOR_NM;
        code = val.properties.SIG_CD;

        if (val.geometry.type == "MultiPolygon") {
          this.displayArea(name, code, val.geometry.coordinates, true);
        } else {
          this.displayArea(name, code, val.geometry.coordinates, false);
        }
      });
    },

    makePolygon(coordinates) {
      let polygonPath = [];

      $.each(coordinates[0], function (index, coordinate) {
        polygonPath.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
      });

      return new kakao.maps.Polygon({
        path: polygonPath,
        strokeWeight: 1,
        strokeColor: "#004c80",
        strokeOpacity: 0.8,
        strokeStyle: "longdash",
        fillColor: "#A2FF99",
        fillOpacity: 0.7,
      });
    },

    makeMultiPolygon(coordinates) {
      let polygonPath = [];

      $.each(coordinates, function (index, val2) {
        var coordinates2 = [];

        $.each(val2[0], function (index2, coordinate) {
          coordinates2.push(
            new kakao.maps.LatLng(coordinate[1], coordinate[0])
          );
        });

        polygonPath.push(coordinates2);
      });

      return new kakao.maps.Polygon({
        path: polygonPath,
        strokeWeight: 1,
        strokeColor: "#004c80",
        strokeOpacity: 0.8,
        strokeStyle: "longdash",
        fillColor: "#A2FF99",
        fillOpacity: 0.2,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 400px;
  height: 400px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
