<template>
  <div class="heading-container">
    <div id="main-heading" :span="24">{{ title }}</div>
    <div v-if="sub" id="sub-heading">{{ sub }}</div>
    <div><slot></slot></div>
  </div>
</template>

<style scoped>
#main-heading {
  font-size: 24px;
  text-align: center;
}
#sub-heading {
  font-size: 18px;
  text-align: center;
}
.heading-container {
  min-height: 75px;
  background: white;
  border-radius: 14px;
  border: 3px solid #683c99;
}
</style>

<script>
export default {
  name: 'SectionBanner',
  props: {
    title: { type: String, default: null },
    sub: { type: String, default: null }
  }
}
</script>
