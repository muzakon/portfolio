<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, type Ref } from "vue";
import { Application } from "@splinetool/runtime";
import ArtPlum from "./components/ArtPlum.vue";

const splineBackground: Ref<HTMLCanvasElement | null> = ref(null);

const state = reactive({
  spline: {
    scene: "https://prod.spline.design/Jle72nKxs9s1h4mm/scene.splinecode",
    isLoaded: false,
  },
});

onMounted(async () => {
  if (splineBackground.value) {
    splineBackground.value.width = window.innerWidth;
    splineBackground.value.height = window.innerHeight;

    const app = new Application(splineBackground.value);
    await app.load(state.spline.scene);
    state.spline.isLoaded = true;
  }
});
</script>

<template>
  <div>
    <ArtPlum></ArtPlum>
    <div class="container mx-auto max-w-[640px] pt-[150px] relative" style="z-index: 5;">
      <div>
        <h1 class="text-gray-200 text-[36px] title">Hasan Muzak</h1>

        <div class="text-[14px] pt-8 text-[#bbb] information">
          Hey, I am Hasan Muzak, a full stack developer.
        </div>

        <div class="text-[14px] pt-8 text-[#bbb] information">
          I bring a diverse skill set to the table, ranging from Docker and
          Python to JavaScript frameworks like VueJS and React. With experience
          across both Google Cloud Platform and AWS, as well as a solid
          background in both SQL and NoSQL databases, I’m equipped to tackle a
          wide range of development challenges.
        </div>

        <div class="text-[14px] pt-8 text-[#bbb] information">
          I hold a bachelor’s degree in Computer Engineering, which laid the
          foundation for my technical expertise and problem-solving abilities.
          My approach to development is both methodical and creative, and I
          enjoy diving into new technologies and tools to stay on the cutting
          edge of the field. Whether it's optimizing back-end systems or
          crafting engaging front-end experiences, I’m driven by a commitment to
          quality and innovation.
        </div>

        <div class="text-[14px] pt-8 text-[#bbb] information">
          Outside of coding, I’m an avid traveler and photographer. I love
          exploring new places and capturing their essence through my lens.
        </div>

        <div class="text-[14px] pt-8 text-[#bbb] information">
          You can check out some of my recent work at
          <a href="https://projects.hasanmuzak.dev" target="_blank"
            >projects.hasanmuzak.dev</a
          >, where I showcase various projects and share my development journey.
        </div>

        <div class="text-[14px] pt-12 text-[#bbb] information">
          Find me on

          <div class="flex items-center mt-3 gap-5">
            <div class="flex items-center hover:text-white cursor-pointer">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.25"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
              <span class="pl-1">Github</span>
            </div>

            <div class="flex items-center hover:text-white cursor-pointer">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.25"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>
              <span class="pl-1">Instagram</span>
            </div>

            <div class="flex items-center hover:text-white cursor-pointer">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.25"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-discord"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" /><path d="M7 16.5c3.5 1 6.5 1 10 0" /></svg>
              <span class="pl-1">Discord</span>
            </div>

            <div class="flex items-center hover:text-white cursor-pointer">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.25"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M8 11l0 5" /><path d="M8 8l0 .01" /><path d="M12 16l0 -5" /><path d="M16 16v-3a2 2 0 0 0 -4 0" /></svg>
              <span class="pl-1">LinkedIn</span>
            </div>
          </div>

          <p class="pt-3 m-0">Or mail me at <span>hasanmuzak@hotmail.com</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.__splineBackground {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

* {
  font-family: "Inter", sans-serif !important;
  font-optical-sizing: auto;
  font-style: normal;
}

.title {
  font-weight: 800;
  line-height: 1.11;
}

html {
  /* Adjust font size */
  font-size: 100%;
  -webkit-text-size-adjust: 100%;
  /* Font varient */
  font-variant-ligatures: none;
  -webkit-font-variant-ligatures: none;
  /* Smoothing */
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
  text-shadow: rgba(0, 0, 0, 0.01) 0 0 1px;
}


.information {
  line-height: 1.75;
}
</style>
