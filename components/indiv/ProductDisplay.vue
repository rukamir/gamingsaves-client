<template>
  <div @click="gotoGamePage">
    <el-row class="product-container">
      <el-col :sm="4" :xs="8">{{ product.title }}</el-col>
      <el-col :sm="4" :xs="8">
        <PlatformTag :value="product.platform" />
      </el-col>
      <el-col :sm="4" :xs="8">
        <PriceDisplay
          :msrp="product.msrp"
          :list="product.list"
          :discount="product.discount"
        />
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.product-container {
  min-height: 50px;
  padding: 10px 15px 10px 15px;
}
</style>

<script>
import PriceDisplay from '~/components/indiv/PriceDisplay'
import PlatformTag from '~/components/PlatformTag'

export default {
  name: 'ProductDisplay',
  components: { PriceDisplay, PlatformTag },
  props: {
    product: { type: Object, default: () => {} }
  },
  methods: {
    gotoGamePage() {
      this.$router.push({ path: `/game/${this.product.id}` })
    }
  }
}
</script>
