<template>
  <div>
    <a-page-header
      @back="() => $router.go(-1)"
      :title="$route.meta.title"
      :sub-title="$route.meta.subtitle"
    />

    <div class="pt-5">
      <div class="flex items-center justify-between">
        <a-tooltip placement="bottom">
          <template #title>
            <span>Click to copy!</span>
          </template>
          <span
            @click="copyTimestamp"
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
            class="bg-[#e9535314] text-rose-600 text-[13px] p-4 rounded-[3px] border border-[#e953536b]"
          >
            {{ result.detail }}
          </div>

          <div v-else class="text-[14px]">
            <div class="mb-2 text-[#a1a1a1]">
              <span class="font-semibold text-[#bbb]">Local</span>:
              {{ result.local }}
            </div>
            <div class="mb-2 text-[#a1a1a1]">
              <span class="font-semibold text-[#bbb]">GMT</span>:
              {{ result.gmt }}
            </div>
            <div class="mb-2 text-[#a1a1a1]">
              <span class="font-semibold text-[#bbb]">Relative</span>:
              {{ result.relative }}
            </div>
            <div
              class="text-[#a1a1a1]"
              :class="{
                'mb-2': result.timestamp,
              }"
            >
              <span class="font-semibold text-[#bbb]">ISO</span>:
              {{ result.iso }}
            </div>

            <div class="text-[#a1a1a1]" v-if="result.timestamp">
              <span class="font-semibold text-[#bbb]">Epoch</span>:
              {{ result.timestamp }}
            </div>
          </div>
        </div>

        <div class="pt-[48px]">
          <h1 class="font-semibold text-[16px] mb-2">
            What is Unix/Epoch Timestamp ?
          </h1>
          <p class="text-[13px] text-[#bbb]">
            The Unix Epoch Timestamp is simply a representation of time in
            seconds or milliseconds. It measures the time elapsed since January
            1st, 1970, at UTC (or GMT) to any particular moment, expressed in
            seconds (or milliseconds), and is referred to as the timestamp of
            that instance. The timestamp exclusively represents the time in UTC
            . Some systems present the time as a 32-bit integer, which may lead
            to an issue on January 19, 2038 (also known as Y2038). The efficient
            tool on this page will assist you in converting timestamps from
            seconds (10-digit), milliseconds (13-digit) and microseconds
            (16-digit) into human-readable DateTime.
          </p>

          <h1 class="font-semibold text-[16px] mb-2 pt-[20px]">
            About ISO 8601 date and time
          </h1>
          <p class="text-[13px] text-[#bbb]">
            ISO 8601 is a date and time notation format defined by ISO as an
            international standard. The date and time are connected by "T" and
            written. The time zone is expressed as "+09:00" as the difference
            time from UTC, and in the case of UTC, it is expressed as "Z".
            Separate seconds and milliseconds with a comma (,) or dot (.).
            DenCode omits milliseconds when milliseconds are 000. ISO 8601 comes
            in several formats.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref, watch } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { useClipboard } from "@vueuse/core";
import { notification } from "ant-design-vue";

dayjs.extend(utc);
dayjs.extend(relativeTime);

import { computed } from "vue";

const timestampType = ref("s");
const route = useRoute();

const currentTimestamp = ref(getTimestamp());
const updateTimestamp: Ref<number | null> = ref(null);

const userTimestamp: Ref<string> = ref("");
const userDate = ref(null);
const result = ref(null);
const { text, copy, copied, isSupported } = useClipboard({
  source: currentTimestamp,
});

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

  userTimestamp.value = getTimestamp().toString();
  convert();
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

watch(userTimestamp, (newValue) => {
  if (newValue) {
    if (userDate.value) userDate.value = null;
  }
});

watch(userDate, (newValue) => {
  if (newValue) {
    if (userTimestamp.value) userTimestamp.value = "";
  }
});

function convert() {
  if (userTimestamp.value) {
    try {
      // Check if timestamp is in seconds or milliseconds
      if (userTimestamp.value.length === 10) {
        // 10 digits = seconds
        result.value = {
          local: dayjs
            .unix(parseInt(userTimestamp.value))
            .format("dddd, MMMM D, YYYY HH:mm:ss"),
          gmt: dayjs
            .unix(parseInt(userTimestamp.value))
            .utc(false)
            .format("dddd, MMMM D, YYYY HH:mm:ss"),

          relative: dayjs.unix(parseInt(userTimestamp.value)).fromNow(),

          iso: dayjs.unix(parseInt(userTimestamp.value)).toISOString(),
          success: true,
        };
      } else if (userTimestamp.value.length === 13) {
        // 13 digits = milliseconds
        result.value = {
          local: dayjs(parseInt(userTimestamp.value)).format(
            "dddd, MMMM D, YYYY HH:mm:ss"
          ),
          gmt: dayjs(parseInt(userTimestamp.value))
            .utc(false)
            .format("dddd, MMMM D, YYYY HH:mm:ss"),

          relative: dayjs(parseInt(userTimestamp.value)).fromNow(),

          iso: dayjs(parseInt(userTimestamp.value)).toISOString(),
          success: true,
        };
      } else {
        throw new Error("Invalid timestamp format.");
      }
    } catch (error) {
      result.value = {
        success: false,
        detail: error.message,
      };
    }
  } else if (userDate.value) {
    result.value = {
      local: dayjs(userDate.value, "YYYY-MM-DD HH:mm:ss").format(
        "dddd, MMMM D, YYYY HH:mm:ss"
      ),
      gmt: dayjs(userDate.value, "YYYY-MM-DD HH:mm:ss")
        .utc(false)
        .format("dddd, MMMM D, YYYY HH:mm:ss"),

      relative: dayjs(userDate.value, "YYYY-MM-DD HH:mm:ss").fromNow(),

      iso: dayjs(userDate.value, "YYYY-MM-DD HH:mm:ss").toISOString(),
      success: true,

      timestamp: dayjs(userDate.value, "YYYY-MM-DD HH:mm:ss").unix(),
    };
  }
}

function copyTimestamp() {
  try {
    copy();
    notification["success"]({
      message: "Copied!",
      description: "The timestamp has been copied to your clipboard.",
    });
  } catch (error) {
    notification["error"]({
      message: "Error",
      description: error.message,
    });
  }
}
</script>

<style scoped></style>
