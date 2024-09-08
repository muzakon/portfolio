<script setup lang="ts">
import ArtPlum from "./components/shared/ArtPlum.vue";
import Header from "./components/shared/Header.vue";
import { theme } from "ant-design-vue";
import { useDark , useToggle} from "@vueuse/core";
import { onMounted } from "vue";

const isDark = useDark({
  selector: 'body',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
})


const toggleDark = useToggle(isDark)
onMounted(() => {
  if(!isDark.value) {
    toggleDark()
  }
})
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
      <ArtPlum></ArtPlum>
      <Header />
      <div
        class="container mx-auto max-w-[640px] pt-[150px] relative"
        style="z-index: 5"
      >
        <RouterView :key="$route.path" />
      </div>
    </main>
  </a-config-provider>
</template>
