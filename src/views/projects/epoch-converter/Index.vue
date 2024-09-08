<template>
  <div>
    <a-page-header
      :title="$route.meta.title"
      :sub-title="$route.meta.subtitle"
      :breadcrumb="{ routes }"
    />

    <div class="pt-5">
      <div class="text-center">
        <span
          class="inline-block hover:text-[#a186fb] cursor-pointer text-[24px] font-semibold"
        >
          {{ currentTimestamp }}
        </span>
        
      </div>

      <div class="text-center">
            <div>
                GMT: {{ timestampToDate.gmt }}
            </div>
            <div>
                Local: {{ timestampToDate.local }}
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

import { computed } from "vue";

const route = useRoute();
const routes = [
  {
    path: "",
    breadcrumbName: "Homepage",
  },
  {
    path: "/projects",
    breadcrumbName: "Projects",
  },
  {
    breadcrumbName: route.meta.title,
  },
];
const currentTimestamp = ref(getTimestamp());
const updateTimestamp: Ref<number | null> = ref(null);

function getTimestamp(): number {
  return Math.round(+Date.now() / 1000);
}

const timestampToDate = computed(() => {
    const date = dayjs.unix(currentTimestamp.value);
    return {
        "gmt": date.utc(false).format("dddd, MMMM D, YYYY HH:mm:ss"),
        "local": date.local().format("dddd, MMMM D, YYYY HH:mm:ss"),
    }
})

onMounted(() => {
  updateTimestamp.value = setInterval(() => {
    currentTimestamp.value = getTimestamp();
  }, 1000);
});
</script>

<style scoped></style>
bas
