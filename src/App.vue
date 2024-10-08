<script setup lang="ts">
import { Application } from "@splinetool/runtime";
import ArtPlum from "./components/shared/ArtPlum.vue";
import Header from "./components/shared/Header.vue";
import { theme } from "ant-design-vue";
import { useDark, useToggle } from "@vueuse/core";
import { onMounted, ref } from "vue";

const isDark = useDark({
  selector: "body",
  attribute: "color-scheme",
  valueDark: "dark",
  valueLight: "light",
});
const canvas = ref(null);

const toggleDark = useToggle(isDark);
onMounted(async () => {
  if (!isDark.value) {
    toggleDark();
  }
});
</script>

<template>
  <a-config-provider
    :theme="{
      algorithm: theme.darkAlgorithm,
      token: {
        colorPrimary: '#00b96b',
      },
    }"
  >
    <main>
      <!-- <Vue3Spline
        :scene="{
          url: 'https://prod.spline.design/FcXmeBqlhGW6OLW2/scene.splinecode',
        }"
      /> -->
      <!-- <ArtPlum></ArtPlum> -->
      <Header />
      <div
        class="container mx-auto max-w-[940px] pt-[120px] relative"
        style="z-index: 5"
      >
        <Transition name="fade" mode="out-in">
          <RouterView :key="$route.path" />
        </Transition>
      </div>
    </main>
  </a-config-provider>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
