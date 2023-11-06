<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-button type="primary" @click="dialogFormVisible = true"
        >新建车辆</el-button
      >
    </el-card>
    <el-divider></el-divider>
    <el-card class="box-card" v-for="(item, index) in tableData" :key="index">
      <div slot="header" class="clearfix">
        <span>{{ item.name }}</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="deleteCarInfo(item.uuid)"
          >删除</el-button
        >
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="showCarMaintainInfo(item.uuid)"
          >编辑</el-button
        >
      </div>
      <div class="text item">
        <el-descriptions>
          <el-descriptions-item label="日常行驶公里数">{{
            item.dailyKm
          }}</el-descriptions-item>
          <el-descriptions-item label="是否开启提醒">
            <el-switch
              v-model="item.isAlarm"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-descriptions-item>
          <el-descriptions-item label="当前预估需要保养的项目"
            >{{ item.status }}</el-descriptions-item
          >
          <el-descriptions-item label="备注">
            {{ item.remark }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
    <!-- 新增 -->
    <el-dialog title="车辆信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="车辆名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="每日行驶距离" :label-width="formLabelWidth">
          <el-input v-model="form.dailyKm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前形式距离" :label-width="formLabelWidth">
          <el-input v-model="form.nowKm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否开启提醒" :label-width="formLabelWidth">
          <el-switch
            v-model="form.isAlarm"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
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
        <el-button type="primary" @click="saveCarInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 更新 -->
    <el-dialog title="车辆信息" :visible.sync="updateDialogFormVisible">
      <el-form :model="updateForm">
        <el-form-item label="车辆名称" :label-width="formLabelWidth">
          <el-input v-model="updateForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="每日行驶距离" :label-width="formLabelWidth">
          <el-input v-model="updateForm.dailyKm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否开启提醒" :label-width="formLabelWidth">
          <el-switch
            v-model="updateForm.isAlarm"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="updateForm.remark"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCarInfo(updateForm.uuid)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
    
  <script>
import {
  save,
  getCarInfoList,
  getCarInfoById,
  updateCarInfoById,
  deleteCarInfoById,
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
        name: "",
        dailyKm: "",
        nowKm: "",
        remark: "",
        isAlarm: false,
      },
      updateForm: {
        uuid: "",
        name: "",
        dailyKm: "",
        nowKm: "",
        remark: "",
        isAlarm: false,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    deleteCarInfo(id) {
      console.log(id);
      getCarInfoById(id).then((res) => {
        if (res.status == 200) {
          this.$alert(
            "确定删除车辆【" + res.data.data.name + "】吗？",
            "删除",
            {
              confirmButtonText: "确定",
              callback: (action) => {
                //
                if (action == "confirm") {
                  deleteCarInfoById(id).then((res) => {
                    if (res.status == 200) {
                      this.$message({
                        message: res.data.message,
                        type: "success",
                      });
                      this.getAllCarInfoList();
                    } else {
                      this.$message({
                        message: res.data.message,
                        type: "error",
                      });
                    }
                  });
                } else {
                }
              },
            }
          );
        }
      });
    },
    updateCarInfo(id) {
      console.log(this.updateForm);
      updateCarInfoById(id, this.updateForm).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: res.data.message,
            type: "success",
          });
          this.getAllCarInfoList();
        } else {
          this.$message({
            message: res.data.message,
            type: "error",
          });
        }
        this.updateDialogFormVisible = false;
      });
    },
    showCarMaintainInfo(id) {
      console.log("111"+ id);
      // 根据uuid获取数据
      getCarInfoById(id).then((res) => {
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
    saveCarInfo() {
      console.log(this.form);
      save(this.form).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: res.data.message,
            type: "success",
          });
          this.dialogFormVisible = false;
          this.getAllCarInfoList();
          this.form = {};
        } else {
          this.$message(res.data.message, "error");
        }
      });
    },
    getAllCarInfoList() {
      // 获取列表
      getCarInfoList().then((res) => {
        if (res.status == 200) {
          this.tableData = res.data.data;
          console.log(this.tableData);
        } else {
          this.$message(res.data.message, "error");
        }
      });
    },
    handleDelete(index, row) {
      console.log(1111);
    },
    open(row) {
      console.log(row);
    },
  },
  mounted() {
    this.getAllCarInfoList();
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

    
    