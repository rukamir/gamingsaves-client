<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <div style="overflow:auto">
      <ProductDisplay v-for="i in gameList" :key="i.id" :product="i">{{
        i.title
      }}</ProductDisplay>
    </div>
    <el-button v-if="!isDisabled" @click="load">Show More</el-button>
  </div>
</template>

<script>
import ProductDisplay from '~/components/indiv/ProductDisplay'
const API_WS = process.env.API_WS
export default {
  name: 'Browser',
  components: { ProductDisplay },
  asyncData: async ({ $axios, query }) => {
    let gameList = null
    const offset = 1
    const limit = 40
    try {
      gameList = await $axios.$get(API_WS + '/v1/deals', {
        params: {
          platform: query.platform,
          offset,
          limit
        }
      })
    } catch (err) {
      // console.log(err)
    }
    return { gameList, platform: query.platform, offset, limit }
  },
  data() {
    return {
      more: true,
      loading: false
    }
  },
  computed: {
    isDisabled() {
      return !this.more || this.loading
    }
  },
  methods: {
    load() {
      this.loading = true
      this.offset += this.limit
      // if (!this.more) return
      this.getMoreDeals()
    },
    async getMoreDeals() {
      let moreItems = null
      try {
        moreItems = await this.$axios.$get(API_WS + '/v1/deals', {
          params: {
            platform: this.platform,
            limit: this.limit,
            offset: this.offset
          }
        })
        this.gameList = [...this.gameList, ...moreItems]
        if (moreItems.length < this.limit) {
          this.more = false
        }
        this.loading = false
      } catch (err) {
        // console.log(err.message)
      }
    }
  }
}
</script>
