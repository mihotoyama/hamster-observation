<script lang="ts">
import {
  Component,
  Mixins,
  Prop,
  Watch,
} from 'vue-property-decorator';
import Chart from 'chart.js';
import { Line, mixins } from 'vue-chartjs';

@Component({})
export default class HamsterChartLine extends Mixins(Line, mixins.reactiveProp) {
  @Prop() chartData!: Chart.ChartData;

  @Prop() chartOptions!: Chart.ChartOptions;

  @Watch('chartData')
  onChartDataChanged() {
    console.log('watch', this.chartData);
    this.load();
  }

  mounted() {
    console.log('mounted in chart component', this.chartData);
    this.renderChart(this.chartData, this.chartOptions);
  }

  load() {
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>
