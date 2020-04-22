<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ category }}</span>
      </div>
      <el-row v-for="i in list" :key="i.genre">
        <div class="item-entry">
          <nuxt-link :to="`/game/${i.id}`">
            <el-col :sm="12" :xs="9">{{ i.title }}</el-col>
            <el-col :sm="3" :xs="9"><PlatformTag :value="i.platform"/></el-col>
            <el-col :sm="3" :xs="3">{{ i.score || 0 }}</el-col>
            <el-col :sm="3" :xs="3">{{ i.list }}</el-col>
          </nuxt-link>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
.item-entry {
  height: 1.5rem;
  margin: 0.5em;
}
.item-entry:not(:last-child) {
  border: none;
}
.box-card {
  min-width: 30%;
  margin: auto;
}
</style>

<script>
import PlatformTag from '~/components/PlatformTag'

export default {
  name: 'CategoryDisplay',
  components: { PlatformTag },
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
