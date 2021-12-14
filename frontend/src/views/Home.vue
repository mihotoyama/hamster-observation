<template lang="pug">
  div
    h1 🐹
    h2 とってもかわいいね
    | 今晩の回転数 {{ wheelCount }} 回
    | 餌場うろうろ {{ activeCount }} 分
    | 寝床の出入り {{ houseCount }} 回
    hamster-chart-line(
      :chartData="chartDataTempHum"
      :chartOptions="chartOptionsTempHum"
      :chartStyles="chartStyles"
    )
    hamster-chart-line(
      :chartData="chartDataWheelSpeed"
      :chartOptions="chartOptionsWheelSpeed"
      :chartStyles="chartStyles"
    )
    hamster-chart-bar(
      :chartData="chartDataWheelSpeed"
      :chartOptions="chartOptionsWheelSpeed"
      :chartStyles="chartStyles"
    )

</template>

<script lang="ts">
import { ChartOptions, ChartData } from 'chart.js';
import { Component, Vue } from 'vue-property-decorator';
import HamsterChartLine from '../components/HamsterChartLine.vue';
import HamsterChartBar from '../components/HamsterChartBar.vue';
import getHamsterJson from '../api/api';
import { HamsterResponseArray } from '../api/type';

@Component({
  components: {
    HamsterChartLine,
    HamsterChartBar,
  },
})
export default class Home extends Vue {
  public hamsterJsonArray: HamsterResponseArray = [{
    nowtime: '',
    weight: 0,
    activeCount: 0,
    temperature: 0,
    wheelCount: 0,
    houseCount: 0,
    humidity: 0,
    wheelSpeed: 0,
  }];

  async mounted(): Promise<void> {
    this.hamsterJsonArray = await getHamsterJson();

    /* eslint-disable max-len */
    const { activeCount, wheelCount, houseCount } = this.hamsterJsonArray[this.hamsterJsonArray.length - 1];
    /* eslint-enable max-len */

    const temperature = [];
    for (let i = 0; i < this.hamsterJsonArray.length; i += 1) {
      temperature[i] = {
        x: this.hamsterJsonArray[i].nowtime,
        y: this.hamsterJsonArray[i].temperature,
      };
    }

    const humidity = [];
    for (let i = 0; i < this.hamsterJsonArray.length; i += 1) {
      humidity[i] = {
        x: this.hamsterJsonArray[i].nowtime,
        y: this.hamsterJsonArray[i].humidity,
      };
    }

    const wheelSpeed = [];
    for (let i = 0; i < this.hamsterJsonArray.length; i += 1) {
      wheelSpeed[i] = {
        x: this.hamsterJsonArray[i].nowtime,
        y: this.hamsterJsonArray[i].wheelSpeed,
      };
    }
  }

  // チャートのオプション
  chartOptionsTempHum: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'second',
            min: '20211210220000',
            max: '20211210223000',
            displayFormats: {
              hour: 'HH:mm:ss',
            },
          },
        },
      ],
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

  chartOptionsWheelSpeed: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'wheel-speed',
          type: 'linear',
          position: 'left',
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
  chartDataTempHum: ChartData = {
    datasets: [{
      label: '温度',
      type: 'line',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
      borderDash: [8, 4],
      fill: true,
      data: [19.0, 19.1, 18.9, 19.1], // this.temperature,
      yAxisID: 'temperature',
    }, {
      label: '湿度',
      type: 'line',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
      borderDash: [8, 4],
      fill: true,
      data: [39.0, 39.3, 38.9, 39.1], // this.humidity,
      yAxisID: 'humidity',
    }],
  };

  chartDataWheelSpeed: ChartData = {
    datasets: [{
      label: '回し車(rpm)',
      type: 'line',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
      borderDash: [8, 4],
      fill: true,
      data: [3000, 3010, 3008, 3015], // this.wheelSpeed,
      yAxisID: 'wheel-speed',
    }],
  };
}
</script>
