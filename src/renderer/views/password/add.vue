<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-button type="primary" @click="go2AddPage()">新增密码</el-button>
      <el-button type="success">密码备份</el-button>
    </el-card>
    <el-card class="box-card">
      <div class="text item">
        <el-form ref="form" :model="formData" label-width="120px">
          <el-form-item label="平台名称">
            <el-input
              v-model="formData.name"
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
              v-model="formData.account"
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
              v-model="formData.backup"
              maxlength="500"
              show-word-limit
              resize="none"
              :rows="5"
              placeholder="请输入备注信息..."
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import Tinymce from "@/components/Tinymce";

export default {
  components: {
    Tinymce,
    
  },
  data() {
    return {
      dialogVisible: false,
      form: null,
      formData: {
        name: "",
        url: "",
        account: "",
        password: "",
        backup: "",
      },
    };
  },
  methods: {
    go2AddPage() {
      this.$router.push({ path: "/password/add" });
    },
    onSubmit() {
      console.log(this.formData);
      this.$message("submit!");
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
    
    