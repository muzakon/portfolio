<template>
  <div>
    <a-page-header
      @back="() => $router.go(-1)"
      :title="$route.meta.title"
      :sub-title="$route.meta.subtitle"
      :breadcrumb="{ routes }"
    />

    <div class="pt-5">
      <div class="flex items-center justify-between">
        <a-tooltip placement="bottom">
          <template #title>
            <span>Click to copy :)</span>
          </template>
          <span
            class="hover:text-[#00b96b] cursor-pointer text-[24px] font-semibold py-2 px-5 min-w-[250px] flex items-center justify-center rounded-[5px] hover:bg-[#131313] transition duration-200"
          >
            <span class="min-w-[190px]">{{ currentTimestamp }}</span>
            <span class="pl-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-copy"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"
                />
                <path
                  d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"
                />
              </svg>
            </span>
          </span>
        </a-tooltip>

        <div>
          <a-select
            size="large"
            v-model:value="timestampType"
            style="width: 200px"
          >
            <a-select-option value="s">Seconds</a-select-option>
            <a-select-option value="ms">Miliseconds</a-select-option>
          </a-select>
        </div>
      </div>

      <div class="pt-12">
        <h1 class="font-semibold text-[16px]">
          Convert Epoch to Date or Date to Epoch
        </h1>

        <div class="flex items-center pt-4 justify-between">
          <div class="flex items-center gap-3 w-full">
            <a-input
              size="large"
              v-model:value="userTimestamp"
              placeholder="Enter timestamp..."
              class="max-w-[220px]"
            />
            <span>or</span>
            <a-date-picker
              size="large"
              v-model:value="userDate"
              format="YYYY-MM-DD HH:mm:ss"
              :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
              class="w-full"
            />
          </div>
          <div class="pl-4">
            <a-button type="primary" @click="convert">Convert</a-button>
          </div>
        </div>

        <div v-if="result" class="pt-5">
          <div
            v-if="!result.success"
            class="bg-[#e9535314] text-rose-600 text-[13px] p-4 rounded-[3px]"
          >
            {{ result.detail }}
          </div>

          <div
            v-else
            class="bg-[#e9535314] text-green-600 text-[13px] p-4 rounded-[3px]"
          >
            {{ result.detail }}
          </div>
        </div>
      </div>

      <!-- <div class="text-center">
        <div>GMT: {{ timestampToDate.gmt }}</div>
        <div>Local: {{ timestampToDate.local }}</div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref, watch } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

import { computed } from "vue";

const timestampType = ref("s");
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

const userTimestamp: Ref<string> = ref("");
const userDate = ref(null);
const result = ref(null);

function getTimestamp(): number {
  const timestamp = +Date.now();
  return timestampType.value === "s" ? Math.round(timestamp / 1000) : timestamp;
}

const timestampToDate = computed(() => {
  const date = dayjs.unix(currentTimestamp.value);
  return {
    gmt: date.utc(false).format("dddd, MMMM D, YYYY HH:mm:ss"),
    local: date.local().format("dddd, MMMM D, YYYY HH:mm:ss"),
  };
});

onMounted(() => {
  updateTimestamp.value = setInterval(() => {
    currentTimestamp.value = getTimestamp();
  }, 1000);
});

watch(timestampType, (newValue) => {
  if (updateTimestamp.value) {
    clearInterval(updateTimestamp.value);
    currentTimestamp.value = getTimestamp();

    updateTimestamp.value = setInterval(
      () => {
        currentTimestamp.value = getTimestamp();
      },
      newValue === "s" ? 1000 : 1
    );
  }
});

function convert() {
  if (userTimestamp.value) {
    try {
      let date;

      // Check if timestamp is in seconds or milliseconds
      if (userTimestamp.value.length === 10) {
        // 10 digits = seconds
        date = dayjs
          .unix(parseInt(userTimestamp.value))
          .format("dddd, MMMM D, YYYY HH:mm:ss");
      } else if (userTimestamp.value.length === 13) {
        // 13 digits = milliseconds
        date = dayjs(parseInt(userTimestamp.value)).format(
          "dddd, MMMM D, YYYY HH:mm:ss"
        );
      } else {
        throw new Error("Invalid timestamp format.");
      }
    } catch (error) {
      result.value = {
        success: false,
        detail: error.message,
      };
    }
  }
}
</script>

<style scoped></style>
