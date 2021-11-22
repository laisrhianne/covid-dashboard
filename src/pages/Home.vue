<template>
  <v-container>
    <h1 class="text-md-center mt-5 mb-5">Covid-19 Dashboard</h1>
    <h2 v-if="type.title" class="text-md-center mt-5 mb-5">{{ type.title }}</h2>
    <v-container v-if="type.title">
      <v-container id="forms-container">
        <!-- Forms -->
        <RegionAutocompleteCard @selectedRegion="loadReports" />
        <DaysStepperCard @selectedDays="setDays" />
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
        <GraphCard
          :newDailyCases="newDailyCases"
          :loadingReports="loadingReports"
          :days="days"
          :title="type.title"
        />
      </v-container>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import RegionAutocompleteCard from '@/components/RegionAutocompleteCard.vue';
import DaysStepperCard from '@/components/DaysStepperCard.vue';
import GraphCard from '@/components/GraphCard.vue';
import { IReport, IGraphData } from '@/@types';
import { getReports } from '@/services/getReports';
import { IReportType } from '@/utils/reportTypes';

export default Vue.extend({
  name: 'Home',

  components: {
    RegionAutocompleteCard,
    DaysStepperCard,
    GraphCard,
  },

  props: {
    type: Object as PropType<IReportType>,
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
    },
  },

  watch: {
    type: function ({ key }: { key: string }) {
      this.newDailyCases = {
        x: this.reports.map((report) => report.date),
        y: this.reports.map((report) => report[key]),
      };
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
