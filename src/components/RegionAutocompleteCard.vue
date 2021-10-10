<template>
  <v-card
    class="form-card"
    color="white"
    :width="windowWidth > 480 ? 0.4 * windowWidth : 0.9 * windowWidth"
  >
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
        @change="emitRegion"
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

  methods: {
    emitRegion() {
      this.$emit('selectedRegion', this.selectedRegion);
    },
  },

  async mounted() {
    this.regions = await getRegions();
  },
});
</script>

<style></style>
