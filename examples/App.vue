<template>
  <div id="app">
    <hj-vue-music
     :musicData="musicData"
    ></hj-vue-music>
  </div>
</template>
<script>
export default {
  data() {
    return {
      musicData: [
        {
          id:1,
          musicName: "你就不要想起我",
          musicCover:
            "https://p1.music.126.net/m9psWT0vrunTgxY3NeEXUg==/109951164694992804.jpg",
          musicUrl: require("./assets/a.mp3"),
        },
        {
          id:2,
          musicName: "寂寞寂寞就好",
          musicCover:
            "https://p1.music.126.net/F_TTMR927naM6J-GzPP3RA==/109951164363518103.jpg",
          musicUrl: require("./assets/b.mp3"),
        },
      ],
    };
  },
  methods: {
   
    
  },
};
</script>
<style lang="scss">
</style>
