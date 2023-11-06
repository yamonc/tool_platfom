<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-button type="primary" @click="openDialog()">新建记录</el-button>
    </el-card>
    <el-divider></el-divider>
    <el-card class="box-card" v-for="(item, index) in tableData" :key="index">
      <div slot="header" class="clearfix">
        <span>{{ item.carName }}</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="deleteCarMaintainInfo(item.uuid)"
          >删除</el-button
        >
      </div>
      <div class="text item">
        <el-descriptions>
          <el-descriptions-item label="已行驶里程">{{
            item.nowKm + "km"
          }}</el-descriptions-item>
          <el-descriptions-item label="上次保养公里数">{{
            item.lastKm + "km"
          }}</el-descriptions-item>
          <el-descriptions-item label="上次保养时间">{{
            item.lastTime
          }}</el-descriptions-item>
          <el-descriptions-item label="备注">
            {{ item.remark }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>

    <el-dialog title="新建保养记录" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="车辆名称" :label-width="formLabelWidth">
          <el-select v-model="form.carId" filterable placeholder="请选择">
            <el-option
              v-for="item in carNames"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上次保养公里数" :label-width="formLabelWidth">
          <el-input v-model="form.lastKm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上次保养时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.lastTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="已行驶公里数" :label-width="formLabelWidth">
          <el-input v-model="form.nowKm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.remark"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCarMaintainInfo()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
      
    <script>
import {
  save,
  getCarMatainInfoList,
  getCarMaintainInfoById,
  deleteCarMaintainInfoById,
} from "@/api/maintain.js";
import {
  getCarInfoList,
} from "@/api/car.js";
export default {
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      updateDialogFormVisible: false,
      tableData: [],
      search: "",
      form: {
        uuid: "",
        carId: "",
        lastKm: "",
        lastTime: "",
        nowKm: "",
        remark: "",
      },
      formLabelWidth: "120px",
      carNames: [],
    };
  },
  methods: {
    openDialog() {
      getCarInfoList().then((res) => {
        if (res.status == 200) {
          this.dialogFormVisible = true;
          // 放数据
          this.carNames = res.data.data.map((obj) => ({
            label: obj.name,
            value: obj.uuid,
          }));
        }
      });
      this.dialogFormVisible = true;
    },
    deleteCarMaintainInfo(id) {
      console.log(id);
      deleteCarMaintainInfoById(id).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: res.data.message,
            type: "success",
          });
          this.getAllMaintainList();
        } else {
          this.$message({
            message: res.data.message,
            type: "error",
          });
        }
      });
    },
    showCarMaintainInfo(id) {
      // 根据uuid获取数据
      getCarMaintainInfoById(id).then((res) => {
        console.log(res);
        if (res.status == 200) {
          // 打开模态框
          this.updateDialogFormVisible = true;
          // 填充数据
          this.updateForm = res.data.data;
        } else {
          this.$message({
            message: res.data.message,
            type: "error",
          });
        }
      });
    },
    saveCarMaintainInfo() {
      save(this.form).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: res.data.message,
            type: "success",
          });
          this.dialogFormVisible = false;
          this.getAllMaintainList();
          this.form = {};
        } else {
          this.$message(res.data.message, "error");
        }
      });
    },
    getAllMaintainList() {
      // 获取列表
      getCarMatainInfoList().then((res) => {
        if (res.status == 200) {
          this.tableData = res.data.data;
          console.log(this.tableData);
        } else {
          this.$message(res.data.message, "error");
        }
      });
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
    this.getAllMaintainList();
  },
};
</script>
      
  <style scoped>
.line {
  text-align: center;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: auto;
}
</style>
  
      
      