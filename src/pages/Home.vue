<template>
  <v-container>
    <v-container class="d-flex flex-row justify-space-between">
      <!-- Forms -->
      <RegionAutocompleteCard @selectedRegion="loadReports" />
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
import { IReport } from '@/@types';
import { getReports } from '@/services/getReports';

export default Vue.extend({
  name: 'Home',

  components: {
    RegionAutocompleteCard,
    DaysSliderCard,
    NewDailyCasesGraphCard,
  },

  data() {
    return {
      reports: [] as IReport[],
      selectedRegion: '',
    };
  },

  methods: {
    async loadReports(iso: string) {
      this.selectedRegion = iso;
      const data = await getReports(iso, 15);
      this.reports = data;
      console.log(data);
    },
  },
});
</script>

<style>
.card-title {
  font-size: x-large;
  font-weight: bold;
}
</style>
