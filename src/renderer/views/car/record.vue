<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
    >
      <el-table-column
        prop="key"
        label="在指定距离或时间（以先到者为准）保养。"
        width="150"
      >
      </el-table-column>
      <el-table-column label="目前公里总数">
        <el-table-column prop="value" label="月" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="2w">
        <el-table-column prop="" label="12" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="4w">
        <el-table-column prop="" label="24" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="6w">
        <el-table-column prop="" label="36" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="8w">
        <el-table-column prop="" label="48" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="10w">
        <el-table-column prop="" label="60" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="12w">
        <el-table-column prop="" label="72" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="14w">
        <el-table-column prop="" label="84" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="16w">
        <el-table-column prop="" label="96" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="18w">
        <el-table-column prop="" label="108" width="120">
        </el-table-column>
      </el-table-column>
    </el-table>
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
      tableData: [
        {
          key: "更换发动机机油 *1",
          value: "当指示灯点亮时或 6 个月",
        },
        {
          key: "更换发动机机油滤清器 *1",
          value: "当指示灯点亮时或 1 年",
        },
        {
          key: "更换空气滤清器滤芯",
          value: "每 20,000km",
        },
        {
          key: "检查气门间隙*2",
          value: "每 120,000km",
        },
        {
          key: "更换火花塞",
          value: "每 100,000km",
        },
        {
          key: "检查传动皮带",
          value: "每40,000 km检查",
        },
        {
          key: "更换发动机冷却液",
          value: "在 200,000km 或 10 年时，之后每 100,000km 或 每5 年",
        },
        {
          key: "添加纯正喷油嘴清洗剂",
          value: "每 5,000km 或每 6 个月",
        },
        {
          key: "更换变速器油",
          value: "每 40,000km 或每 12 个月",
        },
        {
          key: "更换粉尘滤清器",
          value: "每 20,000km 或每 12 个月",
        },
        {
          key: "检查前后制动器",
          value: "每 10,000km 或每 12 个月",
        },
        {
          key: "更换制动液",
          value: "每 3 年",
        },
        {
          key: "更换油箱中的燃油滤清器",
          value: "每 180,000km",
        },
        {
          key: "轮胎换位（每个月至少检查一次轮胎充气和状况）",
          value: "每 10,000km",
        },
        {
          key: "传动轴防尘罩横拉杆接头、转向齿轮箱和防尘套悬架部件",
          value: "每 10,000km 或每 1 年",
        },
        {
          key: "制动软管和管路（包括 ABS/VSA）排气系统燃油管路和连接",
          value: "每 20,000km 或每 1 年",
        },
      ],
      search: "",
    };
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return [1, 2];
      } else if (columnIndex === 1) {
        return [1, 9];
      }
    },
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
    // getPasswordList().then((res) => {
    //   if (res.status == 200) {
    //     this.tableData = res.data.data;
    //   } else {
    //     this.$message(res.data.message, "error");
    //   }
    // });
  },
};
</script>
    
    <style scoped>
.line {
  text-align: center;
}
</style>
    
    