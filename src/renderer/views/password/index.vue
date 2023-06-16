<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-button type="primary" @click="go2AddPage()">新增密码</el-button>
      <el-button type="success">密码备份</el-button>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="name" label="平台名称" width="150" />
        <el-table-column prop="url" label="URL" width="120" />
        <el-table-column prop="account" label="账号" width="120" />
        <el-table-column prop="password" label="密码" width="120" />
        <el-table-column prop="backup" label="备注" width="600" />
        <el-table-column fixed="right" label="Operations">
          <template #default>
            <el-button link type="primary" size="small" @click="updatePassword"
              >修改密码</el-button
            >
            <el-button link type="danger" size="small">删除密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
  
<script>
export default {
  components: {},
  data() {
    return {
      form: null,
      formData: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
        },
        // 其他数据项...
      ],
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
};
</script>
  
  <style scoped>
.line {
  text-align: center;
}
</style>
  
  