<template lang="pug">
  div
    h1 🐹
    h2 とってもかわいいね
    | 今晩の回転数 {{ wheelCount }} 回
    | 餌場うろうろ {{ activeCount }} 分
    | 寝床の出入り {{ houseCount }} 回
    hamster-chart-line(
      v-if="temperature.length !== 0"
      :chartData="chartDataTempHum"
      :chartOptions="chartOptionsTempHum"
      :chartStyles="chartStyles"
    )
    hamster-chart-line(
      :chartData="chartDataWheelSpeed"
      :chartOptions="chartOptionsWheelSpeed"
      :chartStyles="chartStyles"
    )

</template>

<script lang="ts">
import { ChartOptions, ChartData } from 'chart.js';
import { Component, Vue, Watch } from 'vue-property-decorator';
import HamsterChartLine from '../components/HamsterChartLine.vue';
import HamsterChartBar from '../components/HamsterChartBar.vue';
import getHamsterJson from '../api/api';
import { HamsterResponse, HamsterResponseArray } from '../api/type';

interface DataForChart {
  x: string,
  y: number,
}

type HamsterDataArray = HamsterResponse[];

@Component({
  components: {
    HamsterChartLine,
    HamsterChartBar,
  },
})
export default class Home extends Vue {
  public hamsterDataArray: HamsterDataArray = [{
    nowtime: '',
    weight: 0,
    activeCount: 0,
    temperature: 0,
    wheelCount: 0,
    houseCount: 0,
    humidity: 0,
    wheelSpeed: 0,
  }];

  public activeCount = 0;

  public wheelCount = 0;

  public houseCount = 0;

  public temperature: DataForChart[] = [];

  public humidity: DataForChart[] = [];

  public wheelSpeed: DataForChart[] = [];

  // チャートのオプション
  public chartOptionsTempHum: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          type: 'time',
          ticks: {
            min: '20211210220000',
            max: '20211210223000',
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

  public chartOptionsWheelSpeed: ChartOptions = {
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
  public chartStyles = {
    height: '100%',
    width: '100%',
  };

  // チャートのデータ
  public chartDataTempHum: ChartData = {
    datasets: [{
      label: '温度',
      type: 'line',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
      borderDash: [8, 4],
      fill: true,
      data: this.temperature,
      yAxisID: 'temperature',
    }, {
      label: '湿度',
      type: 'line',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
      borderDash: [8, 4],
      fill: true,
      data: this.humidity,
      yAxisID: 'humidity',
    }],
  };

  public chartDataWheelSpeed: ChartData = {
    datasets: [{
      label: '回し車(rpm)',
      type: 'line',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
      borderDash: [8, 4],
      fill: true,
      data: this.wheelSpeed,
      yAxisID: 'wheel-speed',
    }],
  };

  @Watch('temperature')
  onTemperatureChanged() {
    console.log('watch', this.temperature);
    this.chartDataTempHum.datasets[0]!.data! = this.temperature;
  }

  @Watch('temperature')
  onHumidityChanged() {
    console.log('watch', this.humidity);
    this.chartDataTempHum.datasets[1]!.data! = this.humidity;
  }

  @Watch('wheelSpeed')
  onWheelSpeedChanged() {
    console.log('watch', this.wheelSpeed);
    this.chartDataWheelSpeed.datasets[0]!.data! = this.wheelSpeed;
  }

  async mounted(): Promise<void> {
    this.hamsterDataArray = await (await getHamsterJson()).allData;

    /* eslint-disable max-len */
    const { activeCount, wheelCount, houseCount } = this.hamsterDataArray[this.hamsterDataArray.length - 1];
    /* eslint-enable max-len */

    this.activeCount = activeCount;
    this.wheelCount = wheelCount;
    this.houseCount = houseCount;

    const temperature = [];
    for (let i = 0; i < this.hamsterDataArray.length; i += 1) {
      temperature[i] = {
        x: this.hamsterDataArray[i].nowtime,
        y: this.hamsterDataArray[i].temperature,
      };
    }
    this.temperature = temperature;

    console.log('mounted', this.temperature);

    const humidity = [];
    for (let i = 0; i < this.hamsterDataArray.length; i += 1) {
      humidity[i] = {
        x: this.hamsterDataArray[i].nowtime,
        y: this.hamsterDataArray[i].humidity,
      };
    }
    this.humidity = humidity;

    const wheelSpeed = [];
    for (let i = 0; i < this.hamsterDataArray.length; i += 1) {
      wheelSpeed[i] = {
        x: this.hamsterDataArray[i].nowtime,
        y: this.hamsterDataArray[i].wheelSpeed,
      };
    }
    this.wheelSpeed = wheelSpeed;
  }
}
</script>
