<template>
  <div class="container">
    <el-main>
      <el-row>
        <el-col
          v-for="cat in topplatform"
          :key="cat.genre"
          :sm="8"
          :md="8"
          :lg="4"
        >
          <CategoryDisplay :category="cat.genre" :list="cat.games" />
        </el-col>
      </el-row>

      <el-row>
        <el-col
          v-for="cat in topgenre"
          :key="cat.genre"
          :sm="8"
          :md="8"
          :lg="4"
        >
          <CategoryDisplay :category="cat.genre" :list="cat.games" />
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import CategoryDisplay from '~/components/CategoryDisplay.vue'

export default {
  components: {
    CategoryDisplay
  },
  asyncData: async ({ $axios }) => {
    let platformLists = null
    let genreLists = null
    try {
      platformLists = await $axios.$get(
        'http://localhost:2000/top/platform/all'
      )
      genreLists = await $axios.$get('http://localhost:2000/top/genre/all')
    } catch (err) {
      console.log('Error:', err.message)
    }

    return {
      topgenre: genreLists,
      topplatform: platformLists,
      name: 'Jimmy'
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
