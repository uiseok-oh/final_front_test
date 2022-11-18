<template>
  <div>
    <div><a v-b-toggle href="#example-collapse0" @click.prevent>대형마트</a></div>
    <b-collapse id="example-collapse0" style="width: 100%">
      <b-card v-for="item in list0" :key="item.id" v-bind:title="item.place_name"
        >거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse1" @click.prevent>편의점</a></div>
    <b-collapse id="example-collapse1" style="width: 100%">
      <b-card v-for="item in list1" :key="item.id" v-bind:title="item.place_name"
        >거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse2" @click.prevent>어린이집</a></div>
    <b-collapse id="example-collapse2" style="width: 100%">
      <b-card v-for="item in list2" :key="item.id" v-bind:title="item.place_name"
        >거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse3" @click.prevent>학교</a></div>
    <b-collapse id="example-collapse3" style="width: 100%">
      <b-card v-for="item in list3" :key="item.id" v-bind:title="item.place_name"
        >거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse4" @click.prevent>학원</a></div>
    <b-collapse id="example-collapse4" style="width: 100%">
      <b-card v-for="item in list4" :key="item.id" v-bind:title="item.place_name">
        거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse5" @click.prevent>주차장</a></div>
    <b-collapse id="example-collapse5" style="width: 100%">
      <b-card v-for="item in list5" :key="item.id" v-bind:title="item.place_name">
        거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse6" @click.prevent>지하철역</a></div>
    <b-collapse id="example-collapse6" style="width: 100%">
      <b-card v-for="item in list6" :key="item.id" v-bind:title="item.place_name">
        거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse7" @click.prevent>은행</a></div>
    <b-collapse id="example-collapse7" style="width: 100%">
      <b-card v-for="item in list7" :key="item.id" v-bind:title="item.place_name"
        >거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse8" @click.prevent>문화시설</a></div>
    <b-collapse id="example-collapse8" style="width: 100%">
      <b-card v-for="item in list8" :key="item.id" v-bind:title="item.place_name">
        거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse9" @click.prevent>중개업소</a></div>
    <b-collapse id="example-collapse9" style="width: 100%">
      <b-card v-for="item in list9" :key="item.id" v-bind:title="item.place_name">
        거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse10" @click.prevent>공공기관</a></div>
    <b-collapse id="example-collapse10" style="width: 100%">
      <b-card v-for="item in list10" :key="item.id" v-bind:title="item.place_name"
        >거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse11" @click.prevent>관광명소</a></div>
    <b-collapse id="example-collapse11" style="width: 100%">
      <b-card v-for="item in list11" :key="item.id" v-bind:title="item.place_name"
        >거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse12" @click.prevent>숙박</a></div>
    <b-collapse id="example-collapse12" style="width: 100%">
      <b-card v-for="item in list12" :key="item.id" v-bind:title="item.place_name"
        >거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse13" @click.prevent>음식점</a></div>
    <b-collapse id="example-collapse13" style="width: 100%">
      <b-card v-for="item in list13" :key="item.id" v-bind:title="item.place_name"
        >거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse14" @click.prevent>카페</a></div>
    <b-collapse id="example-collapse14" style="width: 100%">
      <b-card v-for="item in list14" :key="item.id" v-bind:title="item.place_name"
        >거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse15" @click.prevent>병원</a></div>
    <b-collapse id="example-collapse15" style="width: 100%">
      <b-card v-for="item in list15" :key="item.id" v-bind:title="item.place_name">
        거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse16" @click.prevent>약국</a></div>
    <b-collapse id="example-collapse16" style="width: 100%">
      <b-card v-for="item in list16" :key="item.id" v-bind:title="item.place_name"
        >거리:{{ item.distance }}
      </b-card>
    </b-collapse>
    <div><a v-b-toggle href="#example-collapse17" @click.prevent>마트1</a></div>
    <b-collapse id="example-collapse17" style="width: 100%">
      <b-card v-for="item in list17" :key="item.id" v-bind:title="item.place_name">
        거리:{{ item.distance }}
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

const ApartInfo = "ApartInfo";
const AroundInfo = "AroundInfo";
export default {
  name: "DetailArea",

  data() {
    return {
      curHouseInfo: null,
    };
  },

  created() {
    this.curHouseInfo = this.getHouseInfo;

    this.getSearch(["MT1", 0, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["CS2", 1, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["PS3", 2, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["SC4", 3, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["AC5", 4, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["PK6", 5, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["OL7", 6, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["SW8", 7, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["BK9", 8, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["CT1", 9, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["AG2", 10, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["PO3", 11, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["AT4", 12, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["AD5", 13, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["FD6", 14, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["CE7", 15, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["HP8", 16, this.curHouseInfo.lat, this.curHouseInfo.lng]);
    this.getSearch(["PM9", 17, this.curHouseInfo.lat, this.curHouseInfo.lng]);
  },
  computed: {
    ...mapState(AroundInfo, [
      "list0",
      "list1",
      "list2",
      "list3",
      "list4",
      "list5",
      "list6",
      "list7",
      "list8",
      "list9",
      "list10",
      "list11",
      "list12",
      "list13",
      "list14",
      "list15",
      "list16",
      "list17",
    ]),
    ...mapGetters(ApartInfo, ["getHouseInfo"]),
  },
  mounted() {},

  methods: {
    ...mapActions(AroundInfo, ["getSearch"]),
  },
};
</script>

<style lang="scss" scoped></style>
