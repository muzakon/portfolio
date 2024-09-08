<template>
  <div>
    <div>
      <h1 class="text-gray-200 text-[36px] title">Projects</h1>
      <div class="pt-8">
        <div class="grid grid-rows-20 grid-flow-col gap-4">
          <div v-for="(project, index) in computedProjects">
            <router-link
              :to="`/projects/${titleToUrl(project.title)}`"
              class="text-[14px] text-[#bbb] hover:text-[#a186fb] cursor-pointer"
            >
              {{ index + 1 }}. {{ project.title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { projects } from "@/utils/constants";
import { titleToUrl } from "@/utils/functions";

import { computed } from "vue";

const computedProjects = computed(() => projects);
</script>

<style scoped lang="less">
.grid-rows-20 {
  grid-template-rows: repeat(20, minmax(0, 1fr));
}
</style>
