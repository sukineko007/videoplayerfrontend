<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="#"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :http-request="uploadFile"
      accept=".mp4, .ogg, .webm"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
    <div class="videoPlayer">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
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
        notSupportedMessage: "请选择mp4/ogg/webm格式视频", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  methods: {
    onInputFileChange() {
      var file = document.getElementById("file").files[0];
      var url = URL.createObjectURL(file);
      console.log(url);
      document.getElementById("audio_id").src = url;
    },
    beforeUpload(file) {
      console.log(file);
      var url = URL.createObjectURL(file);
      console.log(url);
      var filename = file.name;
      console.log(filename);
      console.log(file.type);
      var source = {
        src: url,
        type: file.type
      };
      this.playerOptions.sources.push(source);
      console.log(this.playerOptions);
    },
    uploadFile(param) {
      console.log("上传" + param);
      return;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>