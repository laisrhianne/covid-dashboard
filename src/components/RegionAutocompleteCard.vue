<template>
  <v-card color="white" :width="0.4 * windowWidth">
    <v-card-title class="primary white--text">
      <p class="card-title">Search by Region</p>
    </v-card-title>
    <v-card-actions>
      <v-autocomplete
        class="mt-1"
        label="Region"
        v-model="selectedRegion"
        :items="regions"
        item-text="name"
        item-value="iso"
        clearable
        outlined
      ></v-autocomplete>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { getRegions } from '@/services/getRegions';
import { IRegion } from '@/@types';

export default Vue.extend({
  name: 'RegionAutocompleteCard',

  data() {
    return {
      windowWidth: window.screen.width,
      windowHeight: window.screen.height,
      regions: [] as IRegion[],
      selectedRegion: '',
    };
  },

  async mounted() {
    this.regions = await getRegions();
  },
});
</script>

<style></style>
