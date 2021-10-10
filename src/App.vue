<template>
  <v-app>
    <v-app-bar
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
    </v-app-bar>

    <v-main>
      <Home />
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

export default Vue.extend({
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    errorSnackbarStatus: false,
    errorSnackbarMessage: '',
  }),

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
