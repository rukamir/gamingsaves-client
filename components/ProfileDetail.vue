<template>
  <el-row>
    <el-col class="label" :sm="12" :xs="12">{{ label }}</el-col>
    <el-col class="display" :sm="12" :xs="12">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<style scoped>
.label {
  font-size: 16px;
  line-height: 1.5;
}
.display {
  font-size: 18px;
  line-height: 1.5;
}
</style>

<script>
export default {
  name: 'ProfileDetail',
  props: { label: { type: String, default: 'Label' } }
}
</script>
