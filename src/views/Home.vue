<template>
  <div class="home">
    <div class="title">
      <img src="../assets/img/Logo.png" alt="" />
      <span>file_manage</span>
      <div class="exit_btn">
        <el-button type="danger" @click="exit">exit</el-button>
      </div>
    </div>
    <div class="alert">
      <el-alert
        show-icon
        title="当你上传的文件名重复时，你的名字将会覆盖该文件的上传者名。"
        type="warning"
        :closable="false"
      >
      </el-alert>
    </div>
    <div class="updateBtn">
      <el-button type="primary" @click="dialogVisible = true"
        >上传文件</el-button
      >
    </div>
    <div class="fileshow" v-if="fileList">
      <el-table
        :data="fileList.rows"
        style="width: 100%"
        border
        :default-sort="{ prop: 'createDate', order: 'descending' }"
      >
        <el-table-column
          fixed
          type="index"
          :index="indexMethod"
          label="序号"
          width="80"
        ></el-table-column>
        <el-table-column prop="author" label="上传者" width="180">
        </el-table-column>
        <el-table-column prop="filename" label="文件名" width="400">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="250"
          sortable
        >
          <template slot-scope="scope">{{
            scope.row.createDate | filterDate
          }}</template>
        </el-table-column>
        <el-table-column label="操作" prop="id">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="reset(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteFile(scope.row.id)"
              v-if="status"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-download"
              @click="$refs[scope.$index].click()"
              ><a
                :ref="scope.$index"
                style="text-decoration: none; color: #fff"
                :href="scope.row.filename | getUrl"
                >下载</a
              ></el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination" v-if="fileList">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="5"
        layout="prev, pager, next, jumper"
        :total="fileList.count"
        background
      >
      </el-pagination>
    </div>
    <el-dialog
      title="上传文件"
      :visible.sync="dialogVisible"
      :modal="true"
      :modal-append-to-body="false"
    >
      <div
        class="authorname"
        style="width: 300px; display: flex; margin-bottom: 20px"
      >
        <span style="flex-shrink: 0; font-size: 16px; line-height: 34px"
          >上传者：</span
        ><el-input placeholder="请输入内容" v-model="updator"></el-input>
      </div>
      <el-upload
        class="upload-demo"
        drag
        :action="addr"
        :auto-upload="false"
        :on-success="successCall"
        :on-error="errorCall"
        ref="upload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">上传文件不超过1GB</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogVisible = false;
            fileName = updatorName = updator = '';
            $refs.upload.clearFiles();
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="updateFile">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改文件"
      :visible.sync="changeFileRec"
      :modal="true"
      :modal-append-to-body="false"
    >
      <div
        class="authorname"
        style="width: 300px; display: flex; margin-bottom: 20px"
      >
        <span style="flex-shrink: 0; font-size: 16px; line-height: 34px"
          >文件名：</span
        ><el-input placeholder="请输入内容" v-model="fileName"></el-input>
      </div>
      <div
        class="authorname"
        style="width: 300px; display: flex; margin-bottom: 20px"
      >
        <span style="flex-shrink: 0; font-size: 16px; line-height: 34px"
          >上传者：</span
        ><el-input placeholder="请输入内容" v-model="updatorName"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            changeFileRec = false;
            fileName = updatorName = '';
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="changeName">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllFile, changeFileName, deleteFile } from "../api/home";
import { Message } from "element-ui";
import moment from "moment";
import { delCookie, getCookie } from "../utils/cookie";
export default {
  data() {
    return {
      page: 1,
      fileList: null,
      dialogVisible: false,
      updator: "",
      changeFileRec: false,
      id: null,
      fileName: null,
      updatorName: null,
    };
  },
  computed: {
    addr() {
      return "http://121.40.172.208/uploadapi/upload?author=" + this.updator;
    },
    status() {
      if (getCookie("status") == "true ") {
        return true;
      } else {
        return false;
      }
    },
  },
  filters: {
    filterDate(val) {
      return moment(val).format("YYYY MM DD, HH:mm:ss");
    },
    getUrl(val) {
      return `http://121.40.172.208/uploadapi/static/upload/${val}`;
    },
    getRef(i) {
      console.log(i);
      return "1";
    },
  },
  mounted() {
    this.getFile();
  },
  methods: {
    exit() {
      delCookie("status");
      this.$router.push({ name: "Login" });
    },
    async getFile() {
      const { data } = await getAllFile({ page: this.page });
      if (data.code === 200) {
        this.fileList = data["data"];
        Message.success("获取文件列表成功");
      } else {
        Message.error("获取文件列表失败");
      }
    },
    indexMethod(index) {
      return ++index;
    },
    updateFile() {
      if (!this.updator) {
        Message({
          message: "上传者不能为空",
          type: "warning",
        });
      } else {
        this.updator = "";
        this.dialogVisible = false;
        this.$refs.upload.submit();
        setTimeout(() => {
          this.$refs.upload.clearFiles();
        }, 500);
      }
    },
    reset(item) {
      this.id = item.id;
      this.fileName = item.filename.split(".")[0];
      this.updatorName = item.author;
      this.changeFileRec = true;
    },
    async changeName() {
      if (this.fileName && this.updatorName) {
        await changeFileName({
          id: this.id,
          filename: this.fileName + ".docx",
          author: this.updatorName,
        });
        this.id = null;
        this.fileName = null;
        this.updatorName = null;
        this.changeFileRec = false;
        await this.getFile();
        Message({
          message: "修改文件成功",
          type: "success",
        });
      } else {
        Message({
          message: "文件名或上传者名不能为空",
          type: "warning",
        });
      }
    },
    deleteFile(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await deleteFile(id);
          this.getFile();
          Message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          Message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleCurrentChange(index) {
      this.page = index;
      this.getFile();
    },
    async successCall() {
      await this.getFile();
      Message({
        message: "上传文件成功",
        type: "success",
      });
    },
    errorCall() {
      Message({
        message: "上传文件失败",
        type: "error",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/var.scss";
.home {
  background-color: white;
  .pagination {
    width: 100%;
    padding: 10px 140px;
    box-sizing: border-box;
  }
  .alert {
    padding: 0px 140px;
    padding-top: 8px;
  }
  .fileshow,
  .updateBtn {
    width: 100%;
    padding: 20px 140px;
    box-sizing: border-box;
  }
  .title {
    height: 65px;
    padding-left: 40px;
    box-sizing: border-box;
    background-color: $base-color;
    position: relative;
    display: flex;
    align-items: center;
    > img {
      width: 42px;
      height: 42px;
      margin-right: 12px;
    }
    > .exit_btn {
      position: absolute;
      right: 140px;
      top: 0;
      height: 65px;
      display: flex;
      align-items: center;
    }
    > i {
      font-size: 32px;
      color: rgb(6, 168, 245);
      margin-right: 12px;
      vertical-align: sub;
    }
    > span {
      font-size: 24px;
      color: white;
      line-height: 65px;
    }
  }
}
</style>
