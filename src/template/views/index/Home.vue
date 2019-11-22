<template>
  <div class="home">
    <header-bar></header-bar>
    <div class="text">
      projectName:
      <strong>{{projectName}}</strong>
    </div>

    <div class="text">
      mode:
      <strong>{{mode}}</strong>
    </div>

    <van-button type="info" @click="onClick">About</van-button>
  </div>
</template>

<script>
import headerBar from '@@/components/headerBar'

export default {
  name: 'home',
  data () {
    return {
      projectName: process.env.VUE_APP_PROJECT_NAME,
      mode: process.env.VUE_APP_MODE
    }
  },
  created () {
    this.$loading.show()
  },
  mounted () {
    setTimeout(() => {
      this.$loading.hide()
    }, 3000)
  },
  methods: {
    onClick () {
      this.$toast('aaa')
      this.$router.push({
        name: 'about'
      })
    }
  },
  components: {
    headerBar
  }
}
</script>

<style lang="less" scoped>
.home {
  text-align: center;
  // padding: 20px;
  height: 2000px;
}
.text {
  padding: 10px;
}
</style>
