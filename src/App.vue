<template>
  <v-app>
    <!-- <v-app-bar
      app
      id="app-bar"
      color="primary"
      class="d-flex justify-start"
      dark
    >
      <v-img
        alt="DataHow Logo"
        contain
        src="./assets/logo.png"
        transition="scale-transition"
        height="64"
        width="192"
      />
    </v-app-bar> -->

    <v-navigation-drawer v-model="dataType" app color="grey lighten-3">
      <v-container>
        <v-img
          alt="DataHow Logo"
          src="./assets/logo.png"
          contain
          transition="scale-transition"
          height="100"
          width="300"
        />
      </v-container>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in dataTypes"
          :key="item.key"
          link
          @click="setDataType(item)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="col-9">
      <Home :type="dataType" />
      <v-snackbar
        v-model="errorSnackbarStatus"
        color="primary"
        :multi-line="true"
      >
        {{ errorSnackbarMessage }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="errorSnackbarStatus = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Home from '@/pages/Home.vue';
import { IReportType, reportTypes } from './utils/reportTypes';

export default Vue.extend({
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    errorSnackbarStatus: false,
    errorSnackbarMessage: '',
    dataType: { title: '', key: '' },
    dataTypes: reportTypes,
  }),

  methods: {
    setDataType(item: IReportType) {
      this.dataType = item;
    },
  },

  errorCaptured(err, vm, info) {
    this.errorSnackbarMessage = err.message;
    this.errorSnackbarStatus = true;
  },
});
</script>

<style scoped>
#app-bar {
  min-height: 60px;
}
@media screen and (max-width: 480px) {
  #app-bar {
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
