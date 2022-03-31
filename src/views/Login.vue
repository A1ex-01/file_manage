<template>
  <div class="login">
    <img class="bcimg" src="../assets/img/wallhaven-6o7z77.jpg" alt="" />
    <el-form :model="user" class="form">
      <el-form-item
        prop="acid"
        :rules="[
          {
            required: true,
            message: '请输入正确的用户名账号！',
            trigger: 'change',
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
          },
        ]"
      >
        <el-input
          maxlength="16"
          prefix-icon="el-icon-user-solid"
          minlength="8"
          type="num"
          v-model="user.acid"
          class="input_1"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="psw"
        :rules="[
          {
            required: true,
            message: '请输入正确的密码！',
            trigger: 'change',
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
          },
        ]"
      >
        <el-input
          show-password
          prefix-icon="el-icon-lock"
          maxlength="16"
          minlength="8"
          v-model="user.psw"
          class="input_1"
        ></el-input>
      </el-form-item>
      <el-form-item class="bottom">
        <el-button type="primary" @click="submit">登录</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>
      <div class="img">
        <img src="../assets/logo.png" />
      </div>
    </el-form>
  </div>
</template>
<script>
import { setCookie } from "../utils/cookie";
import { Message } from "element-ui";
export default {
  data() {
    return {
      user: {
        acid: "admin",
        psw: "123456",
      },
    };
  },
  computed: {},
  mounted() {},

  methods: {
    submit() {
      if (this.user.acid.length > 4 && this.user.psw.length > 4) {
        if (this.user.acid === "admin" && this.user.psw === "123456") {
          setCookie("status", "false", 1);
          this.$router.push({ name: "Home" });
        } else if (
          this.user.acid === "2311807091" &&
          this.user.psw === "1234567890"
        ) {
          setCookie("status", "true",1);
          this.$router.push({ name: "Home" });
        } else {
          Message({
            type: "error",
            message: "账号或密码错误",
          });
        }
      }
    },
    reset() {
      (this.user.acid = ""), (this.user.psw = "");
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .bcimg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: scale(1.03);
    width: 100%;
    height: 100%;
    filter: blur(5px);
  }
  .form {
    width: 450px;
    height: 300px;
    background-color: white;
    position: relative;
    padding: 0 20px;
    padding-top: 110px;
    box-sizing: border-box;
    border-radius: 3px;
    box-shadow: 0 0 7px #ddd;
    .bottom {
      display: flex;
      justify-content: flex-end;
    }
    .img {
      position: absolute;
      top: -65px;
      left: 0;
      right: 0;
      margin: 0 auto;
      border-radius: 50%;
      height: 130px;
      width: 130px;
      background-color: white;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      > img {
        width: 130px;
        border-radius: 50%;
      }
    }
  }
}
</style>