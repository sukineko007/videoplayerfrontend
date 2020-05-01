<template>
  <div class="videoChildMain" v-loading="loading1">
    <div class="videoBox">
      <div class="videoPlayer">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </div>
      <div class="videoDetail">
        <div class="videoName">
          <p class="p">视频名称：{{videoData.vname}}</p>
          <p class="p">综合评分:{{videoData.vscore}}</p>
        </div>
        <div class="vsay">
          <p class="vsayTitle">全部评论：</p>
          <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
            <li v-for="i in videoSayData" class="infinite-list-item" :key="i">{{ i }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="score">
      <span for="el-rate" class="scoreSpan">
        打分：
        <el-rate class="el-rate" v-model="vscore" show-text :texts="['极差', '较差', '一般', '较好', '极好']"></el-rate>
      </span>
      <el-input
        type="textarea"
        placeholder="请输入评论..."
        v-model="vsay"
        maxlength="100"
        show-word-limit
        :autosize="{minRows: 2, maxRows:4}"
      ></el-input>
      <div class="buttonContainer">
        <el-button type="primary" icon="el-icon-edit" @click="commitScore">提交评价</el-button>
        <el-button type="success" icon="el-icon-star-on" @click="loveVideo">加入收藏</el-button>
      </div>
    </div>
  </div>
</template>


<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
export default {
  components: {
    videoPlayer
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "", // 路径
            type: "" // 类型
          }
        ],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true //全屏按钮
        }
      },
      vsay: "", //评论
      vscore: null,
      loading1: false,
      videoData: {
        id: "",
        vname: "",
        vimage: "",
        vpath: "", //视频路径
        vnum: 0, //播放次数
        vscore: 0 //分数
      },
      isLogin: false,
      userID: "",
      videoSayData: [],
      videoSayData2: [],
      i: 5
    };
  },
  methods: {
    load() {
      if (this.i < this.videoSayData2.length) {
        this.videoSayData = this.videoSayData.concat(
          this.videoSayData2.slice(this.i, this.i + 2)
        );
        this.i += 2;
      }
    },
    loveVideo() {
      if (!this.isLogin) {
        this.$message.error("请先登录！");
        return;
      }
      this.loading1 = true;
      var params = new URLSearchParams();
      params.append("uid", this.userID);
      params.append("vid", this.videoData.id);
      params.append("vtype", 1);
      this.axios
        .post("/vlike/lovevideo", params)
        .then(res => {
          this.$message.success("收藏成功");
          this.loading1 = false;
        })
        .catch(err => {
          this.$message.serror("收藏失败");
          this.loading1 = false;
        });
    },
    commitScore() {
      if (!this.isLogin) {
        this.$message.error("请先登录！");
        return;
      }
      this.loading1 = true;
      var params = new URLSearchParams();
      params.append("uid", this.userID);
      params.append("vid", this.videoData.id);
      params.append("vnum", this.vscore);
      params.append("vsay", this.vsay);
      this.axios
        .post("/score/commitscore", params)
        .then(res => {
          this.$message.success("提交成功");
          this.loading1 = false;
        })
        .catch(err => {
          this.$message.serror("提交失败");
          this.loading1 = false;
        });
    }
  },
  mounted() {
    //加载首页数据
    this.loading1 = true;
    var params = new URLSearchParams();
    params.append("id", this.$store.id);
    this.axios
      .post("/video/getVideoByID", params)
      .then(res => {
        this.loading1 = false;
        this.videoData = res.data.videoData;
        this.videoSayData2 = res.data.videoSayData;
        this.videoSayData = this.videoSayData2.slice(0, 5);
      })
      .catch(err => {
        this.$message.error(err);
        this.loading1 = false;
        console.error(err);
      });
    var userJson = sessionStorage.getItem("userInfo");
    if (!userJson || userJson == "") {
      this.isLogin = false;
    } else {
      this.isLogin = true;
      this.userID = JSON.parse(userJson).id;
    }
  }
};
</script>

<style lang="scss" scoped>
.p {
  margin: 0 0 0 0;
  display: inline;
}
.videoChildMain {
  width: 100%;
  height: auto;
  text-align: center;
}
.videoBox {
  width: 100%;
  height: 60%;
  padding: 0px 0px 0px 0px;
}
.videoImage {
  margin: 0 auto;
  width: 80%;
  height: 60%;
  padding: 1px 1px 1px 1px;
}
.videoDetail {
  margin: 0px 0px 0px 0px;
  text-align: center;
  width: 100%;
  height: 40%;
}
.vsay {
  width: 100%;
}
.infinite-list {
  height: 150px;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: left;
}
.li {
  white-space: nowrap;
  overflow-y: scroll;
  overflow-x: hidden;
}
.score {
  height: 40%;
  width: 100%;
  text-align: left;
}
.scoreSpan {
  display: inline;
}
.el-rate {
  display: inline;
}
.buttonContainer {
  width: 100%;
  text-align: center;
  overflow: hidden;
  padding: 3px 3px 3px 3px;
}
.infinite-list-item {
  align-items: center;
  justify-content: center;
  height: 20px;
  background: #e8f3fe;
  margin: 10px;
  color: #7dbcfc;
  overflow-x: auto;
}
.vsayTitle {
  text-align: left;
  margin: 0 0 0 0;
}
</style>
