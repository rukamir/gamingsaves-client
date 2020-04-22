<template>
  <el-tag
    size="mini"
    :style="{
      'border-color': outColor,
      'background-color': bgColor,
      color: outColor,
      display: 'inline'
    }"
    >{{ abbv }}</el-tag
  >
</template>

<script>
export default {
  name: 'PlatformTag',
  props: {
    value: { type: String, default: 'U/A' }
  },
  data() {
    return {
      abbv: this.value
    }
  },
  computed: {
    bgColor() {
      switch (this.value) {
        case 'Nintendo Switch':
          return '#ffbaba'
        case 'Nintendo 3DS':
          return '#dbdbdb'
        case 'Wii U':
          return '#9edbff'
        case 'Xbox One':
          return '#d1edc2'
        case 'PS4':
          return '#97b7d1'
      }
      return 'white'
    },
    outColor() {
      switch (this.value) {
        case 'Nintendo Switch':
        case 'Nintendo 3DS':
          return '#E84924'
        case 'Wii U':
          return '#2AA8F4'
        case 'Xbox One':
          return '#377D12'
        case 'PS4':
          return '#0172CE'
      }
      return 'black'
    }
  },
  created() {
    this.abbv = this.convertStringToAbbrv(this.value)
  },
  methods: {
    convertStringToAbbrv(platform) {
      let platShort = platform
      switch (platform) {
        case 'Nintendo Switch':
          platShort = 'NS'
          break
        case 'Nintendo 3DS':
          platShort = '3DS'
          break
        case 'Xbox One':
          platShort = 'XBO'
      }
      return platShort
    }
  }
}
</script>
