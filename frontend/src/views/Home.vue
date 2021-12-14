<template lang="pug">
  div
    h1 🐹
    h2 とってもかわいいね
    hamster-chart(
      :chartData="chartData"
      :chartOptions="chartOptions"
      :chartStyles="chartStyles"
    )
</template>

<script lang="ts">
import { ChartOptions, ChartData } from 'chart.js';
import { Component, Vue } from 'vue-property-decorator';
import HamsterChart from '../components/HamsterChart.vue';
import getHamsterJson from '../api/api';
import { HamsterResponse } from '../api/type';

@Component({
  components: {
    HamsterChart,
  },
})
export default class Home extends Vue {
  public hamsterJson: HamsterResponse = {
    nowtime: '',
    weight: 0,
    activeCount: 0,
    temperature: 0,
    wheelCount: 0,
    houseCount: 0,
    humidity: 0,
  };

  async created(): Promise<void> {
    this.hamsterJson = await getHamsterJson();
  }

  // チャートのオプション
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'temperature',
          type: 'linear',
          position: 'left',
        },
        {
          id: 'humidity',
          type: 'linear',
          position: 'right',
        },
      ],
    },
  };

  // チャートのスタイル: <canvas>のstyle属性として設定
  chartStyles = {
    height: '100%',
    width: '100%',
  };

  // チャートのデータ
  chartData: ChartData = {
    datasets: [{
      label: '温度',
      type: 'line',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
      borderDash: [8, 4],
      fill: true,
      data: [19.0, 19.1, 18.9, 19.1],
      yAxisID: 'temperature',
    }, {
      label: '湿度',
      type: 'line',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
      borderDash: [8, 4],
      fill: true,
      data: [39.0, 39.3, 38.9, 39.1],
      yAxisID: 'humidity',
    }],
  };
}
</script>
