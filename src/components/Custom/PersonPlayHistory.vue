<template>
  <div>
    <h1>观看记录</h1>
    <el-row >
      <el-col :span="4" :xs="12" v-for="item in historyData" :key="item.id" class="el-row-col">
        <div class="vBox">
          <div class="vimage2">
            <img :src="item.vimage" :alt="item.vname" @click="handleClick2(item.vid)" />
          </div>
          <p class="vdetail2">{{item.vname}}</p>
          <el-button
            size="small"
            type="text"
            round="true"
            @click="handleDelete2(item.id)"
          >删除历史</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false,
      userID: "",
      historyData: []
    };
  },
  methods: {
    handleClick2(id) {
      this.$store.commit('goDetail', id);
      this.$router.push({ path: "/2" });
    },
    handleDelete2(id) {
      var params = new URLSearchParams();
      params.append("id", id);
      params.append("vtype", 2);
      this.axios
        .post("/vlike/delete", params)
        .then(res => {
          this.$message.success("移除成功");
          var params = new URLSearchParams();
          params.append("uid", this.userID);
          params.append("vtype", 2);
          this.axios
            .post("/vlike/getLove", params)
            .then(res => {
              this.historyData = res.data;
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(err => {
          this.$message.success("移除失败");
        });
    }
  },
  mounted() {
    console.log("我的历史");
    //获取登录信息
    var userJson = sessionStorage.getItem("userInfo");
    if (!userJson || userJson == "") {
      this.isLogin = false;
    } else {
      this.isLogin = true;
      this.userID = JSON.parse(userJson).id;
    }
    var params = new URLSearchParams();
    params.append("uid", this.userID);
    params.append("vtype", 2);
    this.axios
      .post("/vlike/getLove", params)
      .then(res => {
        this.historyData = res.data;
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
.image2 {
  text-align: center;
  width: 100%;
  height: 100px;
  overflow: hidden;
   padding: 2px;
   border-radius: 10px;
}
.vdetail2 {
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  height: 25px;
}
.el-row-col{
  padding: 4px 4px 4px 4px;
  border: hotpink 1px solid;
}
.vimage2 {
  height: 185px;
}
</style>