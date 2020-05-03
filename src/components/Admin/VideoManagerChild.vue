<template>
  <div id="mainCon" v-loading="loading">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="el-form"
      label-position="right"
    >
      <el-form-item class="el-form-item" label="视频名称:" prop="vname">
        <el-input class="el-input" v-model="form.vname"></el-input>
      </el-form-item>
      <el-form-item class="el-form-item" label="视频图片:" prop="vimage">
        <el-upload
          v-if="!uploadImage"
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :http-request="uploadFile1"
          accept=".jpg, .jpeg, JPG, .JPEG, .png"
        >
          <i class="el-icon-plus avatar-uploader-icon">点击选择图片</i>
        </el-upload>
        <p v-if="uploadImage">已上传</p>
      </el-form-item>
      <el-form-item class="el-form-item" label="视频文件:" prop="vpath">
        <el-upload
          v-if="!uploadVideo"
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :http-request="uploadFile2"
          accept=".mp4, .ogg, .webm"
        >
          <i class="el-icon-plus avatar-uploader-icon">点击选择视频</i>
        </el-upload>
        <p v-if="uploadVideo">已上传</p>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleAddClose">保 存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadImage: false,
      uploadVideo: false,
      loading: false,
      vpath: "",
      filetype: "",
      vimage: "",
      form: {
        id: "",
        vname: "",
        vimage: "",
        vpath: "",
        filetype: "",
        vnum: 0
      },
      rules: {
        vname: [{ required: true, message: "请输入视频名称", trigger: "blur" }]
      }
    };
  },
  watch: {
    "this.form": function(newValue) {
      console.log(newValue);
    }
  },
  methods: {
    handleAddClose() {
      //点击保存按钮后把添加的内容发送给服务器
      this.loading = true;
      var params = new URLSearchParams();
      if (this.vimage == "") {
        this.$message.error("请上传图片！");
        this.loading = false;
        return false;
      }
      if (this.vpath == "") {
        this.$message.error("请上传视频！");
        this.loading = false;
        return false;
      }
      if (this.form.vname == "") {
        this.$message.error("请输入视频名称");
        this.loading = false;
        return false;
      }
      params.append("vname", this.form.vname);
      params.append("vimage", this.vimage);
      params.append("vpath", this.vpath);
      params.append("filetype", this.filetype);
      params.append("vnum", 0);
      this.axios
        .post("video/add", params)
        .then(res => {
          this.$message.success("保存成功！");
          this.$router.push({ path: "/adminHome/1" });
          this.loading = false;
        })
        .catch(res => {
          this.$message.error("保存失败！");
          this.loading = false;
        });
    },
    beforeUpload(file) {
      console.log("开始上传");
      this.loading = true;
    },
    uploadFile1(param) {
      console.log("自定义上传");
      console.log(param.file);
      var params = new FormData();
      params.append("name", param.file.name);
      params.append("file", param.file);
      params.append("filetype", param.file.type);
      var config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      this.axios
        .post("file/upload", params, config)
        .then(res => {
          this.loading = false;
          this.uploadImage = true;
          console.log(res.data);
          this.vimage = res.data.vpath;
        })
        .catch(err => {
          this.loading = false;
          console.error(err);
          this.$message.error("上传失败");
        });
    },
    uploadFile2(param) {
      console.log('自定义删除：'+param.file.type);
      console.log('video/mp4'!=param.file.type);
      if(param.file.type != 'video/mp4' && param.file.type && 'video/ogg' && param.file.type != 'video/webm') {
        this.$message.error('只支持mp4/ogg/webm格式视频，请重新选择');
        this.loading = false;
        return;
      }
      console.log("自定义上传");
      console.log(param.file);
      var params = new FormData();
      params.append("name", param.file.name);
      params.append("file", param.file);
      params.append("filetype", param.file.type);
      this.filetype = param.file.type;
      var config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      this.axios
        .post("file/upload", params, config)
        .then(res => {
          this.loading = false;
          this.uploadVideo = true;
          console.log(res.data);
          this.vpath = res.data.vpath;
        })
        .catch(err => {
          this.loading = false;
          console.error(err);
          this.$message.error("上传失败");
        });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.mainCon {
  width: 100%;
}
.el-form {
  margin: 5px 5px 5px 5px;
}
p {
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}
</style>

