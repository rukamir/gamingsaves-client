<template>
  <div>
    <div class="catdisplay-detail-header">{{ category }}</div>
    <div class="catdisplay-detail-body">
      <el-row :gutter="35">
        <el-col
          v-for="i in list.slice(0, 5)"
          :key="`${category}${i.id}`"
          :md="4"
          :sm="24"
          :xs="24"
          @click="gotoGamePage(i.id)"
        >
          <el-row>
            <div @click="gotoGamePage(i.id)">
              <el-col :md="24" :sm="8" :xs="8">
                <el-image
                  class="cover-image"
                  fit="contain"
                  :src="getImgURL(i)"
                />
              </el-col>
              <el-col :md="24" :sm="8" :xs="8" class="title">{{
                i.title
              }}</el-col>
              <el-col :md="24" :sm="8" :xs="8" class="title">{{
                i.score || 0
              }}</el-col>
              <el-col :md="24" :sm="8" :xs="8">
                <PriceDisplay
                  :list="i.list"
                  :msrp="i.msrp"
                  :discount="i.discount"
                />
              </el-col>
            </div>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="35">
        <el-col
          v-for="i in list.slice(5, 10)"
          :key="`${category}${i.id}`"
          :md="4"
          :sm="24"
          :xs="24"
          @click="gotoGamePage(i.id)"
        >
          <el-row>
            <div @click="gotoGamePage(i.id)">
              <el-col :md="24" :sm="8" :xs="8">
                <el-image
                  class="cover-image"
                  fit="contain"
                  :src="getImgURL(i)"
                />
              </el-col>
              <el-col :md="24" :sm="8" :xs="8" class="title">{{
                i.title
              }}</el-col>
              <el-col :md="24" :sm="8" :xs="8" class="title">{{
                i.score || 0
              }}</el-col>
              <el-col :md="24" :sm="8" :xs="8">
                <PriceDisplay
                  :list="i.list"
                  :msrp="i.msrp"
                  :discount="i.discount"
                />
              </el-col>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 18px;
}
.cover-image {
  max-width: 200px;
  border: dashed blue 1px;
}
.cover-image img {
  max-height: 100%;
  max-width: 100%;
}
.catdisplay-detail-header {
  font-size: 20px;
}
</style>

<script>
import PriceDisplay from '~/components/indiv/PriceDisplay'

export default {
  name: 'CategoryDisplayDetailed',
  components: { PriceDisplay },
  props: {
    category: { type: String, default: 'Category' },
    list: { type: Array, default: () => [] }
  },
  data() {
    return {
      IMG_SRC: process.env.IMG_SRC,
      API_WS: process.env.API_WS,
      low: { list: 999 }
    }
  },
  computed: {},
  mounted() {
    console.log({ list: this.list })
  },
  methods: {
    gotoGamePage(id) {
      console.log({ id })
      this.$router.push({ path: `/game/${id}` })
    },
    getImgURL(entry) {
      return `${this.IMG_SRC}/${entry.src}/${entry.id}`
    }
  }
}
</script>
