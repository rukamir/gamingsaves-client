<template>
  <div>
    <div>{{ gameProfile.title }}</div>
    <el-row>
      <PriceChart :data="gameProfile.history" />
    </el-row>
  </div>
</template>

<script>
import PriceChart from '~/components/PriceChart'

export default {
  name: 'GameProfilePage',
  components: { PriceChart },
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
  props: {},
  data() {
    return {}
  }
}
</script>
