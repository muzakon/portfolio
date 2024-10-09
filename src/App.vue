<script setup lang="ts">
import Header from "./components/shared/Header.vue";
import { theme } from "ant-design-vue";
import { useDark, useToggle } from "@vueuse/core";
import { onMounted } from "vue";

const isDark = useDark({
  selector: "body",
  attribute: "color-scheme",
  valueDark: "dark",
  valueLight: "light",
});

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
      <Header />
      <div
        class="container mx-auto max-w-[940px] md:pt-[220px] pt-[50px] md:px-0 px-[32px] relative"
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
