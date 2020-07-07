<template>
  <el-footer id="footer-container">
    <el-row id="footer-section">
      <el-col>
        <nuxt-link to="/about">About</nuxt-link>
      </el-col>
      <el-col>
        <a target="”_blank”" href="https://jimmyroland.com"
          >Created by Jimmy R</a
        >
      </el-col>
    </el-row>
    <div></div>
  </el-footer>
</template>

<style scoped>
#footer-container {
  border-top: 3px solid #683c99;
  background: #be8fff;
  min-height: 125px;
}
#footer-section {
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>

<script>
export default {
  name: 'Footer'
}
</script>
