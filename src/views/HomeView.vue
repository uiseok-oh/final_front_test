<template>
  <div class="home">
    <h1>=========================</h1>
    <MainMap></MainMap>
    <h1>=========================</h1>
    <h1>=========================</h1>
    <NewsContent></NewsContent>
    <h1>=========================</h1>
    <h1>=========================</h1>
    <div style="display: flex">
      <div style="width: 10%"></div>
      <MainBoard style="width: 37%"></MainBoard>
      <div style="width: 6%"></div>
      <MainQnA style="width: 37%"></MainQnA>
      <div style="width: 10%"></div>
    </div>
    <h1>=========================</h1>
    <h1>=========================</h1>
    <DealMap style="height: 500px; width: 100%"></DealMap>
    <h1>=========================</h1>
    <h1>=========================</h1>
    <DealDetail style="width: 50%"></DealDetail>
    <h1>=========================</h1>
    <h1>=========================</h1>
    <h1>=========================</h1>
    <MainChatBot id="front"></MainChatBot>
  </div>
</template>

<script>
import MainMap from "@/components/main/MainMap.vue";
import NewsContent from "@/components/main/NewsContent.vue";
import MainQnA from "@/components/main/MainQnA.vue";
import MainBoard from "@/components/main/MainBoard.vue";
import DealMap from "@/components/deal/DealMap.vue";
import DealDetail from "@/components/deal/DealDetail.vue";
import MainChatBot from "@/components/main/MainChatBot.vue";
export default {
  name: "HomeView",
  components: { MainChatBot, MainMap, NewsContent, MainQnA, MainBoard, DealMap, DealDetail },
};
</script>

<style scoped>
#front {
  z-index: 1;
}
</style>
