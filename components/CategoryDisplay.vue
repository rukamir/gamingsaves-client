<template>
  <div class="box-card" :style="{ background: 'white' }">
    <div id="box-card-head">{{ category }}</div>
    <el-row id="box-card-label">
      <el-col :span="18">Title</el-col>
      <el-col :span="3">MC</el-col>
      <el-col :span="3">Price</el-col>
    </el-row>
    <div id="box-card-list">
      <el-row v-for="i in list" :key="i.genre">
        <div class="item-entry" @click="gotoGamePage(i.id)">
          <el-col :span="18">
            <PlatformTag :value="i.platform" />
            {{ i.title }}
          </el-col>
          <el-col :span="3">{{ i.score || 0 }}</el-col>
          <el-col :span="3">{{ i.list }}</el-col>
        </div>
      </el-row>
    </div>
  </div>
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
#box-card-list {
  padding: 5px 10px 5px 10px;
}
#box-card-label {
  font-weight: 600;
  padding: 6px 4px 6px 4px;
}
#box-card-head {
  color: white;
  font-weight: 700;
  height: 45px;
  text-align: center;
  font-size: 20px;
  background: #be8fff;
  margin: auto;
  border-radius: 8px 10px 0 0;
  padding: 10px;
  border-bottom: 3px solid #683c99;
}
.box-card {
  min-width: 30%;
  margin: auto;
  border-radius: 14px;
  border-color: #683c99;
  border: 3px solid #683c99;
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
