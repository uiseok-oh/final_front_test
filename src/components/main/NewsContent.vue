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
        <b-carousel-slide style="width=100px;height:500px">
          <div style="width: 100%; height: 100%">
            <img src="https://picsum.photos/1024/480/?image=54" alt="" />
            <p style="color: black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis,
              tincidunt a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
            </p>
          </div>
        </b-carousel-slide>
        <b-carousel-slide style="width=100px;height:500px">
          <div style="width: 100%; height: 100%">
            <img src="https://picsum.photos/1024/480/?image=55" alt="" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis,
              tincidunt a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
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
    return { slide: 0, sliding: null };
  },

  mounted() {
    this.getNews();
  },

  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    getNews() {
      axios
        .get(
          "https://news.google.com/rss/search?q=%EB%B6%80%EB%8F%99%EC%82%B0&hl=ko&gl=KR&ceid=KR%3Ako"
        )
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
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
