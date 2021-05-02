# hhjvuemusic

下载：

```
cnpm install hhjvuemusic --save / yarn add hhjvuemusic
```

引入：

在`mian.js`中引入

```
import HhjVuemusic from 'hhjvuemusic'
import 'hhjvuemusic/dist/hhjvuemusic.css'
Vue.use(HhjVuemusic)
```

使用：

```
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

```

参数说明：`musicData`

| 字段       | 是否必传 | 值类型          |
| ---------- | -------- | --------------- |
| id         | 是       | Number / String |
| musicName  | 是       | String          |
| musicCover | 是       | String          |
| musicUrl   | 是       | String          |

