<template>
  <div class="hj-music">
    <div class="music-wrapper">
      <div
        class="music-bg"
        :style="{ backgroundImage: `url(${musicObj.musicCover})` }"
      ></div>
      <div class="music-content">
        <img
          :src="musicObj.musicCover"
          alt=""
          :class="['music-cover', isPlay ? 'active' : '']"
        />
        <div class="music-control">
          <div class="time-show">
            <span>{{ realMusicTime }}</span>
            <span>{{ musicObj.musicName }}</span>
            <span>{{ totalMusicTime }}</span>
          </div>
          <div class="music-bar" ref="bar" @click="handClickBar">
            <span class="pro-bar" ref="slid" @click="handClickBar"></span>
          </div>
          <div class="control-action">
            <i class="iconfont iconshangyishou svg-icon" @click="prevSong"></i>
            <i class="iconfont svg-icon" :class="[isPlay?'iconzanting':'iconkaishi']" @click="playOrStopMusic"></i>
            <i class="iconfont iconxiayishou svg-icon" @click="nextSong"></i>
            
          </div>
        </div>
      </div>
    </div>
    <audio ref="music" :src="musicObj.musicUrl" autoplay></audio>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "HjVueMusic",
  props: {
    musicData: {
      type: Array,
      default: [],
      require: true,
    },
  },
  data() {
    return {
      isPlay: false,
      realMusicTime: "00:00",
      totalMusicTime: "00:00",
      musicObj: {},
      musicDataList: [],
      timeOut: null,
    };
  },
  mounted() {
    this.musicObj = this.musicData[0];
  },
  watch: {
    musicData: function (newVal, oldVal) {
      console.log(newVal);
      console.log(oldVal);
      this.musicDataList = newVal;
    },
  },
  methods: {
    //暂停或者播放
    playOrStopMusic() {
      if (this.isPlay) {
        this.$refs.music.pause();
        this.isPlay = false;
      } else {
        this.$refs.music.play();
        this.isPlay = true;
      }
      this.musicTotalTime();
      this.watchMusicTime();
    },
    //计算音频时间
    musicTotalTime() {
      let time = this.$refs.music.duration;
      //分钟
      let minutes = parseInt(time / 60);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      //秒
      let seconds = Math.round(time % 60);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.totalMusicTime = minutes + ":" + seconds;
    },
    //获取音乐当前播放进度
    musicCurrentTime(time) {
      let minutes = parseInt(time / 60);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      //秒
      let seconds = Math.round(time % 60);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.realMusicTime = minutes + ":" + seconds;
    },
    //监听音乐播放
    watchMusicTime() {
      this.$refs.music.addEventListener(
        "timeupdate",
        () => {
          let currentTime = this.$refs.music.currentTime;
          this.musicCurrentTime(currentTime);
          this.$nextTick(() => {
            this.handMusicBar();
          });
        },
        false
      );
      // 播放完毕
      this.$refs.music.addEventListener("ended", () => {
        this.nextSong(); // 播放下一首
      });
    },
    // 处理进度条
    handMusicBar() {
      let slid = this.$refs.slid;
      let duration = this.$refs.music.duration;
      let x =
        ((this.$refs.music.currentTime / duration) * 100).toFixed(2) + "%";
      slid.style.width = x;
    },
    // 处理点击进度条事件
    handClickBar(e) {
      const barTotalWidth = this.$refs.bar.offsetWidth; // bar 总宽度
      const rect = e.target.getBoundingClientRect(); // 元素右边距离页面边距的距离 返回上下左右
      let length = e.pageX - rect.left;
      this.$refs.music.currentTime =
        (length / barTotalWidth) * this.$refs.music.duration; // 计算播放时间 位置百分比*总时间
      this.$nextTick(() => {
        this.$refs.music.play();
        this.isPlay = true;
      });
    },
    //播放上一首
    prevSong() {
      if (this.musicData.length === 1) {
        this.musicObj = this.musicData[0];
      } else {
        let musicId = this.musicObj.id;
        let len = this.musicData.length - 1;
        let idx = this.musicData.findIndex((value) => value.id == musicId);
        if (idx !== -1) {
          if (idx === 0) {
            this.musicObj = this.musicData[len];
          } else {
            this.musicObj = this.musicData[idx - 1];
          }
        }
      }
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.$refs.music.play();
        this.isPlay = true;
        this.musicTotalTime();
        this.watchMusicTime();
      }, 100);
    },
    nextSong() {
      if (this.musicData.length === 1) {
        this.musicObj = this.musicData[0];
      } else {
        let musicId = this.musicObj.id;
        let len = this.musicData.length - 1;
        let idx = this.musicData.findIndex((value) => value.id == musicId);
        if (idx !== -1) {
          if (idx === len) {
            this.musicObj = this.musicData[0];
          } else {
            this.musicObj = this.musicData[idx + 1];
          }
        }
      }
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.$refs.music.play();
        this.isPlay = true;
        this.musicTotalTime();
        this.watchMusicTime();
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.music-wrapper {
  width: 500px;
  height: 100px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  .music-bg {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background-position: center;
    background-size: cover;
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -o-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
  }
  .music-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .music-cover {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      animation: coverRotate 10s linear infinite forwards;
      animation-play-state: paused; // 暂定动画
      &.active {
        animation-play-state: running; // 运行动画
      }
    }
    .music-control {
      flex: 1;
      margin-left: 20px;
      .time-show {
        display: flex;
        justify-content: space-between;
        color: #fff;
      }
      .music-bar {
        width: 100%;
        height: 6px;
        border-radius: 10px;
        background-color: #fff;
        margin-top: 8px;
        display: flex;
        overflow: hidden;
        .pro-bar {
          display: inline-block;
          width: 0px;
          height: 6px;
          background-color: slateblue;
        }
      }
      .control-action {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        margin-top: 8px;
        .svg-icon {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
}
// .cover-rotate {
//   animation: coverRotate 10s linear infinite forwards;
// }
@keyframes coverRotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>