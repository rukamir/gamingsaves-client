<template>
  <el-header id="header-container">
    <el-row id="heading-section">
      <el-col :sm="12" :xs="24">
        <nuxt-link
          :style="{
            font: '24px',
            color: 'white',
            'font-weight': 700,
            'text-decoration': 'none'
          }"
          :to="'/'"
        >
          <div id="title-main">GamingSaves.com</div>
          <div id="title-sub">Shop all platforms at once.</div>
        </nuxt-link>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-autocomplete
          v-model="searchterm"
          :fetch-suggestions="querySearchAsync"
          placeholder="Please input"
          :trigger-on-focus="false"
          :hide-loading="true"
          :style="{ width: '100%' }"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>
    </el-row>
  </el-header>
</template>

<style scoped>
#title-main {
  font-size: 24px;
}
#title-sub {
  font-size: 16px;
  line-height: 0.75;
  padding-bottom: 10px;
}
#header-container {
  border-bottom: 3px solid #683c99;
  background: #be8fff;
  height: auto;
}
#heading-section {
  padding: 10px;
  margin-bottom: 10px;
}
</style>

<script>
const API_WS = process.env.API_WS
export default {
  name: 'DealHeader',
  data() {
    return { searchterm: '', error: '' }
  },
  methods: {
    async querySearchAsync(queryString, cb) {
      try {
        const results = await this.$axios.$get(
          API_WS + '/v1/simple-search?value=' + queryString
        )
        cb(
          results.map((e) => ({
            value: `${e.platform}: ${e.title}`,
            link: '/game/' + e.id
          }))
        )
      } catch (e) {
        this.error = e.message
      }
    },
    handleSelect(i) {
      this.$router.push({
        path: i.link
      })
    }
  }
}
</script>
