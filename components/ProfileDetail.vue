<template>
  <el-row>
    <el-col :sm="12" :xs="12">{{ label }}</el-col>
    <el-col :sm="12" :xs="12">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ProfileDetail',
  props: { label: { type: String, default: 'Label' } }
}
</script>
