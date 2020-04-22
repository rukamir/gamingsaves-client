<template>
  <div>
    <!-- eslint-disable-next-line prettier/prettier -->
    <GChart
      type="LineChart"
      :settings="settings"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
const datesAreOnSameDay = (first, second) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}
// data column format found at https://developers.google.com/chart/interactive/docs/datesandtimes?hl=en#dates-and-times-using-the-date-string-representation

export default {
  name: 'PriceChart',
  components: { GChart },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      maxHistDate: new Date(),
      settings: { packages: ['line', 'corechart'] },
      chartData: {}
    }
  },
  computed: {
    chartOptions() {
      return {
        title: 'Game Price 12 months',
        hAxis: {
          minValue: this.maxHistDate
        },
        legend: { position: 'none' },
        height: 400,
        colors: ['#1b9e77', '#d95f02', '#7570b3']
      }
    }
  },
  created() {
    this.maxHistDate.setDate(this.maxHistDate.getDate() - 365)
    this.chartData = [
      [
        { id: 'date1', label: 'Date', type: 'date' },
        { id: 'price1', label: 'Price', type: 'number' }
      ]
    ]
    // this.data.push({ date: '2020-01-01T00:00:00Z', list: 1 })
    // this.data.push({ date: '2019-12-15T00:00:00Z', list: 6 })

    let td = []
    const priceDate = new Date()
    this.data.forEach((e) => {
      // if today is the most recent price start there
      if (datesAreOnSameDay(new Date(e.date), new Date())) {
        td.push({
          date: new Date(priceDate),
          list: e.list
        })
      } else {
        // if today isnt the most recent price fill the dats forward with latest price
        // eslint-disable-next-line no-lonely-if
        if (td.length === 0) {
          td = this.fillPriceDateArray(new Date(), e.date, e.list)
        } else {
          // fill between price dates
          // take this price and last saved and fill between with the older price
          td = td.concat(
            this.fillPriceDateArray(
              new Date(td[td.length - 1].date),
              new Date(e.date),
              e.list
            )
          )
        }
      }
    })

    this.chartData = this.chartData.concat(td.map((i) => [i.date, i.list]))
  },
  methods: {
    fillPriceDateArray: (datestart, datelimit, price) => {
      const lastDate = new Date(datelimit)
      const priceDate = new Date(datestart)
      const dateList = []
      while (
        // !datesAreOnSameDay(new Date(datestart), priceDate) &&
        // eslint-disable-next-line no-unmodified-loop-condition
        lastDate < priceDate &&
        dateList.length < 400
      ) {
        priceDate.setDate(priceDate.getDate() - 1)
        dateList.push({
          date: new Date(priceDate),
          list: price
        })
      }
      return dateList
    }
  }
}
</script>
