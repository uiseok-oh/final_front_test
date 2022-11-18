<template>
  <div>
    <div>==========내용이 적어서 무언가 적자===========</div>
    <b-table style="width: 100%" striped hover :items="houseDeal"></b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const ApartInfo = "ApartInfo";

export default {
  name: "DetailList",

  data() {
    return { houseDeal: null };
  },
  created() {
    this.houseDeal = this.getHouseDeal;
  },
  computed: {
    ...mapGetters(ApartInfo, ["getHouseDeal"]),
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
