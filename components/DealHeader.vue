<template>
  <el-header>
    <el-row>
      <el-col :sm="12">
        <nuxt-link :to="'/'">Game Deals</nuxt-link>
      </el-col>
      <el-col :sm="12">
        <el-autocomplete
          v-model="searchterm"
          :fetch-suggestions="querySearchAsync"
          placeholder="Please input"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>
    </el-row>
  </el-header>
</template>

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
