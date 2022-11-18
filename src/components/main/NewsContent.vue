<template>
  <div>
    <div style="display: flex">
      <div style="width: 10%"></div>
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="10000"
        controls
        indicators
        style="width: 80%; background-color: transparent"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Slide with blank fluid image to maintain slide aspect ratio -->
        <b-carousel-slide
          style="width=100px;height:500px"
          v-for="(item, index) in news"
          :key="item.link"
        >
          <div style="width: 100%; height: 100%">
            <img v-bind:src="newsList[index]" alt="" heignt="340px" />
            <h1 style="color: black">{{ item.title }}</h1>
            <p style="color: black">
              {{ item.description }}
            </p>
          </div>
        </b-carousel-slide>
      </b-carousel>

      <div style="width: 10%"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NewsContent",

  data() {
    return {
      slide: 0,
      sliding: null,
      news: [],
      newsList: [
        require("@/assets/images/news0.jpg"),
        require("@/assets/images/news1.jpg"),
        require("@/assets/images/news2.jpg"),
        require("@/assets/images/news3.jpg"),
        require("@/assets/images/news4.jpg"),
      ],
    };
  },

  created() {
    this.getNews();
  },
  mounted() {},

  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    getNews() {
      var client_id = "EZqbIgXqDxLcyS9nWCrr";
      var client_secret = "EfMbqWVfRu";
      var api_url =
        `https://cors-anywhere.herokuapp.com/
` +
        `https://openapi.naver.com/v1/search/news.json?display=5&sort=date&query=%EC%95%84%ED%8C%8C%ED%8A%B8`;

      var options = {
        headers: { "X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret },
      };
      // axios
      //   .get(api_url, options)
      //   .then((news) => news.data.items)
      //   .then((result) => console.log(result));
      axios
        .get(api_url, options)
        .then((news) => news.data.items)
        .then((result) => (this.news = result));
    },
  },
};
</script>

<style scoped>
.carousel-control-prev-icon,
.carousel-control-next-icon {
  height: 100px;
  width: 100px;
  outline: black;
  background-size: 100%, 100%;
  border-radius: 50%;
  border: 1px solid black;
  background-image: none;
}
</style>
