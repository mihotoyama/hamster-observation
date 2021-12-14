<script lang="ts">
import {
  Component,
  Mixins,
  Prop,
  Watch,
} from 'vue-property-decorator';
import Chart from 'chart.js';
import { Bar, mixins } from 'vue-chartjs';

@Component({})
export default class HamsterChartBar extends Mixins(Bar, mixins.reactiveProp) {
  @Prop() chartData!: Chart.ChartData;

  @Prop() chartOptions!: Chart.ChartOptions;

  @Watch('chartData')
  onChartDataChanged() {
    this.load();
  }

  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  }

  load() {
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>
