<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const currentTimestamp = ref<number | null>(null);
let intervalId: number | null = null;

const updateTimestamp = () => {
  currentTimestamp.value = Math.round(+new Date() / 1000);
};

onMounted(() => {
  updateTimestamp(); // Initialize immediately
  intervalId = setInterval(updateTimestamp, 1000); // Update every second
});

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId); // Clear the interval when the component is unmounted
  }
});
</script>

<template>
  <div class="container mx-auto p-5">
    {{ currentTimestamp }}
  </div>
</template>

<style scoped></style>
