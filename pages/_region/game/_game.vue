<template>
  <el-main>
    <div class="game-body-main">
      <div class="game-body-header">{{ gameProfile.title }}</div>
      <div>
        <el-alert
          v-if="isCurrentLowPrice === 1"
          title="Buy NOW: Lowest Price"
          type="success"
          description="The current price is the lowest price tracked."
          :closable="false"
          show-icon
        ></el-alert>
        <el-alert
          v-else-if="isCurrentLowPrice === 2"
          title="Buy If Needed"
          type="warning"
          description="This item is currently on sale but a lower price has been available."
          :closable="false"
          show-icon
        ></el-alert>
        <el-alert
          v-else
          title="Wait to Buy: Currently listed at MSRP"
          type="info"
          description="This is game not on sale. It is advised to wait for a sale before purchase."
          :closable="false"
          show-icon
        ></el-alert>
      </div>
      <el-row class="main-section-row">
        <el-col :sm="10" :xs="8">
          <el-image
            class="cover-image"
            fit="contain"
            :src="getImgURL"
            :preview-src-list="[getImgURL]"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-col>
        <el-col :sm="14" :xs="16">
          <ProfileDetail label="Platform">
            {{ gameProfile.platform }}
          </ProfileDetail>
          <ProfileDetail label="Price">
            <PriceDisplay
              :list="gameProfile.list"
              :msrp="gameProfile.msrp"
              :discount="gameProfile.discount"
            />
          </ProfileDetail>
          <ProfileDetail label="Rating">{{
            gameProfile.rating || 'N/A'
          }}</ProfileDetail>
          <ProfileDetail label="Release Date">{{ displayDate }}</ProfileDetail>
          <ProfileDetail label="MetaCritic Score">{{
            gameProfile.score || 0
          }}</ProfileDetail>
          <ProfileDetail label="Developer">{{ gameProfile.dev }}</ProfileDetail>
          <ProfileDetail label="Publisher">{{ gameProfile.pub }}</ProfileDetail>
          <ProfileDetail label="Genre(s)">
            {{ gameProfile.genres }}
          </ProfileDetail>
          <el-button type="primary" round @click="visitStorePage"
            >Visit Store Page</el-button
          >
        </el-col>
      </el-row>
      <div class="game-body-midsec">Price History</div>
      <el-row>
        <client-only>
          <PriceChart :data="gameProfile.history" />
        </client-only>
      </el-row>
      <div class="game-body-midsec">Description</div>
      <el-row>
        <el-col class="description-body">{{ gameProfile.desc }}</el-col>
      </el-row>
    </div>
    <el-row :gutter="35">
      <el-col :md="12" :sm="24" :xs="24">
        <CategoryDisplay
          category="Popular on this Platform"
          :list="popularPlatform"
        />
      </el-col>
      <el-col :md="12" :sm="24" :xs="24">
        <CategoryDisplay
          :category="gameProfile.platform"
          :list="platformSuggestions"
        />
      </el-col>
    </el-row>
  </el-main>
</template>

<style scoped>
.game-body-midsec {
  background: #be8fff;
  color: white;
  height: 45px;
  font-size: 20px;
  font-weight: 700;
  padding: 0.5em;
  border-bottom: 3px solid #683c99;
  border-top: 3px solid #683c99;
  margin: auto;
}
.game-body-main {
  border-radius: 10px 10px 10px 10px;
  border: 3px solid #683c99;
  background: white;
  margin: 2em 0 2em 0;
}
.game-body-header {
  background: #be8fff;
  border-radius: 7px 7px 0 0;
  border-bottom: 3px solid #683c99;
  color: white;
  font-weight: 900;
  text-align: left;
  font-size: 24px;
  margin: auto;
  padding: 10px 1em 10px 1em;
}
.main-section-row {
  border: none;
}
.cover-image {
  padding: 1rem;
  display: block;
  margin: auto;
}
.description-body {
  font-size: 16px;
  line-height: 1.3;
  padding: 1em;
}
</style>

<script>
import moment from 'moment'
import PriceChart from '~/components/PriceChart'
import ProfileDetail from '~/components/ProfileDetail'
import CategoryDisplay from '~/components/CategoryDisplay'
import PriceDisplay from '~/components/indiv/PriceDisplay'
import { createMetaTagsForSocial } from '~/support/meta'

export default {
  name: 'GameProfilePage',
  components: { PriceChart, CategoryDisplay, ProfileDetail, PriceDisplay },
  props: {},
  async asyncData({ $axios, params }) {
    const API_WS = process.env.API_WS
    let gameProfile = null
    // let genreSuggestions = null
    let platformSuggestions = null
    let popularPlatform = null
    try {
      gameProfile = await $axios.$get(API_WS + '/v1/en/US/game/' + params.game)
      // genreSuggestions = await $axios.$get(
      //   'http://localhost:2000/top/genre/multi?value=' + gameProfile.genres[0]
      // )
      platformSuggestions = await $axios.$get(
        API_WS + '/v1/en/US/top/platform?value=' + gameProfile.platform
      )
      popularPlatform = await $axios.$get(
        API_WS + '/v1/en/US/popular?platform=' + gameProfile.platform
      )
    } catch (err) {
      // genreSuggestions = null
      // console.log('err', err.message)
    }
    return { gameProfile, platformSuggestions, popularPlatform }
  },
  data() {
    return {
      IMG_SRC: process.env.IMG_SRC,
      API_WS: process.env.API_WS,
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
      return `${this.IMG_SRC}/gamingsaves/${this.gameProfile.src}/en/US/${this.gameProfile.id}`
    },
    displayDate() {
      return moment(this.gameProfile.release).format('L')
    }
  },
  created() {
    // this.gameProfile.history.forEach((e) => {
    //   if (e.list < this.low.list) this.low = e
    // })
  },
  methods: {
    visitStorePage() {
      window.open(this.gameProfile.url, '_blank')
    }
  },
  head() {
    const { id, title, platform } = this.gameProfile
    const url = `https://gamingsaves.com/game/${id}`
    const displayTitle = `Price Tracking for ${title} on ${platform}`
    const description = `See if ${title} is currently on sale and it's lowest price.`
    return {
      title: `${title} for ${platform} price history`,
      link: [
        {
          rel: 'canonical',
          href: 'https://gamingsaves.com' + this.$route.path
        }
      ],
      meta: [
        ...createMetaTagsForSocial({ url, title: displayTitle, description })
      ]
    }
  }
}
</script>
