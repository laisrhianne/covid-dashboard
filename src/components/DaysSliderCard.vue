<template>
  <v-card color="white" :width="0.4 * windowWidth">
    <v-card-title class="primary white--text">
      <p class="card-title">Days for Moving Average</p>
    </v-card-title>
    <v-card-actions>
      <v-slider
        class="mt-5"
        v-model="days"
        min="5"
        max="90"
        :thumb-label="true"
        thumb-size="25"
        @change="emitDays"
      ></v-slider>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DaysSliderCard',

  data() {
    return {
      windowWidth: window.screen.width,
      windowHeight: window.screen.height,
      days: 5,
    };
  },

  methods: {
    emitDays() {
      this.$emit('selectedDays', this.days);
    },
  },
});
</script>

<style></style>
