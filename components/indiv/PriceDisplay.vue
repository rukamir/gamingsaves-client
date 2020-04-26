<template>
  <el-row>
    <el-col :span="12" class="discount">
      <div class="disc-style">{{ discount || 0 }}%</div>
    </el-col>
    <el-col :span="12" class="msrp">{{ msrp }}</el-col>
    <el-col :span="24" class="list-price">{{ list }}</el-col>
  </el-row>
</template>

<style scoped>
.disc-style {
  background: #3be01a;
  border: 1px solid green;
  margin: auto;
  color: green;
}
.discount {
  text-align: right;
  width: 50%;
}
.msrp {
  text-decoration: line-through;
  text-align: right;
}
.list-price {
  font-weight: 700;
  text-align: right;
}
</style>

<script>
export default {
  name: 'PriceDisplay',
  props: {
    msrp: { type: Number, default: 99 },
    list: { type: Number, default: 49.99 },
    discount: { type: Number, default: 0 }
  }
}
</script>
