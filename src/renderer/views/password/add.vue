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
        name: "",
        url: "",
        account: "",
        password: "",
        backup: "",
        createTime: ""
      },
    };
  },
  methods: {
    go2AddPage() {
      this.$router.push({ path: "/password/add" });
    },
    writeJson() {
      // 读取文件
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        // 将文件内容拆分为行数组
        const lines = data.split("\n");

        // 确保文件至少有两行
        if (lines.length < 2) {
          console.error("文件行数不足。");
          return;
        }

        // 找到倒数第二行的索引
        const secondLastLineIndex = lines.length - 1;

        // 在倒数第二行位置上追加内容
        // 如果文件内容至少有三行，证明已经有内容json，需要拼接逗号
        if (lines.length >= 3) {
          // 拼接逗号
          lines.splice(secondLastLineIndex, 0,"," + JSON.stringify(this.formData));
        } else {
          lines.splice(secondLastLineIndex, 0, JSON.stringify(this.formData));
        }

        // 组合行数组为新的文件内容
        const updatedContent = lines.join("\n");

        // 写入更新后的内容到文件中
        fs.writeFile(filePath, updatedContent, "utf8", (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("内容已成功追加到倒数第二行位置。");
        });
      });
    },
    onSubmit() {
      this.formData.createTime = new Date();
      console.log(this.formData);
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          // 文件不存在，创建文件
          fs.writeFile(filePath, "[" + "\n" + "]", (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("文件已创建并初始化成功。");
              this.writeJson();
            }
          });
        } else {
          // 如果文件存在,直接从倒数第二行开始写起
          this.writeJson();
        }
      });

      this.$message("内容已保存" + filePath);
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
    
    