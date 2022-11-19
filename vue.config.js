module.exports = {
  devServer: {
    proxy: {
      // proxyTable 설정
      "/v1": {
        // api 로 시작하는 소스 는 traget으로 잡아준다. > 사용할때 url 이 api 가 있어야 한다.
        target: "https://openapi.naver.com", // www.xxx.com
        //원래  url은 https://openapi.naver.com/v1/search/news.json?display=5&sort=date&query=%EC%95%84%ED%8C%8C%ED%8A%B8 이다
        changeOrigin: true,
      },
    },
  },
};
