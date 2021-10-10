<template>
  <v-card color="white" :width="0.9 * windowWidth">
    <v-card-title class="primary white--text graph-card-title">
      <p class="card-title">New Daily Cases</p>
      <v-expansion-panels
        :style="`maxWidth: ${
          windowWidth > 480 ? windowWidth * 0.2 : windowWidth * 0.7
        }px;`"
      >
        <v-expansion-panel
          id="options-panel"
          :style="`maxWidth: ${
            windowWidth > 480 ? windowWidth * 0.2 : windowWidth * 0.7
          }px;
          position: ${windowWidth > 430 ? 'absolute' : 'relative'}`"
        >
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
      <v-container v-show="!loadingReports" id="daily-cases-graph"
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

export default Vue.extend({
  name: 'NewDailyCasesGraphCard',

  props: {
    newDailyCases: Object as PropType<IGraphData>,
    loadingReports: Boolean,
    days: Number,
  },

  data() {
    return {
      windowWidth: window.screen.width,
      windowHeight: window.screen.height,
      variableError: false,
      graphMode: 'scatter',
    };
  },

  methods: {
    plotGraph() {
      if (this.newDailyCases?.x?.length && this.newDailyCases?.y?.length) {
        Plotly.purge('daily-cases-graph');

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

        const layout = {
          autosize: false,
          width: this.windowWidth * 0.7,
          height: 250,
          margin: {
            l: 40,
            r: 40,
            t: 40,
            b: 40,
          },
          showLegend: true,
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

        const data = [mainTrace, movingAverageTrace];

        Plotly.newPlot('daily-cases-graph', data, layout, config);
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

.graph-card-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
