<template>
  <v-container>
    <v-container class="d-flex flex-row justify-space-between">
      <!-- Forms -->
      <RegionAutocompleteCard />
      <DaysSliderCard />
    </v-container>
    <v-container>
      <!-- Graphs -->
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import RegionAutocompleteCard from '@/components/RegionAutocompleteCard.vue';
import DaysSliderCard from '@/components/DaysSliderCard.vue';

export default Vue.extend({
  name: 'Home',

  components: {
    RegionAutocompleteCard,
    DaysSliderCard,
  },
});
</script>

<style>
.card-title {
  font-size: x-large;
  font-weight: bold;
}
</style>
