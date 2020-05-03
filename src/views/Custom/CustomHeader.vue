<template>
<div class="header">
    <div id="title"><h2>VideoPlayer</h2></div>
    <div class="div2" v-if="isLogin">
      <h4>欢迎您，{{userInfo.username}}
      <el-button type="text" @click="tuichu">退出</el-button>
      </h4>
    </div>
    <div class="div2" v-if="!isLogin">
      <el-button type="text" @click="goLogin">去登陆</el-button>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      activeIndex: "1",
      activeIndex2: "1",
      username: '',
      isLogin: false
    };
  },
  methods: {
    tuichu() {
      sessionStorage.clear();
      window.location = "/login";
    },
    goLogin() {
      window.location = "/login";
    }
  },
  mounted() {
    var userJsonStr = sessionStorage.getItem("userInfo");
    this.userInfo = JSON.parse(userJsonStr);
    if(this.userInfo && this.userInfo.id && this.userInfo.id != '') {
      this.isLogin = true;
    }
  }
};
</script>

<style scoped>
.header {
  height: 40px;
  width: 100%;
  overflow: hidden;
  background-color: #ccffcc;
}
.div2 {
  float: right;
}
#title {
 float: left;
}
h2, h4{
margin: 0 0 0 0;
padding: 0 0 0 0;
}
</style>

