<template>
  <div>{{ gameProfile.title }}</div>
</template>

<script>
export default {
  name: 'GameProfilePage',
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
