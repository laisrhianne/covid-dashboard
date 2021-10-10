<template>
  <v-card color="white" :width="0.9 * windowWidth">
    <v-card-title class="primary white--text">
      <p class="card-title">New Daily Cases</p>
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
            array: errorBar,
            visible: true,
            color: '#606060',
          },
          type: 'scatter',
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

<style></style>
