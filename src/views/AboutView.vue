<template>
  <div>{{ locX }}====={{ locY }}</div>
</template>

<script>
import { mapGetters } from "vuex";
const DealMapInit = "DealMapInit";

export default {
  data() {
    return { locX: 0, locY: 0 };
  },
  computed: {
    ...mapGetters(DealMapInit, ["getInitLocX", "getInitLocY"]),
  },
  created() {
    this.locX = this.getInitLocX;
    this.locY = this.getInitLocY;
  },
};
</script>

<style></style>
