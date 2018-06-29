<template>
  <el-row>
    <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for='(item,index) in menu' :key='index' :index='item.path'>
        {{ item.name }}
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
    this.getPermit()
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    },
    getMenu () {
      var qs = require('qs')
      this.$axios.post('/getMenuLevel1', qs.stringify({username: store.state.username})).then(res => {
        // this.menu = JSON.parse(res.data)
        this.menu = res.data
      }).catch(res => {
        console.log(res)
      })
    },
    getPermit () {
      var qs = require('qs')
      this.$axios.post('/getPermit', qs.stringify({username: store.state.username}))
        .then(res => {
          // this.$store.commit('setPermit', JSON.parse(res.data))
          this.$store.commit('setPermit', res.data)
        }).catch(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style scoped>

</style>
