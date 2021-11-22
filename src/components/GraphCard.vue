<template>
  <v-card color="white" width="90%">
    <v-card-title class="primary white--text graph-card-title">
      <p class="card-title">{{ title }} Graph</p>
      <v-expansion-panels>
        <v-expansion-panel id="options-panel">
          <v-expansion-panel-header> Options </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-checkbox
              label="Variable Error Bars"
              v-model="variableError"
              @change="plotGraph"
              color="red"
            ></v-checkbox>
            <v-select
              outlined
              v-model="graphMode"
              @change="plotGraph"
              color="red"
              :items="[
                { name: 'Scatter', mode: 'scatter' },
                { name: 'Bar', mode: 'bar' },
              ]"
              item-text="name"
              item-value="mode"
            ></v-select>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-title>
    <v-card-text>
      <v-container v-show="!loadingReports" id="graph"
        ><!-- Graph --></v-container
      >
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Plotly from 'plotly.js-dist';
import { std as standardDeviation } from 'mathjs';
import { IGraphData } from '@/@types';
import { getSimpleMovingAverage } from '@/utils/simpleMovingAverage';

type IGraphMode = 'scatter' | 'bar';
type XAnchor = 'right' | 'auto' | 'left' | 'center' | undefined;
export default Vue.extend({
  name: 'GraphCard',

  props: {
    newDailyCases: Object as PropType<IGraphData>,
    loadingReports: Boolean,
    days: Number,
    title: String,
  },

  data() {
    return {
      variableError: false,
      graphMode: 'scatter' as IGraphMode,
    };
  },

  methods: {
    plotGraph() {
      if (this.newDailyCases?.x?.length && this.newDailyCases?.y?.length) {
        Plotly.purge('graph');

        const movingAverage = getSimpleMovingAverage(
          this.newDailyCases.y,
          this.days
        );

        const errorBar = this.newDailyCases.y.map(
          () =>
            (1.96 * standardDeviation(this.newDailyCases.y)) /
            Math.sqrt(this.newDailyCases.y.length)
        );
        const variableErrorBar = this.newDailyCases.y.map(
          (value, index) =>
            (1.96 *
              standardDeviation(this.newDailyCases.y.slice(0, index + 1))) /
            Math.sqrt(index + 1)
        );

        const config = { responsive: true };

        const xanchor = 'right' as XAnchor;

        const layout = {
          autosize: true,
          showLegend: true,
          height: 250,
          margin: {
            l: 40,
            r: 40,
            t: 40,
            b: 40,
          },
          legend: {
            x: 1,
            xanchor,
            y: 1,
          },
        };

        const mainTrace = {
          x: this.newDailyCases.x,
          y: this.newDailyCases.y,
          error_y: {
            type: 'data',
            array: this.variableError ? variableErrorBar : errorBar,
            visible: true,
            color: '#606060',
          },
          type: this.graphMode,
          name: 'Daily New Cases',
          marker: {
            color: 'red',
            opacity: 0.7,
          },
        };

        const movingAverageTrace = {
          x: this.newDailyCases.x,
          y: movingAverage,
          fillcolor: 'primary',
          name: 'Moving Average',
          showLegend: false,
          type: 'scatter',
        };

        const data = [mainTrace, movingAverageTrace] as Plotly.Data[];

        Plotly.newPlot('graph', data, layout, config);
      }
    },
  },

  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler() {
        this.plotGraph();
      },
    },
  },
});
</script>

<style>
#options-panel {
  position: relative;
}

#graph {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.graph-card-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
