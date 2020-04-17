<template>
  <el-main>
    <div>{{ gameProfile.title }}</div>
    <div>
      <el-alert
        v-if="isCurrentLowPrice === 1"
        title="Buy NOW: Lowest Price"
        type="success"
        description="The current price is the lowest price tracked."
        show-icon
      ></el-alert>
      <el-alert
        v-else-if="isCurrentLowPrice === 2"
        title="Buy If Needed"
        type="warning"
        description="This item is currently on sale but a lower price has been available."
        show-icon
      ></el-alert>
      <el-alert
        v-else
        title="Wait to Buy: Currently listed at MSRP"
        type="info"
        description="This is game not on sale. It is advised to wait for a sale before purchase."
        show-icon
      ></el-alert>
    </div>
    <el-row>
      <el-col :md="12" :xs="24">
        <el-image fit="contain" :src="getImgURL" />
      </el-col>
      <el-col :md="12" :xs="24">
        <ProfileDetail label="Platform">
          {{
          gameProfile.platform
          }}
        </ProfileDetail>
        <ProfileDetail label="Price">{{ gameProfile.list }}</ProfileDetail>
        <ProfileDetail label="Rating">{{ gameProfile.rating }}</ProfileDetail>
        <ProfileDetail label="Release Date">
          {{
          gameProfile.release
          }}
        </ProfileDetail>
        <ProfileDetail label="MetaCritic Score">{{ gameProfile.score }}</ProfileDetail>
        <ProfileDetail label="Developer">{{ gameProfile.dev }}</ProfileDetail>
        <ProfileDetail label="Publisher">{{ gameProfile.pub }}</ProfileDetail>
        <ProfileDetail label="Genre(s)">{{ gameProfile.genres }}</ProfileDetail>
        <el-button type="primary" round @click="visitStorePage">Visit Store Page</el-button>
      </el-col>
    </el-row>
    <el-row>
      <client-only>
        <PriceChart :data="gameProfile.history" />
      </client-only>
    </el-row>
    <el-row>
      <el-col>{{ gameProfile.desc }}</el-col>
    </el-row>
    <el-row>
      <!-- <el-col :md="12" :sm="24">
        <CategoryDisplay
          :category="gameProfile.genres[0]"
          :list="genreSuggestions"
        />
      </el-col>-->
      <el-col :md="12" :sm="24">
        <CategoryDisplay :category="gameProfile.platform.String" :list="platformSuggestions" />
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import PriceChart from '~/components/PriceChart'
import CategoryDisplay from '~/components/CategoryDisplay'
import ProfileDetail from '~/components/ProfileDetail'
const IMG_ENDPOINT = process.env.IMG_ENDPOINT
const API_WS = process.env.API_WS

export default {
  name: 'GameProfilePage',
  components: { PriceChart, CategoryDisplay, ProfileDetail },
  props: {},
  asyncData: async ({ $axios, params }) => {
    let gameProfile = null
    // let genreSuggestions = null
    let platformSuggestions = null
    try {
      gameProfile = await $axios.$get(API_WS + '/game/' + params.game)
      // genreSuggestions = await $axios.$get(
      //   'http://localhost:2000/top/genre/multi?value=' + gameProfile.genres[0]
      // )
      platformSuggestions = await $axios.$get(
        API_WS + '/top/platform?value=' + gameProfile.platform.String
      )
    } catch (err) {
      // genreSuggestions = null
    }
    return { gameProfile, platformSuggestions }
  },
  data() {
    return {
      low: { list: 999 }
    }
  },
  computed: {
    isCurrentLowPrice() {
      if (this.gameProfile.list === this.low.list) return 1
      if (this.gameProfile.list < this.gameProfile.msrp) return 2
      return 0
    },
    getImgURL() {
      return `${IMG_ENDPOINT}/${this.gameProfile.src}/${this.gameProfile.id}`
    }
  },
  created() {
    this.gameProfile.history.forEach((e) => {
      if (e.list < this.low.list) this.low = e
    })
  },
  methods: {
    visitStorePage() {
      window.open(this.gameProfile.url, '_blank')
    }
  }
}
</script>
