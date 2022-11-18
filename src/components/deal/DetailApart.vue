<template>
  <div>
    <div id="roadview" style="width: 100%; height: 300px"></div>
    <div><h3>관련내용</h3></div>
    <!-- <div>{{ curHouseInfo.houseCode }}</div> -->
    <div>{{ curHouseInfo.houseName }}</div>
    <div>{{ curHouseInfo.buildYear }}</div>
    <div>{{ curHouseInfo.jibun }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const ApartInfo = "ApartInfo";

export default {
  name: "DetailApart",

  data() {
    return {
      curHouseInfo: null,
    };
  },

  created() {
    this.curHouseInfo = this.getHouseInfo;
  },
  computed: {
    ...mapGetters(ApartInfo, ["getHouseInfo"]),
  },
  mounted() {
    let kakao = window.kakao;
    let roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
    var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
    var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

    var position = new kakao.maps.LatLng(this.curHouseInfo.lat, this.curHouseInfo.lng);

    // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
    roadviewClient.getNearestPanoId(position, 50, function (panoId) {
      roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
    });
  },

  methods: {},
};
</script>

<style scoped></style>
