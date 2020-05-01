<template>
  <div :style="{ background: '#f2f2f2' }">
    <DealHeader />
    <el-row>
      <el-col :lg="3" :sm="24" :xs="24">AD AD AD</el-col>
      <el-col :lg="18" :sm="24" :xs="24">
        <nuxt />
      </el-col>
      <el-col :lg="3" :sm="24" :xs="24">AD AD AD</el-col>
    </el-row>
    <Footer />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

<script>
import DealHeader from '~/components/DealHeader'
import Footer from '~/components/Footer'

export default {
  name: 'Default',
  components: { DealHeader, Footer }
}
</script>
