<template>
  <el-row>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for='(item,index) in menu' :key='index' :index='(index + 1).toString()'>
        <router-link :to="item.path">{{ item.name }}</router-link>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
import store from '@/util/store'

export default {
  name: 'Menu',
  data () {
    return {
      activeIndex: '1',
      menu: ''
    }
  },
  mounted: function () {
    this.getMenu()
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    getMenu () {
      var qs = require('qs')
      this.$axios.post('https://192.168.1.109:9443/demo/myweb/getMenuLevel1', qs.stringify({username: store.state.username})).then(res => {
        // console.log(res)
        this.menu = JSON.parse(res.data)
        // console.log(JSON.parse(res.data))
      }).catch(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
