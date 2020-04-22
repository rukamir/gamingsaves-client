<template>
  <el-header>
    <el-row id="heading-section">
      <el-col class="site-title" :sm="12" :xs="24">
        <nuxt-link :to="'/'">GamingSaves.com</nuxt-link>
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
#heading-section {
  padding: 10px;
  margin-bottom: 10px;
}
.site-title {
  font-size: 20px;
  line-height: 1.7;
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
          API_WS + '/simple-search?value=' + queryString
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
