<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-button type="success">密码备份</el-button>
    </el-card>
    <el-card class="box-card">
      <div class="text item">
        <el-form ref="form" :model="formData" label-width="120px">
          <el-form-item label="平台名称">
            <el-input
              v-model="formData.platformName"
              placeholder="请输入平台名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="URL">
            <el-input
              v-model="formData.url"
              placeholder="请输入平台URL"
            ></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input
              v-model="formData.username"
              placeholder="请输入平台账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="formData.password"
              placeholder="请输入平台密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              v-model="formData.remark"
              maxlength="500"
              show-word-limit
              resize="none"
              :rows="5"
              placeholder="请输入备注信息..."
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import Tinymce from "@/components/Tinymce";
import { getPasswordById, updatePasswordById } from "../../api/password.js";
import { log } from "console";
const fs = require("fs");
const path = require("path");
const filePath = path.join(process.env.USERPROFILE, "password.json");
export default {
  components: {
    Tinymce,
  },
  data() {
    return {
      dialogVisible: false,
      form: null,
      formData: {
        platformName: "",
        url: "",
        username: "",
        password: "",
        remark: "",
      },
    };
  },
  mounted() {
    console.log(1111);
    // 获取列表
    // 获取路由id
    let id = this.$route.params.id
    getPasswordById(id).then((res) => {
      console.log(res.data);
      if(res.data.success){
        this.formData = res.data.data
      }else{
        this.$message(res.data.message, "error")
      }
    });
  },
  methods: {
    go2AddPage() {
      this.$router.push({ path: "/password/add" });
    },

    onSubmit() {
      let id = this.$route.params.id
      // 向后端发出请求
      updatePasswordById(id, this.formData).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: res.data.message,
            type: "success",
          });
          this.$router.push({ path: "/password/index" });
        } else {
          this.$message(res.data.message, "error");
        }
      });
    },
    onCancel() {
      this.$router.push({ path: "/password/index" });
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
    handleClose() {
      console.log(1111);
    },
  },
};
</script>
    
    <style scoped>
.line {
  text-align: center;
}
</style>
    
    