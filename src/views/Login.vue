<template>
  <el-row class="login-bg">
    <el-col :span="8" class="login-box">
      <h3>小U商城管理系统</h3>
      <el-form :model="forminfo" ref="form" :rules="rules">
          <!-- prop一定要加，不然不会生效 -->
        <el-form-item prop="username">
          <el-input v-model="forminfo.username" placeholder="请输入账号">
            <!-- 插槽 -->
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="username"><!--要想让验证规则生效，此处必须加上prop-->
          <el-input v-model="forminfo.password" show-password placeholder="请输入密码">
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="login-btns">
            <el-button type="primary" class="loginBtn" @click="submit">登录</el-button>
        
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import {mapActions} from "vuex"
export default {
  data() {
    return {
      forminfo: {
        username: "欣欣",
        password: "admin",
      },
    //   验证规则
      rules:{
          username:[{required:true,message:"必填",trigger:'blur'}],
          password:[{required:true,message:"必填",trigger:'blur'}]
      }
    };
  },
  created() {},
  methods: {
   ...mapActions({
       login:"user/login"
   }),
   submit(){
       this.$refs.form.validate( valid=>{
           if(valid){
               this.login(this.forminfo)
           }
       })
   }
  },
  components: {},
};
</script>
// scoped表示样式只在当前组件中有效
<style scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  display: flex;
  /* 水平垂直居中 */
  justify-content: center;
  align-items: center;
  /* background-color: #000; */
  background-image: url("../assets/img/bgc.jpg");
  background-size: 100%, 100%;
}
.login-box {
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  padding: 15px 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.login-box h3 {
  line-height: 40px;
  text-align: center;
  margin-bottom: 20px;
}
.login-btns{
  margin: 0 auto;
  text-align: center;
}
.loginBtn {

  width: 30%;
}
</style>


// menus_url用于做面包屑