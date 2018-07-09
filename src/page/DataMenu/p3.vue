<template>
  <div>
    <h1>P3</h1>
    <p>测试路由传参{{ this.$route.params.num}}</p>
  </div>
</template>

<script>

export default {
  name: 'P3',
  data () {
    return {
    }
  },
  created: function () {
    this.getParams()
  },
  methods: {
    getParams: function () {
      console.log(this.$route.params)
    }
  }
}
</script>
