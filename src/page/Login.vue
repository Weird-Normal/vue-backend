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
import store from '@/util/store'
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
          var qs = require('qs')

          this.$axios.post('https://192.168.1.109:9443/demo/myweb/login', qs.stringify({username: this.loginForm.username, password: this.loginForm.password})).then(res => {
            alert(res.data.taken)
            // 根据 store 中的方法将 token 保存至 localStorage 中
            this.$store.commit('setToken', res.data['Authorization'])
            if (store.state.token) {
              this.$router.push('/')
              console.log(store.state.token)
            } else {
              this.$router.replace('/Login')
            }
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
