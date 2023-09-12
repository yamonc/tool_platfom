<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-button type="primary" @click="go2AddPage()">新增密码</el-button>
      <el-button type="success">密码备份</el-button>
    </el-card>
    <el-card class="box-card">
      <el-table
        :data="tableData.filter((data) => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
      <el-table-column
          fixed
          prop="platformName"
          label="平台名称"
          width="200"
        />
        <el-table-column prop="url" label="URL" width="230" />
        <el-table-column prop="username" label="账号" width="200" />
        <el-table-column prop="password" label="密码" width="200" />
        <el-table-column prop="remark" label="备注" width="300" />
        <el-table-column prop="createTime" label="创建时间" width="200" />
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="updatePassword(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button size="small" type="danger" @click="open(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
  
<script>
import { getPasswordList, deletePasswordById } from "@/api/password.js";
export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      form: null,
      formData: {
        platformName: "",
        url: "",
        username: "",
        password: "",
        backup: "",
        createTime: "",
      },
      tableData: [],
      search: ''
    };
  },
  methods: {
    go2AddPage() {
      this.$router.push({ path: "/password/add" });
    },
    updatePassword(index, row) {
      let id = row.uuid;
      // 根据uuid修改密码
      this.$router.push({ path: "/password/update/" + id });
    },
    handleDelete(index, row) {
      console.log(1111);
    },
    open(row) {
      console.log(row);
      this.$alert("确定删除密码【" + row.platformName + "】吗？", "删除", {
        confirmButtonText: "确定",
        callback: (action) => {
          //
          if (action == "confirm") {
            deletePasswordById(row.uuid).then((res) => {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              getPasswordList().then((res) => {
                if (res.status == 200) {
                  this.tableData = res.data.data;
                } else {
                  this.$message(res.data.message, "error");
                }
              });
            });
          } else {
          }
        },
      });
    },
  },
  mounted() {
    // 获取列表
    getPasswordList().then((res) => {
      if (res.status == 200) {
        this.tableData = res.data.data;
      } else {
        this.$message(res.data.message, "error");
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
  
  