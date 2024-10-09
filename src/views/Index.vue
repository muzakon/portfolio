<template>
  <div class="pt-[100px]">
    <div>
      <div
        class="absolute inset-0 grid justify-center -space-y-px z-[-1]"
        :class="`auto-rows-[${boxSize}px]`"
      >
        <div
          class="grid grid-flow-col"
          :class="`auto-cols-[${boxSize}px]`"
          v-for="row in numberOfRows"
        >
          <div
            class="relative border border-green-900/10"
            v-for="col in numberOfColumns"
          >
            <div
              :id="`box-${row}-${col}`"
              class="absolute inset-0 opacity-0 transition duration-1000 box"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="">
      <h1
        class="text-gray-200 text-[36px] title space-grotesk uppercase font-bold"
      >
        Hay, I'm Hasan >
      </h1>

      <div class="pt-4">
        <Typed
          :options="{
            strings: [`I'm a fullstack developer.`],
            typeSpeed: 50,
            backSpeed: 30,
            showCursor: true,
            autoInsertCss: true,
          }"
          style="display: inline-block"
          class="space-grotesk uppercase font-bold text-[20px] text-[#00dc82]"
        >
          <span class="typing"> </span
        ></Typed>
      </div>

      <div class="text-[14px] pt-8 text-[#bbb] information">
        I bring a diverse skill set to the table, ranging from Docker and Python
        to JavaScript frameworks like VueJS and React. With experience across
        both Google Cloud Platform and AWS, as well as a solid background in
        both SQL and NoSQL databases, I’m equipped to tackle a wide range of
        development challenges.
      </div>

      <div class="text-[14px] pt-8 text-[#bbb] information">
        I hold a bachelor’s degree in Computer Engineering, which laid the
        foundation for my technical expertise and problem-solving abilities. My
        approach to development is both methodical and creative, and I enjoy
        diving into new technologies and tools to stay on the cutting edge of
        the field. Whether it's optimizing back-end systems or crafting engaging
        front-end experiences, I’m driven by a commitment to quality and
        innovation.
      </div>

      <div class="pt-8">
        <a
          href="#"
          class="bg-[#00dc82] text-black text-[13px] font-semibold px-4 py-2 rounded-[5px] hover:bg-[#00b068] inline-block"
        >
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-download"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
              <path d="M7 11l5 5l5 -5" />
              <path d="M12 4l0 12" />
            </svg>
            <span class="ml-2"> Download CV </span>
          </div>
        </a>

        <a
          href="#"
          class="text-[#00dc82] text-[13px] font-semibold px-4 py-2 rounded-[5px] border border-black hover:border-[#00dc82] inline-block ml-2"
        >
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-mail"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"
              />
              <path d="M3 7l9 6l9 -6" />
            </svg>
            <span class="ml-2"> Contact </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted, onUnmounted, nextTick } from "vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { Typed } from "@duskmoon/vue3-typed-js";

const windowWidth = ref(0);
const windowHeight = ref(0);
const numberOfColumns = ref(0);
const boxColorizeChance = 0.01;
const numberOfRows = ref(0);
const boxSize = ref(50);
const boxInterval: Ref<number | null> = ref(null);
const breakpoints = useBreakpoints(breakpointsTailwind);

onMounted(async () => {
  if (window.document) {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;

    numberOfRows.value = Math.floor(windowHeight.value / boxSize.value);
    numberOfColumns.value = Math.floor(windowWidth.value / boxSize.value);

    boxInterval.value = setInterval(() => {
      for (let i = 0; i < numberOfColumns.value; i++) {
        for (let y = 0; y < numberOfRows.value; y++) {
          const box = document.getElementById(`box-${y}-${i}`);
          if (box) {
            const random = Math.random();

            if (box.classList.contains("opacity-100")) {
              box.classList.toggle("opacity-100");
            }

            if (
              random <= boxColorizeChance &&
              breakpoints.greater("md").value
            ) {
              box.classList.toggle("opacity-100");
            }
          }
        }
      }
    }, 3000);
  }
});

onUnmounted(() => {
  if (boxInterval.value) {
    clearInterval(boxInterval.value);
  }
});

nextTick(() => {
  window.addEventListener("resize", onResizeWindow);
});

function onResizeWindow() {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
}
</script>

<style scoped>
.information {
  line-height: 1.75;
}
</style>
