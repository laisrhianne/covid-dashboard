<template>
  <v-container>
    <v-container class="d-flex flex-row justify-space-between">
      <!-- Forms -->
      <RegionAutocompleteCard />
      <DaysSliderCard />
    </v-container>
    <v-container class="d-flex flex-column justify-center align-center">
      <!-- Graphs -->
      <NewDailyCasesGraphCard />
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import RegionAutocompleteCard from '@/components/RegionAutocompleteCard.vue';
import DaysSliderCard from '@/components/DaysSliderCard.vue';
import NewDailyCasesGraphCard from '@/components/NewDailyCasesGraphCard.vue';

export default Vue.extend({
  name: 'Home',

  components: {
    RegionAutocompleteCard,
    DaysSliderCard,
    NewDailyCasesGraphCard,
  },
});
</script>

<style>
.card-title {
  font-size: x-large;
  font-weight: bold;
}
</style>
