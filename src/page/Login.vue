<template>
  <div class="loginPage">
    <h1>登录</h1>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          alert(this.loginForm.username)
          alert(this.loginForm.password)
          this.$axios({
            method: 'POST',
            // url: 'https://192.168.1.109:9443/demo/myweb/login',
            url: 'http://192.168.1.105:8080/bu/yp/tablelist.do',
            // url: 'http://rap2api.taobao.org/app/mock/10363/example/login',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            // baseURL: 'https://192.168.1.109:9443/demo/myweb',
            // withCredentials: true,
            data: {
              // username: this.loginForm.username,
              // password: this.loginForm.password
              id: 1
            }
          }).then(res => {
            alert(res)
            console.log(res)
          }).catch(res => {
            alert(res)
          })
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.loginPage {
    width: 350px;
    margin: auto;
    position: relative;
    margin-top: 15%;
}
</style>
