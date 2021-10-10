<template>
  <v-card color="white" :width="0.4 * windowWidth">
    <v-card-title class="primary white--text">
      <p class="card-title">Search by Region</p>
    </v-card-title>
    <v-card-actions>
      <v-autocomplete
        class="mt-1"
        v-model="selectedRegion"
        outlined
        label="Region"
      ></v-autocomplete>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'RegionAutocompleteCard',

  data() {
    return {
      windowWidth: window.screen.width,
      windowHeight: window.screen.height,
      selectedRegion: '',
    };
  },
});
</script>

<style></style>
