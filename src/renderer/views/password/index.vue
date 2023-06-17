<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-button type="primary" @click="go2AddPage()">新增密码</el-button>
      <el-button type="success">密码备份</el-button>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="name" label="平台名称" width="200" />
        <el-table-column prop="url" label="URL" width="230" />
        <el-table-column prop="account" label="账号" width="200" />
        <el-table-column prop="password" label="密码" width="200" />
        <el-table-column prop="backup" label="备注" width="300" />
        <el-table-column prop="createTime" label="创建时间" width="200"/>
        <!-- <el-table-column fixed="right" label="Operations">
          <template #default>
            <el-button link type="primary" size="small" @click="updatePassword"
              >修改密码</el-button
            >
            <el-button link type="danger" size="small">删除密码</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
  </div>
</template>
  
<script>
import { log } from 'console';
const fs = require("fs");
const path = require("path");
const readline = require('readline');
const filePath = path.join(process.env.USERPROFILE, "password.json");
export default {
  components: {},
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
      tableData : []
    };
  },
  methods: {
    go2AddPage() {
      this.$router.push({ path: "/password/add" });
    },
    updatePassword() {
      console.log(1112233);
    },
    handleClose() {
      console.log(1111);
    },
  },
  mounted() {
    //读取json数据
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // 文件不存在，创建文件
        fs.writeFile(filePath, "[" + "\n" + "]", (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("文件已创建。");
          }
        });
      } else {
        //文件存在
        // 读取json文件
        fs.readFile(filePath, "utf-8", (err, data) => {
          if (err) {
            console.error(err);
            return;
          }

          this.tableData = JSON.parse(data);
          console.log(this.tableData);
          // 处理jsonData，如将其传递给Vue组件进行展示
        });
      }
    });
  },
};
</script>
  
  <style scoped>
.line {
  text-align: center;
}
</style>
  
  