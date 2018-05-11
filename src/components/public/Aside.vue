<template>
  <div class="my-aside">
    <el-menu default-active="1" @open="handleOpen" @close="handleClose">
      <el-submenu v-for="(item, index) in childMenu" :key="index" :index="(index + 1).toString()">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{ item.nav }}</span>
        </template>
        <el-menu-item-group v-for="(item2, index2) in item.group" :key="index2">
          <template slot="title">{{ item2.name }}</template>
          <el-menu-item v-for="(item3, index3) in item2.menu" :key="index3" :index="(index+1).toString() + '-' + (index3+1).toString()">
            <router-link :to="item3.path">{{ item3.name }}</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import store from '@/util/store'

export default {
  name: 'Aside',
  data () {
    return {
      childMenu: []
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    getData () {
      var qs = require('qs')
      var path = this.$route.path + '/'
      this.$axios.post('/getChildMenu', qs.stringify({username: store.state.username, path: path}))
        .then(res => {
          this.childMenu = JSON.parse(res.data)
          // console.log(res.data)
        }).catch(res => {
          console.log(res)
        })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>

</style>
