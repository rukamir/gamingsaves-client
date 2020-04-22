<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ category }}</span>
    </div>
    <div>
      <el-row>
        <el-col :span="18">
          Title
        </el-col>
        <el-col :span="3">
          MC
        </el-col>
        <el-col :span="3">
          Price
        </el-col>
      </el-row>
    </div>
    <el-row v-for="i in list" :key="i.genre">
      <div class="item-entry" @click="gotoGamePage(i.id)">
        <el-col :span="18"
          ><PlatformTag :value="i.platform" />{{ i.title }}</el-col
        >
        <el-col :span="3">{{ i.score || 0 }}</el-col>
        <el-col :span="3">{{ i.list }}</el-col>
      </div>
    </el-row>
  </el-card>
</template>

<style scoped>
.item-entry {
  min-height: 46px;
  height: 1.5rem;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  margin: auto;
  width: 100%;
  text-align: left;
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
  },
  methods: {
    gotoGamePage(id) {
      this.$router.push({ path: `/game/${id}` })
    }
  }
}
</script>
