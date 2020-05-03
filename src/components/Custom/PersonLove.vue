<template>
  <div>
    <h1>我的收藏</h1>
    <el-row>
      <el-col :span="4" :xs="12" v-for="item in loveData" :key="item.id">
        <div class="vBox">
          <div class="vimage2">
            <img :src="item.vimage" :alt="item.vname" @click="handleClick(item.vid)" />
          </div>
          <p class="vdetail2">{{item.vname}}</p>
           <el-button
                size="small"
                icon="el-icon-shopping-cart-2"
                type="text"
                round="true"
                @click="handleDelete(item.id)"
              >移出收藏</el-button>
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
      loveData: []
    };
  },
  methods: {
    handleClick(id) {
      this.$store.commit("goDetail", id);
      var params = new URLSearchParams();
      params.append("uid", this.userID);
      params.append("vid", id);
      params.append("vtype", 2);
      this.axios
        .post("/vlike/lovevideo", params)
        .then(res => {
          this.loading1 = false;
        })
        .catch(err => {
          this.loading1 = false;
        });
        this.$router.push({ path: "/2" });
    },
    handleDelete(id) {
      var params = new URLSearchParams();
      params.append("id", id);
      params.append("vtype", 1);
      this.axios
        .post("/vlike/delete", params)
        .then(res => {
          this.$message.success("移除成功");
          var params = new URLSearchParams();
          params.append("uid", this.userID);
          params.append("vtype", 1);
          this.axios
            .post("/vlike/getLove", params)
            .then(res => {
              this.loveData = res.data;
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
    console.log("我的收藏");
    //获取登录信息
    var userJson = sessionStorage.getItem("userInfo");
    if (!userJson || userJson == "") {
      this.isLogin = false;
      this.$message.error("请先登录");
    } else {
      this.isLogin = true;
      this.userID = JSON.parse(userJson).id;
    }
    var params = new URLSearchParams();
    params.append("uid", this.userID);
    params.append("vtype", 1);
    this.axios
      .post("/vlike/getLove", params)
      .then(res => {
        this.loveData = res.data;
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
</style>