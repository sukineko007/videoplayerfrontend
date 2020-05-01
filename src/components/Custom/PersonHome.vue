<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="观看记录" name="first">
      <PersonLove />
    </el-tab-pane>
    <el-tab-pane label="我的收藏" name="second">
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
      activeName: "first"
    };
  }
};
</script>
<style lang="scss" scoped>
</style>