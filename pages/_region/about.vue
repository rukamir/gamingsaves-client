<template>
  <el-main>
    <div class="page-title">About GamingSaves.com</div>
    <div class="page-details">
      {{
        'Some of the digital store fronts can be slow while looking through a large ' +
          'amount of games. GamingSaves pools the sales from Xbox Live, PlayStation Network, and Nintendo eShop. ' +
          'There are curated lists for Highest MetaCritic score, games under $10, games under $20, and most popular. ' +
          'The site is still under heavy development and more features will be added over time.'
      }}
    </div>
    <div class="page-section-heading">The Creator</div>
    <div class="page-details">
      {{
        'If you need to contact the creator of this site for anything please email admin@gamingsaves.com'
      }}
    </div>
  </el-main>
</template>

<style scoped>
.page-title {
  font-size: 22px;
  line-height: 1.7;
}
.page-section-heading {
  font-size: 18px;
  margin: 10px;
}
.page-details {
  font-size: 16px;
  line-height: 1.7;
}
</style>

<script>
import { createMetaTagsForSocial } from '~/support/meta'

export default {
  name: 'About',
  head() {
    const url = `https://gamingsaves.com/about`
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
