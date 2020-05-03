<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="我的收藏" name="first">
      <PersonLove />
    </el-tab-pane>
    <el-tab-pane label="播放记录" name="second">
      <PersonPlayHistory />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import PersonLove from "./PersonLove";
import PersonPlayHistory from "./PersonPlayHistory";

export default {
  components: {
    PersonLove,
    PersonPlayHistory
  },
  data() {
    return {
      activeName: "first",
      data: "hhhshshshs"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log("切换tab：" + tab);
    }
  },
  mounted() {
    //获取登录信息
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
</style>