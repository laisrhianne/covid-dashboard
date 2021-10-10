<template>
  <v-container>
    <h1 class="text-md-center mt-5 mb-5">Covid-19 Dashboard</h1>
    <v-container id="forms-container">
      <!-- Forms -->
      <RegionAutocompleteCard @selectedRegion="loadReports" />
      <DaysSliderCard @selectedDays="setDays" />
    </v-container>
    <v-container class="d-flex flex-row justify-center align-center">
      <v-progress-linear
        :active="loadingReports && !!selectedRegion"
        indeterminate
        color="primary"
      ></v-progress-linear>
    </v-container>
    <v-container
      class="d-flex flex-column justify-center align-center"
      id="graphs-container"
    >
      <!-- Graphs -->
      <NewDailyCasesGraphCard
        :newDailyCases="newDailyCases"
        :loadingReports="loadingReports"
        :days="days"
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
    setDays(payload: number) {
      this.days = payload;
    },
    async loadReports(iso: string) {
      this.selectedRegion = iso;
      this.loadingReports = true;
      this.reports = await getReports(iso).then((data) => {
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

#forms-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.form-card {
  margin-top: 5%;
  width: 45%;
  height: 200px;
}

#graphs-container {
  width: 100%;
}

.v-card__text,
.v-card__title {
  word-break: normal;
}

@media screen and (max-width: 480px) {
  #forms-container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .form-card {
    width: 80%;
    height: 50%;
  }
}
</style>
