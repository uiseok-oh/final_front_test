<template>
  <div style="width: 50%; height: 50%; border: 4px solid #cccccc">
    <div style="display: flex; margin-top: 10px">
      <div style="width: 10%"></div>
      <div style="width: 80%">
        <h1>{{ curHouseInfo.houseName }}</h1>
      </div>
      <div style="width: 10%" @click="clickHeart">
        <b-icon v-show="!heart" icon="heart" font-scale="2"></b-icon>
        <b-icon v-show="heart" icon="heart-fill" font-scale="2"></b-icon>
      </div>
    </div>
    <b-tabs content-class="mt-3" justified>
      <b-tab title="아파트 정보" active><DetailApart></DetailApart></b-tab>
      <b-tab title="매매 내역"><DetailList></DetailList></b-tab>
      <b-tab title="주변 정도"><DetailArea></DetailArea></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import DetailApart from "@/components/deal/DetailApart.vue";
import DetailList from "@/components/deal/DetailList.vue";
import DetailArea from "@/components/deal/DetailArea.vue";
import { mapGetters, mapMutations } from "vuex";

const ApartInfo = "ApartInfo";

export default {
  name: "DealDetail",
  components: { DetailApart, DetailList, DetailArea },
  data() {
    return {
      heart: false,
      curAttHouse: [],
      curHouseInfo: null,
    };
  },

  created() {
    this.curAttHouse = this.getAttHouse;
    this.curHouseInfo = this.getHouseInfo;
    for (let i = 0; i < this.curAttHouse.length; i++) {
      if (this.curAttHouse[i].dealCode == this.curHouseInfo.dealCode) {
        this.heart = true;
      }
    }
  },
  mounted() {},

  computed: {
    ...mapGetters(ApartInfo, ["getAttHouse", "getHouseInfo"]),
  },
  methods: {
    ...mapMutations(ApartInfo, ["ADD_ATT_HOUSE", "SUB_ATT_HOUSE"]),
    clickHeart() {
      this.heart = !this.heart;
      if (this.heart) {
        this.ADD_ATT_HOUSE(this.curHouseInfo);
      } else {
        this.SUB_ATT_HOUSE(this.curHouseInfo);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
