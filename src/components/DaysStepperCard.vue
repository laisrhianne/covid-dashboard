<template>
  <v-card class="form-card" color="white">
    <v-card-title class="primary white--text">
      <p class="card-title">Days for Moving Average</p>
    </v-card-title>
    <v-card-actions>
      <v-text-field
        class=""
        v-model="days"
        single-line
        type="number"
        :rules="rules"
        @change="emitDays"
      />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DaysSliderCard',

  data() {
    return {
      rules: [
        (value: number) => !!value || 'Required',
        (value: number) =>
          value >= 5 || 'Number of days must be greater than or equal to 5',
        (value: number) =>
          value <= 90 || 'Number of days must be less than or equal to 90',
      ],
      days: 5,
    };
  },

  methods: {
    increment() {
      this.days++;
    },
    decrement() {
      this.days--;
    },
    emitDays() {
      if (this.days && this.days >= 5 && this.days <= 90) {
        this.$emit('selectedDays', this.days);
      }
    },
  },
});
</script>

<style></style>
