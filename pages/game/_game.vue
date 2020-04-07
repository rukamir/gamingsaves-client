<template>
  <div>
    <div>{{ gameProfile.title }}</div>
    <div v-if="isCurrentLowPrice === 1">Its low</div>
    <div v-else-if="isCurrentLowPrice === 2">Its not that low</div>
    <div v-else>Not on sale</div>
    <el-row>
      <client-only>
        <PriceChart :data="gameProfile.history" />
      </client-only>
    </el-row>
  </div>
</template>

<script>
import PriceChart from '~/components/PriceChart'

export default {
  name: 'GameProfilePage',
  components: { PriceChart },
  props: {},
  asyncData: async ({ $axios, params }) => {
    let gameProfile = null
    console.log({ params })
    try {
      gameProfile = await $axios.$get(
        'http://localhost:2000/game/' + params.game
      )
    } catch (err) {
      console.log('Error:', err.message)
    }
    return { gameProfile }
  },
  data() {
    return {
      low: { list: 999 }
    }
  },
  created() {
    this.gameProfile.history.forEach((e) => {
      if (e.list < this.low.list) this.low = e
    })
  },
  computed: {
    isCurrentLowPrice() {
      if (this.gameProfile.list === this.low.list) return 1
      if (this.gameProfile.list < this.gameProfile.msrp) return 2
      return 0
    }
  }
}
</script>
