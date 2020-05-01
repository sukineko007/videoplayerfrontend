<template>
  <div class="video-main" v-loading="loading">
    <div class="search">
      <el-input placeholder="请输入视频名称" prefix-icon="el-icon-search" v-model="videoName">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="carousel">
      <el-carousel :interval="2000" arrow="always" height="150px">
        <el-carousel-item
          v-for="item in carouselData"
          :key="item.id"
          @click.native="goDetail(item.id)"
        >
          <div class="vimage">
            <img :src="item.vimage" alt="img" />
          </div>
          <p class="vdetail">{{item.vname}}</p>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="recommend">
      <p class="recommendp">精彩推荐</p>
      <el-row>
        <el-col :span="4" :xs="12" v-for="item in recommendData" :key="item.id">
          <div class="vBox">
            <div class="vimage2">
              <img :src="item.vimage" :alt="item.vname" @click.native="goDetail(item.id)"/>
            </div>
            <p class="vdetail2">{{item.vname}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isLogin: false,
      videoName: "",
      loading: false,
      carouselData: [],
      recommendData: []
    };
  },
  methods: {
    search() {
      if (!this.videoName || this.videoName == "") {
        this.$message.error("搜索名称不允许为空");
        return;
      }
      this.loading = true;
      var params = new URLSearchParams();
      params.append("vname", this.videoName);
      this.axios
        .post("/video/searchVideo", params)
        .then(res => {
          this.recommendData = res.data.recommendData;
          this.loading = false;
        })
        .catch(err => {
          this.$message.error(err);
          console.error(err);
        });
    },
    goDetail(id) {
      if (!this.isLogin) {
        this.$message.error("请先登录！");
        return;
      }
      this.loading1 = true;
      this.$store.commit("goDetail", id);
      var params = new URLSearchParams();
      params.append("uid", this.userID);
      params.append("vid", id);
      params.append("vtype", 2);
      this.axios
        .post("/vlike/lovevideo", params)
        .then(res => {
          this.loading1 = false;
          this.$router.push({ path: "/2" });
        })
        .catch(err => {
          this.loading1 = false;
        });
    }
  },
  mounted() {
    //加载首页数据
    this.loading = true;
    this.axios
      .get("/video/getVideoHome")
      .then(res => {
        this.loading = false;
        this.carouselData = res.data.carouselData;
        this.recommendData = res.data.recommendData;
      })
      .catch(err => {
        this.$message.error(err);
        this.loading = false;
        console.error(err);
      });
      //加载首页数据
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
.myrow {
  width: 100%;
  height: auto;
}
#container {
  width: 100%;
  height: 100%;
  float: right;
  overflow-y: auto;
}
.video-main {
  width: 100%;
  height: 5%;
  overflow: hidden;
}
.carousel {
  width: 100%;
  height: 150px;
}
.vimage {
  width: 80%;
  height: 125px;
}
.vdetail {
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  height: 25px;
}
</style>
