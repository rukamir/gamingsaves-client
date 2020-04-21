<template>
  <div class="container">
    <el-main>
      <el-row>
        <el-col>Top Games on Sale by Console</el-col>
      </el-row>
      <el-row>
        <!-- eslint-disable-next-line prettier/prettier -->
        <el-col v-for="cat in topplatform" :key="cat.category" :sm="8" :xs="24">
          <CategoryDisplay :category="cat.category" :list="cat.games" />
        </el-col>
      </el-row>
      <el-row>
        <el-col>Top Games on Sale by Genre</el-col>
      </el-row>
      <el-row>
        <!-- eslint-disable-next-line prettier/prettier -->
        <el-col v-for="cat in topgenre" :key="cat.category" :sm="8" :xs="24">
          <CategoryDisplay :category="cat.category" :list="cat.games" />
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import CategoryDisplay from '~/components/CategoryDisplay.vue'
const API_WS = process.env.API_WS

export default {
  components: {
    CategoryDisplay
  },
  asyncData: async ({ $axios }) => {
    let platformLists = null
    let genreLists = null
    try {
      platformLists = await $axios.$get(API_WS + '/top/platform/modern')
      genreLists = await $axios.$get(API_WS + '/top/genre/picks')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error:', err.message)
    }

    return {
      topgenre: genreLists,
      topplatform: platformLists,
      name: 'Jimmy'
    }
  },
  head() {
    return {
      title:
        'GamingSaves.com: Find digital deals on Xbox, PlayStation, and Nintendo consoles.'
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
