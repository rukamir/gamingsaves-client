<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ category }}</span>
      </div>
      <div v-for="i in list" :key="i.genre" class="text item">
        <nuxt-link :to="`/game/${i.id}`">
          <div>{{ i.title }}</div>
          <div>{{ i.platform }}</div>
          <div>{{ i.score }}</div>
        </nuxt-link>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.box-card {
  min-width: 325px;
  margin: auto;
}
</style>

<script>
export default {
  name: 'CategoryDisplay',
  props: {
    category: { type: String, default: 'Category' },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>
