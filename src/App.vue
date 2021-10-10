<template>
  <v-app>
    <v-app-bar app color="primary" class="d-flex justify-start" dark>
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
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Home from "@/pages/Home.vue";

export default Vue.extend({
  name: "App",

  components: {
    Home,
  },

  data: () => ({
    //
  }),
});
</script>
