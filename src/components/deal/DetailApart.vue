<template>
  <div>
    <div id="roadview" style="width: 100%; height: 300px"></div>
    <div><h3>관련내용</h3></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DetailApart",

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      getterAPIKey: "getterAPIKey",
      getterXLoc: "getterXLoc",
      getterYLoc: "getterYLoc",
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
      let roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
      let roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      let roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      let position = new kakao.maps.LatLng(33.450701, 126.570667);

      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      roadviewClient.getNearestPanoId(position, 50, function (panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
    },
  },
};
</script>

<style scoped></style>
