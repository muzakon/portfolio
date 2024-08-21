<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, type Ref } from "vue";
import { Application } from "@splinetool/runtime";

const splineBackground: Ref<HTMLCanvasElement | null> = ref(null);

const state = reactive({
    spline: {
        scene: "https://prod.spline.design/ywGSGTMYmLCbcZ6m/scene.splinecode",
        isLoaded: false,
    },
});

onMounted(async () => {
    if (splineBackground.value) {
        splineBackground.value.width = window.innerWidth;
        splineBackground.value.height = window.innerHeight;

        const app = new Application(splineBackground.value);
        await app.load(state.spline.scene)
        state.spline.isLoaded = true;
    }
})
</script>

<template>
  <div>
    <canvas ref="splineBackground" class="__splineBackground"></canvas>
    <div class="container mx-auto max-w-[768px] pt-[150px]">
      <div class="">
        <h1 class="text-gray-200 text-[48px] title">Hasan Muzak</h1>

        <div class="text-gray-200 text-[14px] pt-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Voluptatibus, veritatis dolor itaque aliquam voluptates blanditiis
          perspiciatis vel explicabo sit similique suscipit quae cum assumenda
          illum dolores enim laborum, corrupti vitae!
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
  z-index: -1;
}

* {
  font-family: "Inter", sans-serif !important;
  font-optical-sizing: auto;
  font-style: normal;
}

.title {
  font-weight: 800;
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
</style>
