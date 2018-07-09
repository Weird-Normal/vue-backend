<template>
  <div>
    <el-row>
      添加成员
      <el-button @click="forward()">返回</el-button>
    </el-row>
    <el-row class="add-form">
      <el-form ref="form" :model="form" label-width="80px" class="">
        <el-form-item label="账号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
            <el-option label="技术部" value="shanghai"></el-option>
            <el-option label="销售部" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AddMember',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    forward () {
      this.$router.push('/sysMenu/authMenu/member')
    }
  }
}
</script>
