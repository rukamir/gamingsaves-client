<template>
  <el-main>
    <SectionBanner
      title="GamingSaves"
      sub="Shop Xbox Live, PlayStation Network, and Nintendo eShop at the same time."
    >
      <el-row>
        <el-col
          v-for="i in platformsAvailable"
          :key="i"
          :md="4"
          :sm="8"
          :xs="24"
        >
          <el-button class="plat-button" @click="gotoConsolePage(i)">
            {{ i }}
          </el-button>
        </el-col>
      </el-row>
    </SectionBanner>
    <el-row :gutter="5">
      <!-- eslint-disable-next-line prettier/prettier -->
      <el-col v-for="cat in topplatform" :key="cat.category" :sm="8" :xs="24">
        <CategoryDisplay :category="cat.category" :list="cat.games" />
      </el-col>
    </el-row>
    <SectionBanner title="Top Games on Sale by Genre" />
    <el-row :gutter="5">
      <!-- eslint-disable-next-line prettier/prettier -->
      <el-col v-for="cat in topgenre" :key="cat.category" :sm="8" :xs="24">
        <CategoryDisplay :category="cat.category" :list="cat.games" />
      </el-col>
    </el-row>
  </el-main>
</template>

<style scoped>
.plat-button {
  margin: auto;
}
</style>

<script>
import CategoryDisplay from '~/components/CategoryDisplay.vue'
import SectionBanner from '~/components/SectionBanner'
import { createMetaTagsForSocial } from '~/support/meta'
const API_WS = process.env.API_WS

export default {
  components: {
    CategoryDisplay,
    SectionBanner
  },
  asyncData: async ({ $axios }) => {
    let platformLists = null
    let genreLists = null
    let platformsAvailable = null
    try {
      platformLists = await $axios.$get(API_WS + '/top/platform/modern')
      genreLists = await $axios.$get(API_WS + '/top/genre/picks')
      platformsAvailable = await $axios.$get(API_WS + '/v1/platform/available')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error:', err.message)
    }

    return {
      topgenre: genreLists,
      topplatform: platformLists,
      platformsAvailable,
      name: 'Jimmy'
    }
  },
  methods: {
    gotoConsolePage(console) {
      this.$router.push({ path: `/platform/${console}` })
    }
  },
  head() {
    const url = `https://gamingsaves.com/`
    const description = `Find gaming deals for Xbox, PlayStation, and Switch.`
    const title = `GamingSaves.com: Track prices and shop cross platform`
    return {
      title,
      link: [
        {
          rel: 'canonical',
          href: 'https://gamingsaves.com' + this.$route.path
        }
      ],
      meta: [...createMetaTagsForSocial({ url, title, description })]
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
