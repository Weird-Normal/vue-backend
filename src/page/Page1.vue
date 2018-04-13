<template>
  <div>
    <el-container>

    <el-aside width="200px">
      <Aside1></Aside1>
    </el-aside>
    <el-container>
      <el-main>
        Page
      </el-main>
    </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside1 from '@/components/page1/Aside1'

export default {
  name: 'Page1',
  data () {
    return {
    }
  },
  components: {
    Aside1
  }
}
</script>

<style>

</style>
