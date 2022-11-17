<template>
  <div>
    <h3>------DealDetail시작------</h3>
    <DetailApart></DetailApart>
    <h3>---------------</h3>
    <h3>---------------</h3>
    <DetailList></DetailList>
    <h3>---------------</h3>
    <h3>---------------</h3>
    <DetailArea></DetailArea>
    <h3>------DealDetail끝---------</h3>
  </div>
</template>

<script>
import DetailApart from "@/components/deal/DetailApart.vue";
import DetailList from "@/components/deal/DetailList.vue";
import DetailArea from "@/components/deal/DetailArea.vue";

export default {
  name: "DealDetail",
  components: { DetailApart, DetailList, DetailArea },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
