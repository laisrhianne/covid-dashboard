<template>
  <v-container>
    <v-container class="d-flex flex-row justify-space-between">
      <!-- Forms -->
      <RegionAutocompleteCard @selectedRegion="loadReports" />
      <DaysSliderCard @selectedDays="setDays" />
    </v-container>
    <v-container class="d-flex flex-row justify-center align-center">
      <v-progress-linear
        :active="loadingReports && selectedRegion"
        indeterminate
        color="primary"
      ></v-progress-linear>
    </v-container>
    <v-container class="d-flex flex-column justify-center align-center">
      <!-- Graphs -->
      <NewDailyCasesGraphCard
        :newDailyCases="newDailyCases"
        :loadingReports="loadingReports"
      />
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import RegionAutocompleteCard from '@/components/RegionAutocompleteCard.vue';
import DaysSliderCard from '@/components/DaysSliderCard.vue';
import NewDailyCasesGraphCard from '@/components/NewDailyCasesGraphCard.vue';
import { IReport, IGraphData } from '@/@types';
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
      loadingReports: false,
      newDailyCases: {} as IGraphData,
      days: 5,
    };
  },

  methods: {
    setDays(days: number) {
      this.days = days;
    },
    async loadReports(iso: string) {
      this.selectedRegion = iso;
      this.loadingReports = true;
      this.reports = await getReports(iso, 15).then((data) => {
        this.loadingReports = false;
        return data;
      });

      const dailyCasesX = this.reports.map((reports) => reports.date);
      const dailyCasesY = this.reports.map((reports) => reports.confirmed_diff);

      this.newDailyCases = { x: dailyCasesX, y: dailyCasesY };
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
