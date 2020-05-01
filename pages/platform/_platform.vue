<template>
  <div>
    <SectionBanner :title="platformTitle" />
    <SectionBanner
      sub="view all games on sale"
      @click.native="gotoDealBrowser"
    ></SectionBanner>
    <CategoryDisplayDetailed category="Most Popular" :list="popularList" />
    <CategoryDisplayDetailed
      category="Recent Releases on Sale"
      :list="recentList"
    />
    <el-row :gutter="50">
      <el-col :sm="12" :xs="24">
        <CategoryDisplay category="On Sale Under $10" :list="undertenList" />
      </el-col>
      <el-col :sm="12" :xs="24">
        <CategoryDisplay category="On Sale Under $20" :list="undertwentyList" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SectionBanner from '~/components/SectionBanner'
import CategoryDisplayDetailed from '~/components/CategoryDisplayDetailed'
import CategoryDisplay from '~/components/CategoryDisplay'
import { createMetaTagsForSocial } from '~/support/meta'

export default {
  name: 'PlatformPage',
  components: { SectionBanner, CategoryDisplayDetailed, CategoryDisplay },
  asyncData: async ({ $axios, params }) => {
    const { API_WS } = process.env
    let popularList = null
    let recentList = null
    let highscoreList = null
    let undertenList = null
    let undertwentyList = null

    try {
      popularList = await $axios.$get(
        API_WS + '/v1/popular?platform=' + params.platform
      )
      recentList = await $axios.$get(
        API_WS + '/v1/recent?platform=' + params.platform
      )
      highscoreList = await $axios.$get(API_WS + '/v1/top/' + params.platform)
      undertwentyList = await $axios.$get(
        API_WS + '/v1/top/' + params.platform + '?under=20'
      )
      undertenList = await $axios.$get(
        API_WS + '/v1/top/' + params.platform + '?under=10'
      )
    } catch (err) {
      // something
    }
    return {
      platformTitle: params.platform,
      popularList,
      recentList,
      highscoreList,
      undertwentyList,
      undertenList
    }
  },
  methods: {
    gotoDealBrowser() {
      this.$router.push({ path: `/browser?platform=${this.platformTitle}` })
    }
  },
  head() {
    const { platformTitle } = this
    const url = `https://gamingsaves.com/platform/${platformTitle}`
    const description = `Find gaming deals for ${platformTitle}: Under $20, Under $10, Highest MetaCritic Score`
    const title = `${platformTitle} Games on Sale`
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
