<template>
  <v-card color="white" :width="0.9 * windowWidth">
    <v-card-title class="primary white--text">
      <p class="card-title">New Daily Cases</p>
    </v-card-title>
    <v-card-text>
      <v-container><!-- Graph --></v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Plotly from 'plotly.js-dist';

export default Vue.extend({
  name: 'NewDailyCasesGraphCard',

  data() {
    return {
      windowWidth: window.screen.width,
      windowHeight: window.screen.height,
    };
  },
});
</script>

<style></style>
